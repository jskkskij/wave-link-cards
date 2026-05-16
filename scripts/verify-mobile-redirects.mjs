#!/usr/bin/env node
/**
 * Unit tests (routing rules) + optional production redirect-chain checks.
 *
 * Local:       node scripts/verify-mobile-redirects.mjs
 * Production:  node scripts/verify-mobile-redirects.mjs --live
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  decideViewRoute,
  simulateRedirectChain,
} from "../functions/_shared/view-routing.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ORIGIN = "https://getwaved.ai";
const LIVE = process.argv.includes("--live");
const BASE = (process.env.BASE_URL || ORIGIN).replace(/\/$/, "");

const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15";
const ANDROID_UA =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile";
const DESKTOP_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0";
const WHATSAPP_UA = "WhatsApp/2.23.20";
const FB_PREVIEW_UA = "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)";
const FB_IAB_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/450.0.0.0.0;]";

function runUnitTests() {
  const fixturesPath = path.join(__dirname, "mobile-routing-fixtures.json");
  const fixtures = JSON.parse(fs.readFileSync(fixturesPath, "utf8"));
  let failed = 0;

  for (const fx of fixtures) {
    const decision = decideViewRoute({
      pathname: fx.pathname,
      searchView: fx.searchView ?? null,
      userAgent: fx.userAgent,
      cookieHeader: fx.cookieHeader ?? null,
      origin: ORIGIN,
    });

    if (fx.expect === "next") {
      if (decision.action !== "next") {
        console.error(`FAIL [unit] ${fx.name}: expected next, got`, decision);
        failed++;
      } else {
        console.log(`OK   [unit] ${fx.name}`);
      }
      continue;
    }

    if (fx.expect === "redirect") {
      if (decision.action !== "redirect") {
        console.error(`FAIL [unit] ${fx.name}: expected redirect, got`, decision);
        failed++;
        continue;
      }
      if (fx.expectUrlSuffix && !decision.url.endsWith(fx.expectUrlSuffix)) {
        console.error(
          `FAIL [unit] ${fx.name}: url ${decision.url} missing suffix ${fx.expectUrlSuffix}`
        );
        failed++;
        continue;
      }
      if (fx.expectCookie && decision.setViewCookie !== fx.expectCookie) {
        console.error(
          `FAIL [unit] ${fx.name}: cookie ${decision.setViewCookie} !== ${fx.expectCookie}`
        );
        failed++;
        continue;
      }
      console.log(`OK   [unit] ${fx.name}`);
    }
  }

  const chainCases = [
    {
      name: "chain: iPhone / — zero redirects (shared link)",
      input: {
        pathname: "/",
        userAgent: IPHONE_UA,
        cookieHeader: null,
        origin: ORIGIN,
      },
      maxRedirects: 0,
      finalPath: "/",
    },
    {
      name: "chain: desktop wl_view=mobile — / → /m only",
      input: {
        pathname: "/",
        userAgent: DESKTOP_UA,
        cookieHeader: "wl_view=mobile",
        origin: ORIGIN,
      },
      maxRedirects: 1,
      finalPath: "/m",
    },
    {
      name: "chain: mobile /m — stays",
      input: {
        pathname: "/m",
        userAgent: IPHONE_UA,
        cookieHeader: null,
        origin: ORIGIN,
      },
      maxRedirects: 0,
      finalPath: "/m",
    },
    {
      name: "chain: ?view=mobile then settle on /m",
      input: {
        pathname: "/",
        searchView: "mobile",
        userAgent: ANDROID_UA,
        cookieHeader: null,
        origin: ORIGIN,
      },
      maxRedirects: 1,
      finalPath: "/m",
    },
    {
      name: "chain: /shop iPhone — never redirected by edge",
      input: {
        pathname: "/shop",
        userAgent: IPHONE_UA,
        cookieHeader: null,
        origin: ORIGIN,
      },
      maxRedirects: 0,
      finalPath: "/shop",
    },
  ];

  for (const tc of chainCases) {
    const { hops, finalPathname, loop } = simulateRedirectChain(tc.input);
    const redirects = hops.filter((h) => h.decision.action === "redirect").length;

    if (loop) {
      console.error(`FAIL [chain] ${tc.name}: redirect loop`, hops);
      failed++;
      continue;
    }
    if (redirects > tc.maxRedirects) {
      console.error(
        `FAIL [chain] ${tc.name}: ${redirects} redirects (max ${tc.maxRedirects})`,
        hops
      );
      failed++;
      continue;
    }
    if (finalPathname !== tc.finalPath) {
      console.error(
        `FAIL [chain] ${tc.name}: final ${finalPathname} !== ${tc.finalPath}`,
        hops
      );
      failed++;
      continue;
    }
    console.log(`OK   [chain] ${tc.name}`);
  }

  if (failed) {
    console.error(`\n${failed} unit/chain test(s) failed.`);
    process.exit(1);
  }
  console.log(`\nUnit + chain tests passed (${fixtures.length} fixtures + ${chainCases.length} chains).`);
}

async function traceRedirects(url, opts) {
  const maxHops = opts.maxHops ?? 10;
  let current = url;
  const chain = [];

  for (let i = 0; i < maxHops; i++) {
    const res = await fetch(current, {
      redirect: "manual",
      headers: {
        "user-agent": opts.ua,
        ...(opts.cookie ? { cookie: opts.cookie } : {}),
      },
    });
    const location = res.headers.get("location");
    chain.push({ url: current, status: res.status, location });

    if (res.status >= 300 && res.status < 400 && location) {
      current = new URL(location, current).href;
      continue;
    }

    return { chain, finalUrl: current, finalStatus: res.status, loop: false };
  }

  return { chain, finalUrl: current, loop: true };
}

async function runLiveTests() {
  const cases = [
    {
      name: "live iPhone / — no forced /m redirect",
      url: `${BASE}/`,
      ua: IPHONE_UA,
      maxRedirects: 0,
    },
    {
      name: "live Android /shop — no loop",
      url: `${BASE}/shop`,
      ua: ANDROID_UA,
      maxRedirects: 2,
    },
    {
      name: "live WhatsApp preview /",
      url: `${BASE}/`,
      ua: WHATSAPP_UA,
      maxRedirects: 0,
    },
    {
      name: "live Facebook link preview bot /",
      url: `${BASE}/`,
      ua: FB_PREVIEW_UA,
      maxRedirects: 0,
    },
    {
      name: "live Facebook in-app / (WAF may 403 — not a routing bug)",
      url: `${BASE}/`,
      ua: FB_IAB_UA,
      maxRedirects: 0,
      allowStatuses: [200, 403],
    },
    {
      name: "live iPhone /m — stays (200 on /m, no 308 to /)",
      url: `${BASE}/m`,
      ua: IPHONE_UA,
      maxRedirects: 0,
      expectFinalPath: "/m",
    },
    {
      name: "live desktop /m — one hop to /",
      url: `${BASE}/m`,
      ua: DESKTOP_UA,
      maxRedirects: 1,
    },
    {
      name: "live desktop + mobile cookie / — one hop to /m",
      url: `${BASE}/`,
      ua: DESKTOP_UA,
      cookie: "wl_view=mobile",
      minRedirects: 1,
      maxRedirects: 1,
      expectFinalPath: "/m",
    },
  ];

  let failed = 0;
  for (const tc of cases) {
    const { chain, loop, finalStatus } = await traceRedirects(tc.url, {
      ua: tc.ua,
      cookie: tc.cookie,
    });
    const redirectCount = chain.filter((c) => c.status >= 300 && c.status < 400).length;

    if (loop) {
      console.error(`FAIL [live] ${tc.name}: redirect loop`, chain);
      failed++;
      continue;
    }
    if (redirectCount > tc.maxRedirects) {
      console.error(
        `FAIL [live] ${tc.name}: ${redirectCount} redirects (max ${tc.maxRedirects})`,
        chain
      );
      failed++;
      continue;
    }
    const allowed =
      tc.allowStatuses ?? (finalStatus >= 200 && finalStatus < 400 ? [finalStatus] : []);
    const ok = allowed.includes(finalStatus);
    if (!ok) {
      console.error(`FAIL [live] ${tc.name}: final status ${finalStatus}`, chain);
      failed++;
      continue;
    }
    if (finalStatus === 403 && tc.allowStatuses?.includes(403)) {
      console.log(
        `WARN [live] ${tc.name}: 403 (Cloudflare Bot/WAF) — add WAF skip for Facebook in-app UA if needed`
      );
    }
    if (tc.minRedirects != null && redirectCount < tc.minRedirects) {
      console.error(
        `FAIL [live] ${tc.name}: expected ≥${tc.minRedirects} redirect(s), got ${redirectCount}`,
        chain
      );
      failed++;
      continue;
    }
    if (tc.expectFinalPath) {
      const finalPath = new URL(chain[chain.length - 1]?.url || tc.url).pathname.replace(/\/$/, "") || "/";
      const want = tc.expectFinalPath.replace(/\/$/, "") || "/";
      if (finalPath !== want) {
        console.error(
          `FAIL [live] ${tc.name}: final path ${finalPath} !== ${want}`,
          chain
        );
        failed++;
        continue;
      }
    }
    console.log(`OK   [live] ${tc.name} (${redirectCount} redirect(s), status ${finalStatus})`);
  }

  if (failed) {
    console.error(
      `\n${failed} live test(s) failed. If rules are fixed locally, deploy to Cloudflare Pages.`
    );
    process.exit(1);
  }
  console.log("\nLive redirect checks passed.");
}

async function main() {
  runUnitTests();
  if (LIVE) {
    await runLiveTests();
  } else {
    console.log("Skip live checks (pass --live for production).");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

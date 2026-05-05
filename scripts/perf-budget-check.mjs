import fs from "node:fs";
import path from "node:path";

const DEFAULT_BUDGETS = {
  "first-contentful-paint": 1800,
  "largest-contentful-paint": 2500,
  "layout-shift": 100,
  "event": 200,
  "longtask": 200,
};

function readJson(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`file not found: ${absolutePath}`);
  }

  const raw = fs.readFileSync(absolutePath, "utf8");
  return JSON.parse(raw);
}

function parseMetrics(input) {
  if (!Array.isArray(input)) {
    throw new Error("metrics input must be an array");
  }

  const grouped = new Map();
  for (const item of input) {
    const name = item?.target || item?.name;
    const value = Number(item?.duration ?? item?.value);
    if (!name || !Number.isFinite(value)) continue;
    if (!grouped.has(name)) grouped.set(name, []);
    grouped.get(name).push(value);
  }
  return grouped;
}

function percentile(values, p) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return Math.round(sorted[index]);
}

function getCliArgs() {
  const args = process.argv.slice(2);
  const fileArg = args.find((arg) => !arg.startsWith("--"));
  const budgetsArg = args.find((arg) => arg.startsWith("--budgets="));
  const pArg = args.find((arg) => arg.startsWith("--p="));
  const percentileValue = pArg ? Number(pArg.split("=")[1]) : 75;

  if (!fileArg || fileArg === "--help") {
    console.log("Usage: node scripts/perf-budget-check.mjs <metrics.json> [--budgets=path.json] [--p=75]");
    process.exit(0);
  }

  return {
    metricsPath: fileArg,
    budgetsPath: budgetsArg ? budgetsArg.split("=")[1] : null,
    percentileValue: Number.isFinite(percentileValue) ? percentileValue : 75,
  };
}

function main() {
  const { metricsPath, budgetsPath, percentileValue } = getCliArgs();
  const metricsJson = readJson(metricsPath);
  const budgets = budgetsPath ? readJson(budgetsPath) : DEFAULT_BUDGETS;
  const groupedMetrics = parseMetrics(metricsJson);

  let hasFailure = false;
  console.log(`Checking perf budgets at p${percentileValue}`);

  for (const [metricName, budgetValue] of Object.entries(budgets)) {
    const samples = groupedMetrics.get(metricName) || [];
    const measured = percentile(samples, percentileValue);
    const pass = measured > 0 && measured <= Number(budgetValue);
    const status = pass ? "PASS" : "FAIL";

    if (!pass) hasFailure = true;
    console.log(
      `${status} ${metricName} measured=${measured}ms budget<=${budgetValue}ms samples=${samples.length}`,
    );
  }

  if (hasFailure) {
    console.error("Perf budget check failed.");
    process.exit(1);
  }

  console.log("Perf budget check passed.");
}

main();


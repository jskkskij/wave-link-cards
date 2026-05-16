import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shopOrderTarget } from "@/lib/view-routing-client";

/**
 * Canonical commerce entry (/shop) — client-side only (no server redirect chain).
 */
const Shop = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const target = shopOrderTarget();
    navigate(target, { replace: true });
    requestAnimationFrame(() => {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
    });
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-sm"
      role="status"
      aria-live="polite"
    >
      Opening order…
    </div>
  );
};

export default Shop;

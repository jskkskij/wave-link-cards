import { useEffect } from "react";

/**
 * Canonical commerce entry (/shop) — sends visitors to the homepage order section.
 */
const Shop = () => {
  useEffect(() => {
    window.location.replace(`${window.location.origin}/#order`);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-sm">
      Opening order…
    </div>
  );
};

export default Shop;

import { useEffect } from "react";

/**
 * Hook to disable inspect element, right-click, and common dev tool shortcuts.
 * Note: This doesn't make code unreadable, but raises the bar for casual copying.
 */
export const useDisableSource = () => {
    useEffect(() => {
        // Disable right-click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // Disable keyboard shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            // F12
            if (e.key === "F12") {
                e.preventDefault();
            }

            // Ctrl+Shift+I (Inspect)
            if (e.ctrlKey && e.shiftKey && e.key === "I") {
                e.preventDefault();
            }

            // Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && e.key === "J") {
                e.preventDefault();
            }

            // Ctrl+U (View Source)
            if (e.ctrlKey && e.key === "u") {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
};

import { useEffect } from "react";

export function useSourceTracker() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const source =
      url.searchParams.get("src") || url.searchParams.get("origin");

    if (!source) return;

    // Envia evento pro Vercel Analytics
    if (typeof window !== "undefined" && typeof (window as any).va === "function") {
      (window as any).va("came_from_cv", { source });
    }
  }, []);
}

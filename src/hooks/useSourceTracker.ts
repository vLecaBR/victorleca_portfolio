import { useEffect } from "react";

export function useSourceTracker() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const source =
      url.searchParams.get("src") || url.searchParams.get("origin");

    if (!source) return;

    // Envia evento pro Vercel Analytics
    if (typeof window !== "undefined" && (window as any).va) {
      (window as any).va.track("came_from_cv", { source });
    }
  }, []);
}

// CoreChat/frontend/src/hooks/useMobile.ts

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const getIsMobile = () =>
    typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;

  const [isMobile, setIsMobile] = React.useState<boolean>(getIsMobile);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    // Set immediately
    setIsMobile(mql.matches);

    // Listen for changes
    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

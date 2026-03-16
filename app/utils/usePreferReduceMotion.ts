"use client";
import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const usePrefersReducedMotion = () => {
    const [matches, setMatches] = useState(
        () => window?.matchMedia?.(QUERY).matches ?? false,
    );

    useEffect(() => {
        const mediaQueryList = window.matchMedia(QUERY);
        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

        mediaQueryList.addEventListener("change", listener);
        return () => mediaQueryList.removeEventListener("change", listener);
    }, []);

    return matches;
};

export default usePrefersReducedMotion;

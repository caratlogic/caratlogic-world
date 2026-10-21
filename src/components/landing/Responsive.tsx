import type { ReactNode } from "react";
import "./responsive.css";

/**
 * Renders the desktop and mobile artboard versions of a section and lets CSS pick one
 * (below 768px → mobile). CSS-based so server and client markup always match.
 */
export function Responsive({ desktop, mobile }: { desktop: ReactNode; mobile: ReactNode }) {
    return (
        <>
            <div className="lp-desktop-only">{desktop}</div>
            <div className="lp-mobile-only">{mobile}</div>
        </>
    );
}

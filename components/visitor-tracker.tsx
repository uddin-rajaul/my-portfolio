"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Generate a unique visitor ID and store in localStorage
function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  
  let visitorId = localStorage.getItem("visitor_id");
  
  if (!visitorId) {
    visitorId = `v_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("visitor_id", visitorId);
  }
  
  return visitorId;
}

export function VisitorTracker() {
  const pathname = usePathname();
  
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const visitorId = getVisitorId();
        if (!visitorId) return;
        
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: pathname,
            visitorId,
          }),
        });
      } catch (error) {
        // Silently fail - analytics shouldn't break the site
        console.debug("Analytics tracking failed:", error);
      }
    };
    
    trackVisit();
  }, [pathname]);
  
  return null; // This component doesn't render anything
}

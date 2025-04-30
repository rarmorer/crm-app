"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionRefresher() {
  const { data: session } = useSession();
  const [interval, setIntervalValue] = useState(null);

  useEffect(() => {
    // Clear any existing interval
    if (interval) {
      clearInterval(interval);
    }

    if (session?.accessToken) {
      // Set up an interval to refresh the session, 5 minutes before expiration time
      const refreshInterval = setInterval(() => {
        // This will trigger the jwt callback in [...nextauth].jswhich will refresh the token if needed
        fetch('/api/auth/session');
      }, 55 * 60 * 1000); // 55 minutes
      
      setIntervalValue(refreshInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [session]);


  return null;
}

"use client";

import { useEffect, useState } from "react";

/** Shows the current time in a given time zone, updated every 30 seconds. */
export default function LocalTime({ timeZone = "Asia/Kolkata" }: { timeZone?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone,
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return <span suppressHydrationWarning>{time ?? "··:··"} IST</span>;
}
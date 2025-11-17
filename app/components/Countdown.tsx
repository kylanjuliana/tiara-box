"use client";

import { useEffect, useState } from "react";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const targetDate = new Date("2026-05-19T18:30:00Z").getTime();

type CountdownProps = {
  onComplete?: () => void;
};

export function Countdown({ onComplete }: CountdownProps) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let completed = false;

    function update() {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        if (!completed) {
          completed = true;
          setFinished(true);
          setRemaining(null);
          if (onComplete) {
            onComplete();
          }
        }
        return;
      }

      const secondsTotal = Math.floor(diff / 1000);
      const days = Math.floor(secondsTotal / (60 * 60 * 24));
      const hours = Math.floor((secondsTotal % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((secondsTotal % (60 * 60)) / 60);
      const seconds = secondsTotal % 60;

      setRemaining({ days, hours, minutes, seconds });
    }

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <div className="mt-8 flex flex-col items-center gap-1 text-center text-sm text-slate-800">
      <p className="text-xs uppercase tracking-[0.18em] text-cyan-800/80">
        Countdown to 20 May 2026 (Kolkata)
      </p>
      {finished ? (
        <p className="mt-1 text-base font-semibold text-cyan-900">
          It&apos;s time!
        </p>
      ) : remaining ? (
        <div className="mt-1 flex flex-wrap items-center justify-center gap-3 text-sm">
          <TimeChip label="days" value={remaining.days} />
          <TimeChip label="hours" value={remaining.hours} />
          <TimeChip label="minutes" value={remaining.minutes} />
          <TimeChip label="seconds" value={remaining.seconds} />
        </div>
      ) : (
        <p className="mt-1 text-xs text-slate-700">Calculating...</p>
      )}
    </div>
  );
}

type TimeChipProps = {
  label: string;
  value: number;
};

function TimeChip({ label, value }: TimeChipProps) {
  return (
    <div className="flex min-w-[3.5rem] flex-col items-center rounded-full bg-white/70 px-3 py-1 shadow-sm">
      <span className="text-sm font-semibold text-cyan-900 tabular-nums">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-[0.16em] text-cyan-800/80">
        {label}
      </span>
    </div>
  );
}


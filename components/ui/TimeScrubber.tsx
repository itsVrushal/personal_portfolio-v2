"use client";

import { useState, useSyncExternalStore } from "react";
import { useTimeOfDay, TimePeriod } from "@/lib/useTimeOfDay";
import { siteConfig } from "@/lib/config";

const emptySubscribe = () => () => {};

export default function TimeScrubber() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { mode, setMode, hour, setSimulatedHour, period, isNight, moonPhase } = useTimeOfDay();
  const [isOpen, setIsOpen] = useState(false);

  if (!siteConfig.enableTimeScrubber || !mounted) {
    return null;
  }

  // Format hour into 12-hour AM/PM string
  const formatTime = (h: number) => {
    const totalMinutes = Math.round(h * 60);
    let hrs = Math.floor(totalMinutes / 60) % 24;
    const mins = totalMinutes % 60;
    const ampm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs % 12;
    if (hrs === 0) hrs = 12;
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    return `${hrs}:${formattedMins} ${ampm}`;
  };

  const getPeriodLabel = (p: TimePeriod) => {
    switch (p) {
      case "dawn":
        return "🌅 Sunrise";
      case "day":
        return "☀️ Daylight";
      case "sunset":
        return "🌇 Sunset";
      case "dusk":
        return "🌆 Twilight";
      case "night":
        return "🌙 Night";
    }
  };

  const presets: { label: string; hour: number; icon: string }[] = [
    { label: "Dawn", hour: 6.2, icon: "🌅" },
    { label: "Noon", hour: 12.0, icon: "☀️" },
    { label: "Sunset", hour: 18.4, icon: "🌇" },
    { label: "Dusk", hour: 20.0, icon: "🌆" },
    { label: "Midnight", hour: 0.0, icon: "🌌" },
  ];

  return (
    <div
      className="fixed bottom-6 right-6 z-50 pointer-events-auto select-none"
      aria-label="Celestial Time Controller"
    >
      <div className="bg-surface/90 backdrop-blur-xl border border-border/80 shadow-[0_8px_32px_var(--shadow-warm)] rounded-2xl p-3 text-text-hi transition-all duration-300 max-w-sm">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-xs font-semibold hover:text-accent transition-colors cursor-pointer text-left"
            title="Click to toggle time simulation controls"
          >
            <span className="text-base">{isNight ? "🌙" : "☀️"}</span>
            <span>
              {formatTime(hour)} • {getPeriodLabel(period)}
            </span>
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-accent-dim text-accent font-bold">
              {mode === "live" ? "Live Time" : "Simulated"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Collapse time controls" : "Expand time controls"}
            className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-black/5 text-text-lo hover:text-text-hi transition-colors cursor-pointer text-xs"
          >
            {isOpen ? "✕" : "⚙"}
          </button>
        </div>

        {/* Expanded Controls Drawer */}
        {isOpen && (
          <div className="mt-3 pt-3 border-t border-border/50 flex flex-col gap-3">
            {/* Mode switch */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-lo">Mode:</span>
              <div className="flex rounded-lg border border-border p-0.5 bg-surface/50 text-[11px]">
                <button
                  type="button"
                  onClick={() => setMode("live")}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    mode === "live"
                      ? "bg-accent text-accent-ink font-bold shadow-xs"
                      : "text-text-lo hover:text-text-hi"
                  }`}
                >
                  Live System Time
                </button>
                <button
                  type="button"
                  onClick={() => setMode("simulated")}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    mode === "simulated"
                      ? "bg-accent text-accent-ink font-bold shadow-xs"
                      : "text-text-lo hover:text-text-hi"
                  }`}
                >
                  Simulation
                </button>
              </div>
            </div>

            {/* Quick Simulation Presets */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] text-text-lo font-medium">Quick Presets:</span>
              <div className="grid grid-cols-5 gap-1">
                {presets.map((pr) => (
                  <button
                    key={pr.label}
                    type="button"
                    onClick={() => {
                      setMode("simulated");
                      setSimulatedHour(pr.hour);
                    }}
                    className={`flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] border transition-all cursor-pointer ${
                      mode === "simulated" && Math.abs(hour - pr.hour) < 0.5
                        ? "bg-accent/15 border-accent text-accent font-bold shadow-xs"
                        : "border-border/60 hover:bg-black/5 text-text-lo"
                    }`}
                  >
                    <span>{pr.icon}</span>
                    <span className="mt-0.5">{pr.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 24-Hour Interactive Scrubber */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px] text-text-lo">
                <span>00:00 (East: Moon)</span>
                <span className="font-bold text-accent">{formatTime(hour)}</span>
                <span>23:59 (West: Sun)</span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                step="0.1"
                value={hour}
                onChange={(e) => {
                  setMode("simulated");
                  setSimulatedHour(parseFloat(e.target.value));
                }}
                className="w-full accent-accent cursor-pointer h-1.5 bg-border/40 rounded-lg"
              />
            </div>

            {/* Real Astronomical Moon Phase synced to local date */}
            <div className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg bg-surface/50 border border-border/40">
              <span className="text-text-lo">Lunar Phase:</span>
              <span className="font-semibold text-text-hi flex items-center gap-1.5">
                <span>{moonPhase.phaseSymbol}</span>
                <span>{moonPhase.phaseName}</span>
                <span className="text-[10px] text-accent font-mono font-bold">({moonPhase.illuminationPct}%)</span>
              </span>
            </div>

            <p className="text-[10px] text-text-lo leading-tight">
              ☀️ Sun rises in East (right) &amp; sets in West (left). 🌙 Moon arcs at night. 🌟 Fireflies active after dusk!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

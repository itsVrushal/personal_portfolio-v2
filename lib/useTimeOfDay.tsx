"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import {
  calculateSunPosition,
  calculateMoonPosition,
  getPeriod,
  getThemeTint,
  getSystemHour,
  TimePeriod,
  ThemeTint,
} from "./astronomy";
import { getMoonPhase, MoonPhaseInfo } from "./moonPhase";

export type { TimePeriod, ThemeTint, MoonPhaseInfo };

interface TimeContextType {
  mode: "live" | "simulated";
  setMode: (mode: "live" | "simulated") => void;
  hour: number; // 0 - 24 float
  setSimulatedHour: (h: number) => void;
  period: TimePeriod;
  isNight: boolean;
  sunVisible: boolean;
  sunX: number; // percentage 0 - 100 across screen (East/Right to West/Left)
  sunY: number; // percentage 0 - 100 altitude
  moonVisible: boolean;
  moonX: number; // percentage 0 - 100 across screen (East/Right to West/Left)
  moonY: number; // percentage 0 - 100 altitude
  moonPhaseAngle: number; // 0: new moon, 0.5: full moon, 1: new moon
  moonPhase: MoonPhaseInfo; // Rich astronomical phase details synced to local date
  themeTint: ThemeTint;
}

const TimeContext = createContext<TimeContextType | null>(null);

export function TimeProvider({
  children,
  initialHour,
}: {
  children: ReactNode;
  initialHour?: number;
}) {
  const [mode, setMode] = useState<"live" | "simulated">("live");
  const fallbackHour = initialHour ?? getSystemHour();
  const [simulatedHour, setSimulatedHour] = useState<number>(fallbackHour);
  const [liveHour, setLiveHour] = useState<number>(fallbackHour);

  // Initialize and tick live system time
  useEffect(() => {
    const updateTime = () => {
      setLiveHour(getSystemHour());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // 1-second precision
    return () => clearInterval(interval);
  }, []);

  const effectiveHour = mode === "live" ? liveHour : simulatedHour;
  const period = getPeriod(effectiveHour);
  const isNight = effectiveHour >= 19.5 || effectiveHour < 5.3;

  const sun = calculateSunPosition(effectiveHour);
  const moon = calculateMoonPosition(effectiveHour);
  const themeTint = getThemeTint(period);

  // High-precision astronomical moon phase synced to local date & time
  const moonPhase = getMoonPhase(new Date());

  return (
    <TimeContext.Provider
      value={{
        mode,
        setMode,
        hour: effectiveHour,
        setSimulatedHour,
        period,
        isNight,
        sunVisible: sun.visible,
        sunX: sun.x,
        sunY: sun.y,
        moonVisible: moon.visible,
        moonX: moon.x,
        moonY: moon.y,
        moonPhaseAngle: moonPhase.normalizedPhase,
        moonPhase,
        themeTint,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
}

export function useTimeOfDay() {
  const ctx = useContext(TimeContext);
  if (!ctx) {
    throw new Error("useTimeOfDay must be used within a TimeProvider");
  }
  return ctx;
}

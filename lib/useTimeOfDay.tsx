"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";

export type TimePeriod = "dawn" | "day" | "sunset" | "dusk" | "night";

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
  themeTint: {
    skyGradient: string;
    mountainFilter: string;
    ambientScrim: string;
  };
}

const TimeContext = createContext<TimeContextType | null>(null);

// Astronomical positions matching Yosemite Valley mountain silhouette
// Sunrise: 05:30 (East/Right), Noon: 12:00 (Zenith), Sunset: 18:45 (West/Left)
function calculateSunPosition(h: number) {
  // Visible between 05.2 and 19.0
  const sunrise = 5.3;
  const sunset = 19.0;
  if (h < sunrise || h > sunset) {
    return { visible: false, x: 86, y: 35 };
  }
  // Progress from 0 (sunrise) to 1 (sunset)
  const t = (h - sunrise) / (sunset - sunrise);
  // East is Right (p = 1), West is Left (p = 0)
  const p = 1 - t;
  // X: from 86% (East) to 14% (West)
  const x = 14 + 72 * p;
  // Parabolic Y: 3.5% at noon (p=0.5), 26% at sunrise/sunset (safely behind mountain summits at 8.5%-11%)
  const y = 3.5 + 90 * Math.pow(p - 0.5, 2);
  return { visible: true, x, y };
}

// Moonrise: 18.5 (East/Right), Midnight: 00:00 (Zenith), Moonset: 06.5 (West/Left)
function calculateMoonPosition(h: number) {
  let nightHour = h;
  if (h >= 18.5) {
    nightHour = h - 18.5;
  } else if (h <= 6.5) {
    nightHour = h + 5.5; // (24 - 18.5) + h
  } else {
    return { visible: false, x: 86, y: 35 };
  }

  const totalNight = 12.0;
  const t = Math.min(Math.max(nightHour / totalNight, 0), 1);
  const p = 1 - t; // 1 is East/Right, 0 is West/Left
  const x = 14 + 72 * p;
  const y = 4.5 + 86 * Math.pow(p - 0.5, 2);
  return { visible: true, x, y };
}

function getPeriod(h: number): TimePeriod {
  if (h >= 5.0 && h < 8.0) return "dawn";
  if (h >= 8.0 && h < 17.5) return "day";
  if (h >= 17.5 && h < 19.5) return "sunset";
  if (h >= 19.5 && h < 21.0) return "dusk";
  return "night";
}

function getThemeTint(period: TimePeriod) {
  switch (period) {
    case "dawn":
      return {
        skyGradient:
          "linear-gradient(180deg, rgba(254, 215, 170, 0.72) 0%, rgba(253, 186, 116, 0.48) 45%, rgba(251, 146, 60, 0.25) 100%)",
        mountainFilter: "contrast(1.06) brightness(0.96) saturate(1.15) sepia(0.08)",
        ambientScrim:
          "linear-gradient(180deg, rgba(255, 237, 213, 0.22) 0%, rgba(254, 215, 170, 0.32) 50%, rgba(255, 247, 237, 0.46) 100%)",
      };
    case "day":
      return {
        skyGradient: "transparent",
        mountainFilter: "contrast(1.06) saturate(1.12) brightness(1.0)",
        ambientScrim:
          "linear-gradient(180deg, rgba(247, 244, 237, 0.25) 0%, rgba(247, 244, 237, 0.36) 45%, rgba(247, 244, 237, 0.48) 100%)",
      };
    case "sunset":
      return {
        skyGradient:
          "linear-gradient(180deg, rgba(234, 88, 12, 0.65) 0%, rgba(225, 29, 72, 0.52) 45%, rgba(136, 19, 55, 0.35) 100%)",
        mountainFilter: "contrast(1.15) saturate(1.3) brightness(0.9) sepia(0.18) hue-rotate(-10deg)",
        ambientScrim:
          "linear-gradient(180deg, rgba(255, 237, 213, 0.25) 0%, rgba(251, 146, 60, 0.35) 50%, rgba(244, 63, 94, 0.25) 100%)",
      };
    case "dusk":
      return {
        skyGradient:
          "linear-gradient(180deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 27, 75, 0.72) 45%, rgba(67, 56, 202, 0.45) 100%)",
        mountainFilter: "contrast(1.12) saturate(0.9) brightness(0.72) hue-rotate(-15deg)",
        ambientScrim:
          "linear-gradient(180deg, rgba(15, 23, 42, 0.45) 0%, rgba(30, 27, 75, 0.5) 50%, rgba(15, 23, 42, 0.6) 100%)",
      };
    case "night":
    default:
      return {
        skyGradient:
          "linear-gradient(180deg, #020617 0%, #070d1e 35%, #0f172a 70%, #1e293b 100%)",
        mountainFilter: "contrast(1.22) saturate(0.75) brightness(0.48) hue-rotate(-22deg)",
        ambientScrim:
          "linear-gradient(180deg, rgba(2, 6, 23, 0.55) 0%, rgba(15, 23, 42, 0.62) 50%, rgba(2, 6, 23, 0.7) 100%)",
      };
  }
}

export function TimeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"live" | "simulated">("live");
  const [simulatedHour, setSimulatedHour] = useState<number>(12); // Default simulated: noon
  const [liveHour, setLiveHour] = useState<number>(12);

  // Initialize and tick live system time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveHour(now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600);
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

  // Approximate lunar phase angle based on day of month (cycles ~29.5 days)
  const dayOfMonth = new Date().getDate();
  const moonPhaseAngle = (dayOfMonth % 29.5) / 29.5; // 0 to 1

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
        moonPhaseAngle,
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

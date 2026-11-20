/**
 * Astronomical and Temporal Mechanics
 * Pure TypeScript functions for celestial trajectories, periods, and lighting.
 */

export type TimePeriod = "dawn" | "day" | "sunset" | "dusk" | "night";

export interface CelestialCoordinates {
  visible: boolean;
  x: number; // percentage across screen 0-100 (East/Right to West/Left)
  y: number; // percentage down screen 0-100 (Altitude)
}

export interface ThemeTint {
  skyGradient: string;
  mountainFilter: string;
  ambientScrim: string;
}

/**
 * Astronomical Sun trajectory matching Yosemite Valley mountain silhouette.
 * Sunrise: 05:18 (East/Right), Noon: 12:00 (Zenith), Sunset: 19:00 (West/Left).
 * The Sun physically emerges from behind eastern peaks (x ~ 86%) and sets behind western cliffs (x ~ 14%).
 */
export function calculateSunPosition(h: number): CelestialCoordinates {
  // Normalize hour to 0-24
  const normalizedH = ((h % 24) + 24) % 24;
  const sunrise = 5.3;
  const sunset = 19.0;

  if (normalizedH < sunrise || normalizedH > sunset) {
    return { visible: false, x: 86, y: 35 };
  }

  // Progress from 0 (sunrise) to 1 (sunset)
  const t = (normalizedH - sunrise) / (sunset - sunrise);
  // East is Right (p = 1), West is Left (p = 0)
  const p = 1 - t;
  // X: from 86% (East) to 14% (West)
  const x = 14 + 72 * p;
  // Parabolic Y: 3.5% at noon (p=0.5), ~26% at sunrise/sunset (behind mountain summits at 8.5%-11%)
  const y = 3.5 + 90 * Math.pow(p - 0.5, 2);

  return {
    visible: true,
    x: Number(x.toFixed(4)),
    y: Number(y.toFixed(4)),
  };
}

/**
 * Astronomical Moon trajectory matching Yosemite Valley mountain silhouette.
 * Moonrise: 18:30 (East/Right), Midnight: 00:00 (Zenith), Moonset: 06:30 (West/Left).
 * Rises behind eastern peaks and descends behind western cliffs.
 */
export function calculateMoonPosition(h: number): CelestialCoordinates {
  const normalizedH = ((h % 24) + 24) % 24;
  let nightHour = normalizedH;

  if (normalizedH >= 18.5) {
    nightHour = normalizedH - 18.5;
  } else if (normalizedH <= 6.5) {
    nightHour = normalizedH + 5.5; // (24 - 18.5) + h
  } else {
    return { visible: false, x: 86, y: 35 };
  }

  const totalNight = 12.0;
  const t = Math.min(Math.max(nightHour / totalNight, 0), 1);
  const p = 1 - t; // 1 is East/Right, 0 is West/Left
  const x = 14 + 72 * p;
  const y = 4.5 + 86 * Math.pow(p - 0.5, 2);

  return {
    visible: true,
    x: Number(x.toFixed(4)),
    y: Number(y.toFixed(4)),
  };
}

/**
 * Classifies 24-hour time into the 5 atmospheric lighting periods.
 */
export function getPeriod(h: number): TimePeriod {
  const normalizedH = ((h % 24) + 24) % 24;
  if (normalizedH >= 5.0 && normalizedH < 8.0) return "dawn";
  if (normalizedH >= 8.0 && normalizedH < 17.5) return "day";
  if (normalizedH >= 17.5 && normalizedH < 19.5) return "sunset";
  if (normalizedH >= 19.5 && normalizedH < 21.0) return "dusk";
  return "night";
}

/**
 * Checks whether the current time belongs to the night/dusk phase.
 */
export function isNightTime(h: number): boolean {
  const normalizedH = ((h % 24) + 24) % 24;
  return normalizedH >= 19.5 || normalizedH < 5.3;
}

/**
 * Generates theme lighting tints, sky gradients, mountain filters, and ambient scrims.
 */
export function getThemeTint(period: TimePeriod): ThemeTint {
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
        mountainFilter:
          "contrast(1.15) saturate(1.3) brightness(0.9) sepia(0.18) hue-rotate(-10deg)",
        ambientScrim:
          "linear-gradient(180deg, rgba(255, 237, 213, 0.25) 0%, rgba(251, 146, 60, 0.35) 50%, rgba(244, 63, 94, 0.25) 100%)",
      };
    case "dusk":
      return {
        skyGradient:
          "linear-gradient(180deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 27, 75, 0.72) 45%, rgba(67, 56, 202, 0.45) 100%)",
        mountainFilter:
          "contrast(1.12) saturate(0.9) brightness(0.72) hue-rotate(-15deg)",
        ambientScrim:
          "linear-gradient(180deg, rgba(15, 23, 42, 0.45) 0%, rgba(30, 27, 75, 0.5) 50%, rgba(15, 23, 42, 0.6) 100%)",
      };
    case "night":
    default:
      return {
        skyGradient:
          "linear-gradient(180deg, #020617 0%, #070d1e 35%, #0f172a 70%, #1e293b 100%)",
        mountainFilter:
          "contrast(1.22) saturate(0.75) brightness(0.48) hue-rotate(-22deg)",
        ambientScrim:
          "linear-gradient(180deg, rgba(2, 6, 23, 0.55) 0%, rgba(15, 23, 42, 0.62) 50%, rgba(2, 6, 23, 0.7) 100%)",
      };
  }
}

/**
 * Returns current local time as a decimal hour [0, 24).
 */
export function getSystemHour(date: Date = new Date()): number {
  return Number(
    (date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600).toFixed(4)
  );
}

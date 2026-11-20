/**
 * Astronomical Moon Phase Mechanics
 * Implements Jean Meeus' standard astronomical algorithm for lunar phase,
 * elongation, illuminated fraction, and phase classification synced to local date.
 */

export type MoonPhaseKey =
  | "new_moon"
  | "waxing_crescent"
  | "first_quarter"
  | "waxing_gibbous"
  | "full_moon"
  | "waning_gibbous"
  | "last_quarter"
  | "waning_crescent";

export interface MoonPhaseInfo {
  /** Elongation of the Moon from the Sun in degrees [0, 360) */
  elongationDeg: number;
  /** Normalized phase progress within synodic month [0.0, 1.0) */
  normalizedPhase: number;
  /** Exact illuminated fraction [0.0, 1.0] */
  illumination: number;
  /** Integer illumination percentage [0, 100] */
  illuminationPct: number;
  /** Human-readable phase title (e.g., "Waxing Gibbous") */
  phaseName: string;
  /** Astronomical Unicode emoji symbol (e.g., "🌔") */
  phaseSymbol: string;
  /** Machine-readable key */
  phaseKey: MoonPhaseKey;
  /** Whether the moon is waxing (growing) vs waning (shrinking) */
  isWaxing: boolean;
  /** Days into the current ~29.53 day lunar cycle */
  lunarAgeDays: number;
}

const SYNODIC_MONTH = 29.53058867; // Days from new moon to new moon
const TO_RAD = Math.PI / 180;

/**
 * Calculates high-precision astronomical moon phase details for any given Date.
 * Syncs seamlessly with the user's local date and time.
 */
export function getMoonPhase(date: Date = new Date()): MoonPhaseInfo {
  const time = date.getTime();
  const jd = time / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525; // Julian centuries since J2000.0

  // Mean elongation of the Moon (D) in degrees
  let D =
    297.8501921 +
    445267.1114034 * T -
    0.0018819 * T * T +
    (T * T * T) / 545868 -
    (T * T * T * T) / 113065000;
  D = ((D % 360) + 360) % 360;

  // Sun's mean anomaly (M) in degrees
  let M =
    357.5291092 +
    35999.0502909 * T -
    0.0001536 * T * T +
    (T * T * T) / 24490000;
  M = ((M % 360) + 360) % 360;

  // Moon's mean anomaly (M') in degrees
  let Mprime =
    134.9633964 +
    477198.8675055 * T +
    0.0087414 * T * T +
    (T * T * T) / 69699 -
    (T * T * T * T) / 14712000;
  Mprime = ((Mprime % 360) + 360) % 360;

  // True phase angle i (degrees) using Meeus Chapter 48 corrections
  let phaseAngle =
    180 -
    D -
    6.289 * Math.sin(Mprime * TO_RAD) +
    2.1 * Math.sin(M * TO_RAD) -
    1.274 * Math.sin((2 * D - Mprime) * TO_RAD) -
    0.658 * Math.sin(2 * D * TO_RAD) -
    0.214 * Math.sin(2 * Mprime * TO_RAD) -
    0.11 * Math.sin(D * TO_RAD);
  phaseAngle = ((phaseAngle % 360) + 360) % 360;

  // Illuminated fraction k [0.0, 1.0]
  const illumination = (1 + Math.cos(phaseAngle * TO_RAD)) / 2;

  // Normalized phase progress in cycle [0.0, 1.0)
  const normalizedPhase = D / 360;
  const lunarAgeDays = normalizedPhase * SYNODIC_MONTH;

  // Phase classification based on elongation degrees
  // New Moon: centered at 0° (±9°)
  // First Quarter: centered at 90° (±9°)
  // Full Moon: centered at 180° (±9°)
  // Last Quarter: centered at 270° (±9°)
  let phaseName: string;
  let phaseSymbol: string;
  let phaseKey: MoonPhaseKey;

  if (normalizedPhase < 0.025 || normalizedPhase >= 0.975) {
    phaseName = "New Moon";
    phaseSymbol = "🌑";
    phaseKey = "new_moon";
  } else if (normalizedPhase < 0.225) {
    phaseName = "Waxing Crescent";
    phaseSymbol = "🌒";
    phaseKey = "waxing_crescent";
  } else if (normalizedPhase < 0.275) {
    phaseName = "First Quarter";
    phaseSymbol = "🌓";
    phaseKey = "first_quarter";
  } else if (normalizedPhase < 0.475) {
    phaseName = "Waxing Gibbous";
    phaseSymbol = "🌔";
    phaseKey = "waxing_gibbous";
  } else if (normalizedPhase < 0.525) {
    phaseName = "Full Moon";
    phaseSymbol = "🌕";
    phaseKey = "full_moon";
  } else if (normalizedPhase < 0.725) {
    phaseName = "Waning Gibbous";
    phaseSymbol = "🌖";
    phaseKey = "waning_gibbous";
  } else if (normalizedPhase < 0.775) {
    phaseName = "Last Quarter";
    phaseSymbol = "🌗";
    phaseKey = "last_quarter";
  } else {
    phaseName = "Waning Crescent";
    phaseSymbol = "🌘";
    phaseKey = "waning_crescent";
  }

  return {
    elongationDeg: Number(D.toFixed(2)),
    normalizedPhase: Number(normalizedPhase.toFixed(4)),
    illumination: Number(illumination.toFixed(4)),
    illuminationPct: Math.round(illumination * 100),
    phaseName,
    phaseSymbol,
    phaseKey,
    isWaxing: normalizedPhase < 0.5,
    lunarAgeDays: Number(lunarAgeDays.toFixed(2)),
  };
}

/**
 * Calculates the SVG path parameters for the terminator line of the moon shadow.
 * For a circle centered at (cx, cy) with radius r:
 * - A semi-circle is drawn on the dark side.
 * - An elliptical arc with horizontal radius rx is drawn across the face.
 *
 * rx = r * Math.abs(cos(2 * PI * normalizedPhase))
 */
export function getLunarShadowMask(
  normalizedPhase: number,
  r = 29,
  cx = 29,
  cy = 29
): {
  shadowPath: string;
  isFull: boolean;
  isNew: boolean;
} {
  // If virtually full (>98% illuminated)
  if (normalizedPhase >= 0.485 && normalizedPhase <= 0.515) {
    return { shadowPath: "", isFull: true, isNew: false };
  }

  // If new moon (<1.5% illuminated)
  if (normalizedPhase <= 0.015 || normalizedPhase >= 0.985) {
    // Entire disc is in shadow
    const shadowPath = `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;
    return { shadowPath, isFull: false, isNew: true };
  }

  // Waxing: 0 < phase < 0.5. Shadow is on the LEFT side.
  // Waning: 0.5 < phase < 1.0. Shadow is on the RIGHT side.
  const isWaxing = normalizedPhase < 0.5;

  // Phase angle from 0 to 2*PI
  const angle = 2 * Math.PI * normalizedPhase;
  const cosAngle = Math.cos(angle);
  const rx = Math.max(0.1, r * Math.abs(cosAngle));

  // Determine top and bottom poles
  const topY = cy - r;
  const botY = cy + r;

  let shadowPath = "";

  if (isWaxing) {
    // Left half is dark by default for crescent, illuminated bulging for gibbous
    if (normalizedPhase < 0.25) {
      // Waxing Crescent: Dark area covers left outer semi-circle + center-to-right ellipse
      shadowPath = `
        M ${cx} ${topY}
        A ${r} ${r} 0 0 0 ${cx} ${botY}
        A ${rx} ${r} 0 0 0 ${cx} ${topY}
        Z
      `;
    } else {
      // Waxing Gibbous: Dark area is just a thin crescent sliver on far left
      shadowPath = `
        M ${cx} ${topY}
        A ${r} ${r} 0 0 0 ${cx} ${botY}
        A ${rx} ${r} 0 0 1 ${cx} ${topY}
        Z
      `;
    }
  } else {
    // Waning: Right half is dark
    if (normalizedPhase < 0.75) {
      // Waning Gibbous: Dark area is just a thin crescent sliver on far right
      shadowPath = `
        M ${cx} ${topY}
        A ${r} ${r} 0 0 1 ${cx} ${botY}
        A ${rx} ${r} 0 0 0 ${cx} ${topY}
        Z
      `;
    } else {
      // Waning Crescent: Dark area covers right outer semi-circle + center-to-left ellipse
      shadowPath = `
        M ${cx} ${topY}
        A ${r} ${r} 0 0 1 ${cx} ${botY}
        A ${rx} ${r} 0 0 1 ${cx} ${topY}
        Z
      `;
    }
  }

  return {
    shadowPath: shadowPath.replace(/\s+/g, " ").trim(),
    isFull: false,
    isNew: false,
  };
}

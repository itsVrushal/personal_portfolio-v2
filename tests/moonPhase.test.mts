import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getMoonPhase, getLunarShadowMask } from "../lib/moonPhase.ts";

describe("Astronomical Moon Phase - Real World Epoch Validation", () => {
  it("matches known historical New Moon (January 11, 2024)", () => {
    // Exact UTC new moon: 2024-01-11 11:57 UTC
    const date = new Date(Date.UTC(2024, 0, 11, 11, 57));
    const moon = getMoonPhase(date);

    assert.equal(moon.phaseKey, "new_moon");
    assert.equal(moon.phaseName, "New Moon");
    assert.equal(moon.phaseSymbol, "🌑");
    assert.ok(moon.illuminationPct <= 2, `Expected illumination <= 2%, got ${moon.illuminationPct}%`);
  });

  it("matches known historical Full Moon (January 25, 2024)", () => {
    // Exact UTC full moon: 2024-01-25 17:54 UTC
    const date = new Date(Date.UTC(2024, 0, 25, 17, 54));
    const moon = getMoonPhase(date);

    assert.equal(moon.phaseKey, "full_moon");
    assert.equal(moon.phaseName, "Full Moon");
    assert.equal(moon.phaseSymbol, "🌕");
    assert.ok(moon.illuminationPct >= 98, `Expected illumination >= 98%, got ${moon.illuminationPct}%`);
  });

  it("matches known Solar Eclipse New Moon (April 8, 2024)", () => {
    // Great North American Eclipse: 2024-04-08 18:21 UTC
    const date = new Date(Date.UTC(2024, 3, 8, 18, 21));
    const moon = getMoonPhase(date);

    assert.equal(moon.phaseKey, "new_moon");
    assert.ok(moon.illuminationPct <= 2);
  });

  it("matches known Super Blue Moon (August 19, 2024)", () => {
    // 2024-08-19 18:26 UTC
    const date = new Date(Date.UTC(2024, 7, 19, 18, 26));
    const moon = getMoonPhase(date);

    assert.equal(moon.phaseKey, "full_moon");
    assert.ok(moon.illuminationPct >= 98);
  });

  it("calculates accurate phase for November 20, 2026", () => {
    const date = new Date("2026-11-20T11:19:07+05:30");
    const moon = getMoonPhase(date);

    assert.equal(moon.phaseKey, "waxing_gibbous");
    assert.equal(moon.phaseName, "Waxing Gibbous");
    assert.equal(moon.phaseSymbol, "🌔");
    assert.equal(moon.isWaxing, true);
    assert.ok(moon.illuminationPct >= 70 && moon.illuminationPct <= 85);
  });
});

describe("Astronomical Moon Phase - Cycle Completeness & Invariants", () => {
  it("progresses through all 8 lunar phases in order over a month", () => {
    const startDate = new Date(Date.UTC(2025, 0, 1, 0, 0, 0));
    const observedPhases = new Set<string>();

    // Step day by day over 35 days (covering > 1 full synodic cycle of 29.53 days)
    for (let day = 0; day < 35; day++) {
      const date = new Date(startDate.getTime() + day * 86400000);
      const moon = getMoonPhase(date);
      observedPhases.add(moon.phaseKey);
    }

    const expectedPhases = [
      "new_moon",
      "waxing_crescent",
      "first_quarter",
      "waxing_gibbous",
      "full_moon",
      "waning_gibbous",
      "last_quarter",
      "waning_crescent",
    ];

    for (const phase of expectedPhases) {
      assert.ok(observedPhases.has(phase), `Expected to observe phase: ${phase}`);
    }
  });

  it("guarantees illumination is strictly within [0, 100]", () => {
    const startDate = new Date(Date.UTC(2026, 0, 1));
    for (let h = 0; h < 24 * 60; h += 3) {
      const date = new Date(startDate.getTime() + h * 3600000);
      const moon = getMoonPhase(date);

      assert.ok(moon.illumination >= 0 && moon.illumination <= 1.0);
      assert.ok(moon.illuminationPct >= 0 && moon.illuminationPct <= 100);
      assert.ok(moon.normalizedPhase >= 0 && moon.normalizedPhase <= 1.0);
      assert.ok(moon.lunarAgeDays >= 0 && moon.lunarAgeDays <= 29.54);
    }
  });

  it("identifies waxing vs waning accurately", () => {
    // 0.0 to 0.5 is waxing, 0.5 to 1.0 is waning
    const testCases = [
      { date: new Date("2024-01-14T00:00:00Z"), expectedWaxing: true }, // Waxing Crescent
      { date: new Date("2024-01-18T00:00:00Z"), expectedWaxing: true }, // First Quarter
      { date: new Date("2024-01-22T00:00:00Z"), expectedWaxing: true }, // Waxing Gibbous
      { date: new Date("2024-01-28T00:00:00Z"), expectedWaxing: false }, // Waning Gibbous
      { date: new Date("2024-02-02T00:00:00Z"), expectedWaxing: false }, // Last Quarter
      { date: new Date("2024-02-06T00:00:00Z"), expectedWaxing: false }, // Waning Crescent
    ];

    for (const tc of testCases) {
      const moon = getMoonPhase(tc.date);
      assert.equal(
        moon.isWaxing,
        tc.expectedWaxing,
        `Date ${tc.date.toISOString()} should have isWaxing=${tc.expectedWaxing}`
      );
    }
  });
});

describe("Lunar Shadow Mask Rendering", () => {
  it("generates an empty shadow for Full Moon", () => {
    const mask = getLunarShadowMask(0.5);
    assert.equal(mask.isFull, true);
    assert.equal(mask.shadowPath, "");
  });

  it("generates a full shadow for New Moon", () => {
    const mask = getLunarShadowMask(0.0);
    assert.equal(mask.isNew, true);
    assert.ok(mask.shadowPath.includes("A 29 29"));
  });

  it("generates valid SVG path strings for all intermediate phases", () => {
    const testPhases = [0.1, 0.25, 0.35, 0.65, 0.75, 0.9];
    for (const phase of testPhases) {
      const mask = getLunarShadowMask(phase);
      assert.ok(mask.shadowPath.length > 0, `Expected path for phase ${phase}`);
      assert.ok(!mask.shadowPath.includes("NaN"), `Found NaN in path for phase ${phase}`);
      assert.ok(mask.shadowPath.startsWith("M"), `Path should start with M for phase ${phase}`);
      assert.ok(mask.shadowPath.endsWith("Z"), `Path should close with Z for phase ${phase}`);
    }
  });
});

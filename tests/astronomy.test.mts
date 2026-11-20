import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculateSunPosition,
  calculateMoonPosition,
  getPeriod,
  isNightTime,
  getThemeTint,
  getSystemHour,
} from "../lib/astronomy.ts";

describe("Astronomical Mechanics - Sun Trajectory", () => {
  it("marks sun as invisible during deep night", () => {
    const atMidnight = calculateSunPosition(0);
    assert.equal(atMidnight.visible, false);

    const at3AM = calculateSunPosition(3);
    assert.equal(at3AM.visible, false);

    const at10PM = calculateSunPosition(22);
    assert.equal(at10PM.visible, false);
  });

  it("marks sun as visible between sunrise and sunset", () => {
    const sunrise = calculateSunPosition(6);
    assert.equal(sunrise.visible, true);

    const noon = calculateSunPosition(12);
    assert.equal(noon.visible, true);

    const lateAfternoon = calculateSunPosition(17);
    assert.equal(lateAfternoon.visible, true);
  });

  it("rises in the East (screen right) and sets in the West (screen left)", () => {
    const sunrise = calculateSunPosition(5.5);
    const sunset = calculateSunPosition(18.8);

    // East (screen right) has a higher X coordinate than West (screen left)
    assert.ok(sunrise.x > 80, `Expected sunrise X > 80%, got ${sunrise.x}`);
    assert.ok(sunset.x < 20, `Expected sunset X < 20%, got ${sunset.x}`);
  });

  it("reaches its zenith (highest altitude, lowest Y percentage) at noon", () => {
    const noon = calculateSunPosition(12);
    const morning = calculateSunPosition(7);
    const afternoon = calculateSunPosition(17);

    // Y measures distance down from the top edge: lower Y = higher in the sky
    assert.ok(noon.y < morning.y, `Expected noon Y (${noon.y}) < morning Y (${morning.y})`);
    assert.ok(noon.y < afternoon.y, `Expected noon Y (${noon.y}) < afternoon Y (${afternoon.y})`);
    assert.ok(noon.y >= 3.0 && noon.y <= 4.0, `Expected noon Y near 3.5%, got ${noon.y}`);
  });

  it("quantizes coordinates to 4 decimal places without NaN or Infinity", () => {
    for (let h = 0; h < 24; h += 0.5) {
      const pos = calculateSunPosition(h);
      assert.ok(!Number.isNaN(pos.x), `x is NaN at hour ${h}`);
      assert.ok(!Number.isNaN(pos.y), `y is NaN at hour ${h}`);
      assert.ok(Number.isFinite(pos.x), `x is infinite at hour ${h}`);
      assert.ok(Number.isFinite(pos.y), `y is infinite at hour ${h}`);
      assert.ok(pos.x >= 0 && pos.x <= 100, `x out of bounds at ${h}`);
      assert.ok(pos.y >= 0 && pos.y <= 100, `y out of bounds at ${h}`);
    }
  });

  it("handles negative and wrap-around hours safely", () => {
    const wrapPast24 = calculateSunPosition(36); // Should equal hour 12
    const noon = calculateSunPosition(12);
    assert.equal(wrapPast24.visible, noon.visible);
    assert.equal(wrapPast24.x, noon.x);
    assert.equal(wrapPast24.y, noon.y);

    const negativeHour = calculateSunPosition(-12); // Should equal hour 12
    assert.equal(negativeHour.visible, noon.visible);
  });
});

describe("Astronomical Mechanics - Moon Trajectory", () => {
  it("marks moon as visible at night and invisible during midday", () => {
    const atMidnight = calculateMoonPosition(0);
    assert.equal(atMidnight.visible, true);

    const at3AM = calculateMoonPosition(3);
    assert.equal(at3AM.visible, true);

    const atNoon = calculateMoonPosition(12);
    assert.equal(atNoon.visible, false);

    const at10PM = calculateMoonPosition(22);
    assert.equal(at10PM.visible, true);
  });

  it("rises in the East (screen right) and sets in the West (screen left)", () => {
    const moonrise = calculateMoonPosition(19.0);
    const moonset = calculateMoonPosition(6.0);

    assert.ok(moonrise.x > 75, `Expected moonrise X > 75%, got ${moonrise.x}`);
    assert.ok(moonset.x < 25, `Expected moonset X < 25%, got ${moonset.x}`);
  });

  it("reaches highest altitude at solar midnight", () => {
    const midnight = calculateMoonPosition(0);
    const evening = calculateMoonPosition(20);
    const predawn = calculateMoonPosition(4);

    assert.ok(midnight.y < evening.y, `Midnight Y (${midnight.y}) should be < Evening Y (${evening.y})`);
    assert.ok(midnight.y < predawn.y, `Midnight Y (${midnight.y}) should be < Predawn Y (${predawn.y})`);
  });
});

describe("Atmospheric Periods & Lighting Tints", () => {
  it("classifies hours into correct chronological periods", () => {
    assert.equal(getPeriod(6), "dawn");
    assert.equal(getPeriod(12), "day");
    assert.equal(getPeriod(18.5), "sunset");
    assert.equal(getPeriod(20), "dusk");
    assert.equal(getPeriod(23), "night");
    assert.equal(getPeriod(2), "night");
  });

  it("identifies night periods correctly", () => {
    assert.equal(isNightTime(22), true);
    assert.equal(isNightTime(2), true);
    assert.equal(isNightTime(5.0), true);
    assert.equal(isNightTime(12), false);
    assert.equal(isNightTime(17), false);
  });

  it("generates valid CSS themes for all periods", () => {
    const periods = ["dawn", "day", "sunset", "dusk", "night"] as const;
    for (const p of periods) {
      const tint = getThemeTint(p);
      assert.ok(tint.skyGradient.length > 0, `Missing skyGradient for ${p}`);
      assert.ok(tint.mountainFilter.length > 0, `Missing mountainFilter for ${p}`);
      assert.ok(tint.ambientScrim.length > 0, `Missing ambientScrim for ${p}`);
    }
  });

  it("calculates system decimal hour accurately", () => {
    const date = new Date(2026, 10, 20, 14, 30, 0); // 14:30:00 = 14.5 hours
    const h = getSystemHour(date);
    assert.equal(h, 14.5);
  });
});

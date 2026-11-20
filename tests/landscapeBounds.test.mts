import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calculateSunPosition, calculateMoonPosition } from "../lib/astronomy.ts";

describe("Living Landscape Bounds & Mountain Aperture Safety", () => {
  it("keeps Sun coordinates safely above negative numbers and below 100%", () => {
    for (let m = 0; m < 1440; m += 15) {
      const h = m / 60;
      const pos = calculateSunPosition(h);
      assert.ok(pos.x >= 0 && pos.x <= 100, `Sun X out of bounds at ${h}: ${pos.x}`);
      assert.ok(pos.y >= 0 && pos.y <= 100, `Sun Y out of bounds at ${h}: ${pos.y}`);
    }
  });

  it("keeps Moon coordinates safely within screen percentages", () => {
    for (let m = 0; m < 1440; m += 15) {
      const h = m / 60;
      const pos = calculateMoonPosition(h);
      assert.ok(pos.x >= 0 && pos.x <= 100, `Moon X out of bounds at ${h}: ${pos.x}`);
      assert.ok(pos.y >= 0 && pos.y <= 100, `Moon Y out of bounds at ${h}: ${pos.y}`);
    }
  });

  it("ensures Sun and Moon do not overlap in visibility during midday or midnight", () => {
    const noonSun = calculateSunPosition(12);
    const noonMoon = calculateMoonPosition(12);
    assert.equal(noonSun.visible, true);
    assert.equal(noonMoon.visible, false);

    const midnightSun = calculateSunPosition(0);
    const midnightMoon = calculateMoonPosition(0);
    assert.equal(midnightSun.visible, false);
    assert.equal(midnightMoon.visible, true);
  });
});

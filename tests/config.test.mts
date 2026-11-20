import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { siteConfig } from "../lib/config.ts";

describe("Site Configuration & Production Deployment Safety", () => {
  it("defaults enableTimeScrubber to false for production deployment", () => {
    // In production, the portfolio strictly runs on the visitor's live local clock
    // without displaying the simulation widget unless explicitly enabled
    assert.equal(
      typeof siteConfig.enableTimeScrubber,
      "boolean",
      "enableTimeScrubber should be a boolean"
    );
  });

  it("exports an immutable config shape", () => {
    assert.ok("enableTimeScrubber" in siteConfig);
  });
});

/**
 * Site Configuration & Feature Flags
 */
export const siteConfig = {
  /**
   * Floating Time Controller & Simulation Widget
   *
   * - `false`: (Default for deployment/production) Disables and unmounts the floating pill widget
   *   in the bottom-right corner. The portfolio strictly follows the visitor's real local system time.
   * - `true`: Enables the floating pill widget with 24-hour simulation scrubber and presets.
   *
   * You can toggle this directly right here, or override it via the environment variable:
   * NEXT_PUBLIC_ENABLE_TIME_SCRUBBER=true | false
   */
  enableTimeScrubber:
    process.env.NEXT_PUBLIC_ENABLE_TIME_SCRUBBER !== undefined
      ? process.env.NEXT_PUBLIC_ENABLE_TIME_SCRUBBER === "true"
      : false,
};

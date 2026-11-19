"use client";

import SkyBirds from "./SkyBirds";
import RiverWater from "./RiverWater";
import Wildlife from "./Wildlife";

interface LivingLandscapeProps {
  /**
   * "behind": Elements rendered behind text and cards (distant flock of birds, flowing river, walking deer)
   * "front": Elements rendered above text and cards (soaring raptor hawk in foreground)
   */
  layer: "behind" | "front";
}

export default function LivingLandscape({ layer }: LivingLandscapeProps) {
  if (layer === "front") {
    return <SkyBirds layer="front" />;
  }

  return (
    <>
      {/* Distant flock flying across mountain peaks (behind text/cards) */}
      <SkyBirds layer="behind" />

      {/* Wild stag walking calmly along the river meadow */}
      <Wildlife />

      {/* Crystal river water currents, specular sunlight sparkles & morning mist */}
      <RiverWater />
    </>
  );
}

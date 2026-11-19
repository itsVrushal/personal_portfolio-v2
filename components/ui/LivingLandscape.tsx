"use client";

import SkyBirds from "./SkyBirds";
import RiverWater from "./RiverWater";
import Wildlife from "./Wildlife";
import Fireflies from "./Fireflies";
import { useTimeOfDay } from "@/lib/useTimeOfDay";

interface LivingLandscapeProps {
  /**
   * "behind": Elements rendered behind text and cards (distant flock of birds, flowing river, walking deer)
   * "front": Elements rendered above text and cards (soaring raptor hawk in foreground)
   */
  layer: "behind" | "front";
}

export default function LivingLandscape({ layer }: LivingLandscapeProps) {
  const { isNight } = useTimeOfDay();

  if (layer === "front") {
    // Only render foreground raptors during daylight/twilight; roost at night, replaced by drifting foreground fireflies
    if (isNight) {
      return <Fireflies layer="front" />;
    }
    return <SkyBirds layer="front" />;
  }

  return (
    <>
      {/* During day: distant flock across peaks. At night: birds roost, replaced by glowing fireflies! */}
      {!isNight && <SkyBirds layer="behind" />}

      {/* Bioluminescent fireflies dancing across the meadow & riverbank at night */}
      {isNight && <Fireflies layer="behind" />}

      {/* Wild stag walking calmly along the river meadow */}
      <Wildlife />

      {/* Crystal river water currents, specular sparkles & morning mist */}
      <RiverWater />
    </>
  );
}

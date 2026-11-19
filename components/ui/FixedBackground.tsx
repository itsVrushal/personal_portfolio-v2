"use client";

import { useState } from "react";
import Image from "next/image";

// Curated high-resolution nature / landscape wallpaper from Unsplash.
// Yosemite Valley: majestic granite peaks, pine forest, crystal water reflection & atmospheric sky.
// Alternative landscape presets:
// - Moody misty mountain forest: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2880&q=85"
// - Golden hour alpine peaks: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2880&q=85"
// - Mystical pine woods: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2880&q=85"
const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2880&q=85";

export default function FixedBackground() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none"
      style={{
        zIndex: 0,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
      }}
      aria-hidden="true"
    >
      {/* Fixed landscape wallpaper: stays completely static in place while tiles and cards scroll */}
      <div
        className={`w-full h-full relative transition-opacity duration-1000 ease-out ${
          loaded ? "opacity-85" : "opacity-0"
        }`}
        style={{
          filter: "contrast(1.06) saturate(1.12) brightness(0.98)",
          willChange: "opacity",
        }}
      >
        <Image
          src={BACKGROUND_IMAGE_URL}
          alt=""
          role="presentation"
          fill
          priority
          sizes="100vw"
          unoptimized
          onLoad={() => setLoaded(true)}
          className="object-cover object-center"
        />
      </div>

      {/* Balanced atmospheric veil: landscape wallpaper remains rich and scenic while text is punchy and readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(247, 244, 237, 0.32) 0%, rgba(247, 244, 237, 0.44) 45%, rgba(247, 244, 237, 0.54) 100%)",
        }}
      />
    </div>
  );
}

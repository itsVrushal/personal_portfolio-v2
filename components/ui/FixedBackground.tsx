"use client";

import { useState } from "react";
import Image from "next/image";
import { useTimeOfDay } from "@/lib/useTimeOfDay";

const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2880&q=85";

export default function FixedBackground() {
  const [loaded, setLoaded] = useState(false);
  const { themeTint } = useTimeOfDay();

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
      {/* Base landscape wallpaper: stays completely static while tiles and cards scroll */}
      <div
        className={`w-full h-full relative transition-opacity duration-1000 ease-out ${
          loaded ? "opacity-90" : "opacity-0"
        }`}
        style={{
          filter: themeTint.mountainFilter,
          transition: "filter 1.2s ease-out, opacity 1s ease-out",
          willChange: "filter, opacity",
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
    </div>
  );
}

import BackgroundParticles from "@/components/ui/BackgroundParticles";
import CelestialBodies from "@/components/ui/CelestialBodies";
import CircularBird from "@/components/ui/CircularBird";
import FixedBackground from "@/components/ui/FixedBackground";
import LivingLandscape from "@/components/ui/LivingLandscape";
import SmoothScroll from "@/components/ui/SmoothScroll";
import TimeScrubber from "@/components/ui/TimeScrubber";
import Navbar from "@/components/nav/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import StackSection from "@/components/stack/StackSection";
import AchievementsSection from "@/components/achievements/AchievementsSection";
import ContactSection from "@/components/contact/ContactSection";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { TimeProvider } from "@/lib/useTimeOfDay";

export default function Home() {
  return (
    <TimeProvider>
      {/* Cinematic loader — unmounts after 1.8s */}
      <LoadingScreen />

      {/* Buttery smooth inertia mouse-wheel scrolling */}
      <SmoothScroll />

      {/* Fixed background image: base wallpaper */}
      <FixedBackground />

      {/* Celestial Bodies: Sun and Moon rising behind eastern mountain & setting in west */}
      <CelestialBodies />

      {/* Living landscape: Background layer (birds during day, fireflies at night, river, stag) */}
      <LivingLandscape layer="behind" />

      {/* Ambient Three.js particle background */}
      <BackgroundParticles />

      {/* Nav is OUTSIDE main so position:fixed is never broken by transforms */}
      <Navbar />

      <main
        className="flex min-h-screen flex-col text-text-lo font-sans selection:bg-accent/30 selection:text-text-hi"
        style={{ position: "relative", zIndex: 1, perspective: "1400px" }}
      >
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <StackSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      {/* Living landscape: Foreground layer (soaring hawk flying above text & cards during daylight) */}
      <LivingLandscape layer="front" />

      {/* Dynamic 3D circular flight bird: arrives randomly during day, loops behind elements, swoops forward, then exits */}
      <CircularBird />

      {/* Interactive Celestial Time Controller & Simulation Scrubber (Live System Time + Dawn/Noon/Sunset/Night presets + 24h scrubber) */}
      <TimeScrubber />
    </TimeProvider>
  );
}

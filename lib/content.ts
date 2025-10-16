// lib/content.ts
import type { HeroSlide } from "./types";
import heroData from "../content/hero.json"; // ← relative path (works out of the box)

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return heroData as HeroSlide[];
}

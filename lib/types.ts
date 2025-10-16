export type HeroSlide = {
  id: string;
  image: string;                 // "/img/..." or a full https URL (Firebase Storage later)
  headline: string;
  subhead?: string;
  cta?: { label: string; href: string };
};

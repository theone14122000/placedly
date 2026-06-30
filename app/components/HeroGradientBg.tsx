/** Liftoff-style hero gradient — full asset, no CSS crop (1400×513) */
export const HERO_LIFTOFF_GRADIENT_SRC = '/images/hero-liftoff-bg.avif';

export default function HeroGradientBg() {
  return (
    <img
      src={HERO_LIFTOFF_GRADIENT_SRC}
      alt=""
      className="placedly-lift-hero-gradient"
      width={1400}
      height={513}
      decoding="async"
      aria-hidden
    />
  );
}

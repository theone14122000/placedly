/** Liftoff-style hero gradient — full asset, no CSS crop */
export const HERO_LIFTOFF_GRADIENT_SRC = '/images/hero-liftoff-bg3.png';

export default function HeroGradientBg({ src = HERO_LIFTOFF_GRADIENT_SRC }: { src?: string }) {
  return (
    <img
      src={src}
      alt=""
      className="placedly-lift-hero-gradient"
      width={1400}
      height={513}
      decoding="async"
      aria-hidden
    />
  );
}

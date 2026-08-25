import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "./Button";
import {
  CTA_NEWSLETTER_SHORT,
  EMAIL_CAPTURE_HEADLINE,
} from "../lib/site-cta";
import { getBrandName } from "../lib/site-content";

/** Full-bleed Georgetown residential street — Unsplash (allowed in next.config). */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80";

/**
 * First-viewport brand plane: mark, one headline, one supporting line, CTA pair.
 * No cards, stats, or secondary marketing in the hero.
 */
export default function HomeHero() {
  const brand = getBrandName();

  return (
    <section
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden"
      aria-labelledby="home-hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Single-family homes along a tree-lined street in Central Texas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center motion-safe:animate-hero-ken"
        />
      </div>
      <div className="hero-overlay-scrim absolute inset-0" aria-hidden />
      <div className="relative z-[2] mx-auto flex min-h-[min(78vh,40rem)] max-w-5xl flex-col justify-end px-4 pb-14 pt-24 md:min-h-[min(72vh,36rem)] md:pb-16 md:pt-28">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-surface/90 motion-safe:animate-rise-in">
          {brand}
        </p>
        <h1
          id="home-hero-heading"
          className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-surface md:text-5xl lg:text-[3.25rem] motion-safe:animate-rise-in motion-safe:[animation-delay:80ms]"
        >
          Find trusted home pros in Georgetown, TX
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-surface/90 md:text-lg motion-safe:animate-rise-in motion-safe:[animation-delay:140ms]">
          Real Google ratings, primary-source license checks where Texas requires them, and honest local cost
          guides—direct contact first, no sold rankings.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3 motion-safe:animate-rise-in motion-safe:[animation-delay:200ms]">
          <ButtonLink href="#providers" className="text-sm shadow-none">
            Browse Local Providers
          </ButtonLink>
          <Link
            href="#email-capture-home"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-surface/40 bg-surface/10 px-5 text-sm font-semibold text-surface backdrop-blur-sm transition hover:bg-surface/20"
          >
            {CTA_NEWSLETTER_SHORT}
          </Link>
        </div>
        <p className="sr-only">{EMAIL_CAPTURE_HEADLINE}</p>
      </div>
    </section>
  );
}

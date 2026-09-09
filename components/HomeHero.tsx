import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "./Button";
import {
  CTA_NEWSLETTER_SHORT,
  EMAIL_CAPTURE_HEADLINE,
} from "../lib/site-cta";
import { getBrandName } from "../lib/site-content";

/** Full-bleed Central Texas residential street — Unsplash (allowed in next.config). */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=2400&q=80";

/**
 * First-viewport brand plane: mark, one headline, one supporting line, CTA pair.
 * Photo stays full-bleed; copy sits on a brand wash so light type never fights the facade.
 */
export default function HomeHero() {
  const brand = getBrandName();

  return (
    <section
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden"
      aria-labelledby="home-hero-heading"
    >
      <div className="absolute inset-0 bg-brand">
        <Image
          src={HERO_IMAGE}
          alt="Tree-lined residential street with single-family homes in Central Texas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] motion-safe:animate-hero-ken"
        />
      </div>
      {/* Soft fade from photo into solid brand under the copy (not a card). */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(30,58,95,0.22) 0%, rgba(30,58,95,0.55) 16%, rgba(30,58,95,0.92) 28%, #1e3a5f 36%, #1e3a5f 100%)",
        }}
      />
      <div className="relative z-[2] mx-auto flex min-h-[min(78vh,40rem)] max-w-5xl flex-col justify-end px-4 pb-14 pt-24 md:min-h-[min(72vh,36rem)] md:pb-16 md:pt-28">
        <p className="hero-copy-muted font-display text-sm font-semibold uppercase tracking-[0.18em] motion-safe:animate-rise-in">
          {brand}
        </p>
        <h1
          id="home-hero-heading"
          className="hero-copy mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-[3.25rem] motion-safe:animate-rise-in motion-safe:[animation-delay:80ms]"
        >
          Find trusted home pros in Georgetown, TX
        </h1>
        <p className="hero-copy-muted mt-4 max-w-xl text-base leading-relaxed md:text-lg motion-safe:animate-rise-in motion-safe:[animation-delay:140ms]">
          Real Google ratings, primary-source license checks where Texas requires them, and honest local cost
          guides—direct contact first, no sold rankings.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3 motion-safe:animate-rise-in motion-safe:[animation-delay:200ms]">
          <ButtonLink href="#providers" className="text-sm shadow-none">
            Browse Local Providers
          </ButtonLink>
          <Link
            href="#email-capture-home"
            className="hero-cta-secondary inline-flex min-h-11 items-center justify-center rounded-lg border px-5 text-sm font-semibold backdrop-blur-sm transition"
          >
            {CTA_NEWSLETTER_SHORT}
          </Link>
        </div>
        <p className="sr-only">{EMAIL_CAPTURE_HEADLINE}</p>
      </div>
    </section>
  );
}

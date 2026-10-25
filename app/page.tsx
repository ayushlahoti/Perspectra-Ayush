"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Icon } from "@/components/Icon";

const INTRO_DURATION_MS = 2000;
const EXIT_TRANSITION_MS = 780;

function breakingLine(text: string, line: number) {
  return Array.from(text).map((character, index) => {
    const x = ((index * 37 + line * 19) % 121) - 60;
    const y = ((index * 23 + line * 31) % 91) - 45;
    const turn = ((index * 17 + line * 13) % 73) - 36;
    const delay = ((index * 11 + line * 7) % 7) * 12;
    const style = {
      "--sx-letter-x": `${x}px`,
      "--sx-letter-y": `${y}px`,
      "--sx-letter-turn": `${turn}deg`,
      "--sx-letter-delay": `${delay}ms`,
    } as CSSProperties;

    return <span className="sx-splash-letter" key={`${line}-${index}`} style={style}>{character === " " ? "\u00a0" : character}</span>;
  });
}

export default function IntroPage() {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIsExiting(true), INTRO_DURATION_MS - EXIT_TRANSITION_MS);
    const redirectTimer = window.setTimeout(() => window.location.replace("/home"), INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(redirectTimer);
    };
  }, []);

  function enterPerspectra() {
    setIsExiting(true);
    window.setTimeout(() => window.location.replace("/home"), EXIT_TRANSITION_MS);
  }

  return (
    <main className={`sx-splash${isExiting ? " is-exiting" : ""}`} aria-label="Perspectra intro">
      <div className="sx-splash-orbit sx-splash-orbit-one" aria-hidden="true" />
      <div className="sx-splash-orbit sx-splash-orbit-two" aria-hidden="true" />
      <div className="sx-splash-glow" aria-hidden="true" />

      <section className="sx-splash-content" aria-live="polite">
        <div className="sx-splash-brand">
          <span className="sx-splash-mark"><Icon name="icon-logo-search" size={23} /></span>
          <span>Perspectra</span>
        </div>

        <p className="sx-splash-kicker">THINK CLEARLY · SEE THE WHOLE PICTURE</p>
        <h1 className="sx-splash-title" aria-label="Before you believe it, take a closer look.">
          <span className="sx-splash-line" aria-hidden="true">{breakingLine("Before you believe it,", 0)}</span>
          <span className="sx-splash-line" aria-hidden="true">{breakingLine("take a closer look.", 1)}</span>
        </h1>
        <p className="sx-splash-caption">A calmer way to examine what you read.</p>

        <div className="sx-splash-loader" role="progressbar" aria-label="Opening Perspectra" aria-valuemin={0} aria-valuemax={100}>
          <span />
        </div>
        <p className="sx-splash-status">Preparing your reading space</p>
      </section>

      <button className="sx-splash-skip" type="button" onClick={enterPerspectra}>
        Enter Perspectra <Icon name="icon-arrow-right" size={14} />
      </button>
    </main>
  );
}
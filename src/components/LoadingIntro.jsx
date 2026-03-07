import React, { useEffect } from 'react';

/**
 * LoadingIntro — Cinematic cricket intro.
 *
 * Animation timeline (pure CSS, no state machine):
 *   0.00s  Ball enters from far left, spinning (ease-out deceleration)
 *   1.00s  Ball arrives at screen center
 *   0.50s  Bat begins entering from upper-right
 *   1.00s  Bat blade reaches ball position (impact!)
 *   0.96s  Impact ring + glow burst
 *   1.00s  Screen flash
 *   1.00s  Ball starts flying toward viewer (scale up)
 *   1.90s  CRICENTRIX tagline fades in
 *   2.55s  Overlay begins fading out
 *   3.20s  onComplete() fires → component unmounts
 *
 * Bat blade collision math:
 *   Bat SVG: 56w × 260h. Blade center at SVG (28, 170) = (+0, +40) from element center.
 *   At rotate(-30deg): blade offset = (+20px, +34.6px) from element center.
 *   For blade at screen center (0,0): element at translateX(-20px) translateY(-35px).
 *   ∴ impact keyframe: translateX(-20px) translateY(-38px) rotate(-30deg) ✓
 */
export function LoadingIntro({ onComplete }) {
    useEffect(() => {
        const t = setTimeout(() => onComplete?.(), 3200);
        return () => clearTimeout(t);
    }, [onComplete]);

    return (
        <div className="ci-overlay">
            {/* Ambient mood light */}
            <div className="ci-ambient" />

            {/* White cricket ball – single element, full sequence */}
            <div className="ci-ball">
                <WhiteCricketBall />
            </div>

            {/* Cricket bat – enters upper-right, swings through ball, exits lower-left */}
            <div className="ci-bat">
                <CricketBat />
            </div>

            {/* Impact effects at t≈1.0s */}
            <div className="ci-impact-ring" />
            <div className="ci-impact-glow" />
            <div className="ci-screen-flash" />

            {/* Tagline at t≈1.9s */}
            <div className="ci-tagline">
                <span className="ci-brand-name">CRICENTRIX</span>
                <span className="ci-brand-sub">Cricket Impact Analytics</span>
            </div>
        </div>
    );
}

/* ─── SVG: White Cricket Ball ────────────────────── */
function WhiteCricketBall() {
    return (
        <svg
            width="108"
            height="108"
            viewBox="0 0 108 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 0 22px rgba(200,200,255,0.45)) drop-shadow(0 4px 14px rgba(0,0,0,0.5))' }}
        >
            <defs>
                {/* Main sphere: off-white highlight → warm cream → light tan shadow */}
                <radialGradient id="wb-base" cx="34%" cy="28%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="35%" stopColor="#f2ede0" />
                    <stop offset="75%" stopColor="#d8cdb0" />
                    <stop offset="100%" stopColor="#b8a880" />
                </radialGradient>
                {/* Specular highlight */}
                <radialGradient id="wb-spec" cx="30%" cy="24%" r="26%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                {/* Soft shadow opposite highlight */}
                <radialGradient id="wb-shadow" cx="72%" cy="76%" r="42%">
                    <stop offset="0%" stopColor="rgba(90,70,40,0.38)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <clipPath id="wb-clip">
                    <circle cx="54" cy="54" r="50" />
                </clipPath>
            </defs>

            {/* Base sphere */}
            <circle cx="54" cy="54" r="50" fill="url(#wb-base)" />
            <circle cx="54" cy="54" r="50" fill="url(#wb-spec)" />
            <circle cx="54" cy="54" r="50" fill="url(#wb-shadow)" />

            {/* Seam group clipped to sphere */}
            <g clipPath="url(#wb-clip)">
                {/* Horizontal S-curve seam */}
                <path
                    d="M 6 54 Q 22 28, 54 54 Q 86 80, 102 54"
                    stroke="#c41b1b"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    fill="none"
                />
                {/* Vertical S-curve seam */}
                <path
                    d="M 54 6 Q 80 22, 54 54 Q 28 86, 54 102"
                    stroke="#c41b1b"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    fill="none"
                />

                {/* Stitching marks – horizontal seam */}
                {[
                    [18, 38], [26, 32], [36, 42], [44, 50],
                    [64, 58], [72, 64], [82, 70], [90, 64],
                ].map(([x, y], i) => (
                    <line
                        key={`hs${i}`}
                        x1={x - 2} y1={y - 3}
                        x2={x + 2} y2={y + 3}
                        stroke="#c41b1b"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        transform={`rotate(${i < 4 ? -38 : 38}, ${x}, ${y})`}
                    />
                ))}

                {/* Stitching marks – vertical seam */}
                {[
                    [70, 18], [76, 28], [68, 38], [60, 46],
                    [48, 62], [40, 70], [32, 80], [28, 90],
                ].map(([x, y], i) => (
                    <line
                        key={`vs${i}`}
                        x1={x - 3} y1={y - 2}
                        x2={x + 3} y2={y + 2}
                        stroke="#c41b1b"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        transform={`rotate(${i < 4 ? 52 : -52}, ${x}, ${y})`}
                    />
                ))}
            </g>

            {/* Outer edge darkening ring */}
            <circle cx="54" cy="54" r="49.5" stroke="rgba(60,40,10,0.25)" strokeWidth="1.5" fill="none" />
        </svg>
    );
}

/* ─── SVG: Cricket Bat ───────────────────────────── */
function CricketBat() {
    return (
        <svg
            width="56"
            height="260"
            viewBox="0 0 56 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 0 12px rgba(180,130,40,0.4)) drop-shadow(2px 4px 10px rgba(0,0,0,0.6))' }}
        >
            <defs>
                {/* Willow blade – natural wood, 3D feel */}
                <linearGradient id="cb-blade" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7a5a14" />
                    <stop offset="18%" stopColor="#c49030" />
                    <stop offset="42%" stopColor="#e8b848" />
                    <stop offset="58%" stopColor="#d4a035" />
                    <stop offset="82%" stopColor="#b07a20" />
                    <stop offset="100%" stopColor="#6a4e10" />
                </linearGradient>
                {/* Blade edge bevel */}
                <linearGradient id="cb-edge" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,210,90,0.5)" />
                    <stop offset="100%" stopColor="rgba(255,210,90,0)" />
                </linearGradient>
                {/* Handle grip */}
                <linearGradient id="cb-handle" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1a0e06" />
                    <stop offset="35%" stopColor="#50300f" />
                    <stop offset="65%" stopColor="#3e2408" />
                    <stop offset="100%" stopColor="#1a0e06" />
                </linearGradient>
            </defs>

            {/* ── Blade ── */}
            <path
                d="M 5 80 L 5 228 Q 5 252 28 252 Q 51 252 51 228 L 51 80 Z"
                fill="url(#cb-blade)"
            />
            {/* Blade-to-shoulder taper */}
            <path
                d="M 5 80 Q 5 60 12 54 L 44 54 Q 51 60 51 80 Z"
                fill="url(#cb-blade)"
            />
            {/* Left-edge highlight bevel */}
            <path
                d="M 5 80 L 5 228 Q 5 252 28 252 Q 18 250 12 238 L 10 80 Q 8 68 5 80 Z"
                fill="url(#cb-edge)"
            />
            {/* Wood grain lines */}
            {[0.28, 0.50, 0.72].map((t, i) => (
                <line
                    key={`g${i}`}
                    x1={5 + t * 46} y1="58" x2={5 + t * 46} y2="244"
                    stroke="rgba(0,0,0,0.1)" strokeWidth="1"
                />
            ))}
            {/* Sweet-spot label line */}
            <rect x="10" y="150" width="36" height="1.5" rx="0.75"
                fill="rgba(255,255,255,0.08)" />

            {/* ── Handle ── */}
            <rect x="16" y="6" width="24" height="51" rx="5" fill="url(#cb-handle)" />
            {/* Grip tape bands */}
            {[14, 22, 30, 38, 46].map((y, i) => (
                <rect key={`gr${i}`} x="16" y={y} width="24" height="2.5" rx="1.2"
                    fill="rgba(255,255,255,0.1)" />
            ))}
            {/* Grip tape diagonal texture */}
            {[10, 18, 26, 34, 42, 50].map((y, i) => (
                <line key={`gd${i}`}
                    x1="16" y1={y} x2="40" y2={y + 5}
                    stroke="rgba(0,0,0,0.18)" strokeWidth="0.8"
                />
            ))}

            {/* ── Knob ── */}
            <ellipse cx="28" cy="7" rx="14" ry="6" fill="#0e0804" />
            <ellipse cx="28" cy="6" rx="10" ry="3.5" fill="rgba(80,50,15,0.6)" />
        </svg>
    );
}

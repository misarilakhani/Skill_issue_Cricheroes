import React from 'react';

/**
 * CricentrixLogo — no hex, pure analytics bar mark
 * 3 rising bars (indigo → cyan) + glowing dot on the tallest.
 */
export function CricentrixLogo({ size = 36, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Cricentrix"
        >
            <defs>
                <linearGradient id="cb1" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#4338ca" />
                    <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
                <linearGradient id="cb2" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="cb3" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#0891b2" />
                    <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>

                {/* Bar glow */}
                <filter id="cbGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="1.2" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>

                {/* Dot glow */}
                <filter id="cdGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="2.2" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>

            {/* ── Baseline ── */}
            <line x1="4" y1="32" x2="32" y2="32"
                stroke="#4F46E5" strokeWidth="1.5"
                strokeLinecap="round" opacity="0.6" />

            {/* ── Bar 1 — short, left ── */}
            <rect x="4" y="23" width="7" height="9" rx="2" fill="url(#cb1)" filter="url(#cbGlow)" />

            {/* ── Bar 2 — medium, centre ── */}
            <rect x="14.5" y="16" width="7" height="16" rx="2" fill="url(#cb2)" filter="url(#cbGlow)" />

            {/* ── Bar 3 — tallest, right ── */}
            <rect x="25" y="8" width="7" height="24" rx="2" fill="url(#cb3)" filter="url(#cbGlow)" />

            {/* ── Dot on tallest bar ── */}
            <circle cx="28.5" cy="6.5" r="5" fill="#06B6D4" opacity="0.22" filter="url(#cdGlow)" />
            <circle cx="28.5" cy="6.5" r="3.2" fill="#22d3ee" filter="url(#cdGlow)" />
            <circle cx="28.5" cy="6.5" r="1.5" fill="white" />
        </svg>
    );
}

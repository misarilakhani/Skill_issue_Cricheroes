import React, { useEffect, useState } from 'react';

/**
 * A beautiful premium circular dial to show the 0-100 Impact Score
 */
export function ImpactMeter({ score, animate = true, colorTheme = 'default' }) {
    const [displayScore, setDisplayScore] = useState(animate ? 0 : score);

    useEffect(() => {
        if (animate) {
            const timer = setTimeout(() => {
                setDisplayScore(score);
            }, 300); // delay start
            return () => clearTimeout(timer);
        }
    }, [score, animate]);

    // Determine color based on score
    const getColor = (s) => {
        if (colorTheme === 'amber') return 'text-amber-400';
        if (colorTheme === 'teal') return 'text-teal-400';
        if (s >= 75) return 'text-teal-400';
        if (s >= 50) return 'text-purple-400';
        if (s >= 40) return 'text-yellow-400';
        return 'text-rose-400';
    };

    const getGradientStroke = (s) => {
        if (colorTheme === 'amber') return 'url(#gradient-amber)';
        if (colorTheme === 'teal') return 'url(#gradient-teal)';
        if (s >= 75) return 'url(#gradient-elite)';
        if (s >= 50) return 'url(#gradient-good)';
        return 'url(#gradient-avg)';
    };

    // SVG calculations for a semicicle dial
    const radius = 90;
    const strokeWidth = 16;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    // We rotate SVG 180deg (starts at 9 o'clock)
    // We want the dash to cover the top half (from 9 o'clock to 3 o'clock)
    // The dash array pattern is: DASH=circumference, GAP=circumference
    const strokeDasharray = `${circumference} ${circumference}`;

    // For background to draw exactly half, we offset by circumference / 2
    // So the dash starts halfway through its C-length dash.
    const backgroundOffset = circumference / 2;

    // For dynamic value, we offset by C - X, where X is the mapped score length
    const dashLength = (displayScore / 100) * (circumference / 2);
    const valueOffset = circumference - dashLength;

    return (
        <div className="relative flex flex-col items-center justify-center pt-4 pb-2">

            {/* SVG Circular Dial */}
            <svg
                height={110}
                width={180}
                className="drop-shadow-2xl overflow-visible"
            >
                <defs>
                    <linearGradient id="gradient-amber" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="gradient-teal" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="#0f766e" />
                    </linearGradient>
                    <linearGradient id="gradient-elite" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="#0f766e" />
                    </linearGradient>
                    <linearGradient id="gradient-good" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                    <linearGradient id="gradient-avg" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fcd34d" />
                        <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <filter id="glowMeter" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Background Arc */}
                <circle
                    stroke="#1e293b" // slate-800
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    style={{ strokeDashoffset: backgroundOffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    transform="rotate(180 90 90)"
                />

                {/* Animated Main Arc */}
                <circle
                    stroke={getGradientStroke(score)}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    style={{
                        strokeDashoffset: valueOffset,
                        transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        filter: 'url(#glowMeter)'
                    }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    transform="rotate(180 90 90)"
                />
            </svg>

            {/* Center Text positioned cleanly inside the arc */}
            <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-[-20%] text-center pointer-events-none flex flex-col items-center">
                <div className={`text-5xl sm:text-6xl font-black ${getColor(score)} transition-colors duration-1000 tracking-tighter drop-shadow-md leading-none`}>
                    {Math.round(displayScore)}
                </div>
                <div className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mt-1 sm:mt-2 opacity-80">
                    Impact
                </div>
            </div>
        </div>
    );
}

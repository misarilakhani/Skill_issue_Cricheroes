import React from 'react';

/**
 * CricketBackground — Global decorative atmospheric layer.
 * Fixed behind all content: pointer-events-none, z-0.
 * All icons: outline SVG style, 5-12% opacity, slow animations.
 */
export function CricketBackground() {
    return (
        <div
            className="fixed inset-0 overflow-hidden select-none"
            style={{ zIndex: 0, pointerEvents: 'none' }}
            aria-hidden="true"
        >
            {/* ── DEEP BASE ─────────────────────────────────── */}
            <div className="absolute inset-0 bg-[#0B0F1A]" />

            {/* ── AMBIENT RADIAL GLOWS ──────────────────────── */}
            <div className="absolute -top-[15%] -left-[5%] w-[50vw] h-[50vh] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.13) 0%, transparent 70%)', animation: 'bg-drift-1 28s ease-in-out infinite' }} />
            <div className="absolute -bottom-[15%] -right-[5%] w-[45vw] h-[45vh] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)', animation: 'bg-drift-2 34s ease-in-out infinite' }} />
            <div className="absolute top-[40%] right-[30%] w-[30vw] h-[30vh] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)', animation: 'bg-drift-3 40s ease-in-out infinite' }} />

            {/* ══════════════════════════════════════════════════
                CRICKET BALLS
            ══════════════════════════════════════════════════ */}

            {/* Ball 1 — large, top-right, indigo */}
            <svg style={{ position: 'absolute', top: '8%', right: '8%', width: 90, height: 90, opacity: 0.09, filter: 'blur(0.5px) drop-shadow(0 0 14px rgba(79,70,229,0.5))', animation: 'float-a 30s ease-in-out infinite' }} viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="42" stroke="#4F46E5" strokeWidth="2" />
                <path d="M50 8 C 30 25, 30 75, 50 92" stroke="#4F46E5" strokeWidth="1.5" fill="none" />
                <path d="M50 8 C 70 25, 70 75, 50 92" stroke="#4F46E5" strokeWidth="1.5" fill="none" />
                <path d="M8 50 C 25 30, 75 30, 92 50" stroke="#4F46E5" strokeWidth="1" strokeDasharray="4 5" fill="none" />
            </svg>

            {/* Ball 2 — small, bottom-left, cyan */}
            <svg style={{ position: 'absolute', bottom: '22%', left: '7%', width: 48, height: 48, opacity: 0.08, filter: 'blur(0.4px) drop-shadow(0 0 10px rgba(6,182,212,0.5))', animation: 'float-b 25s ease-in-out infinite', animationDelay: '8s' }} viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="42" stroke="#06B6D4" strokeWidth="2.5" />
                <path d="M50 8 C 30 25, 30 75, 50 92" stroke="#06B6D4" strokeWidth="2" fill="none" />
                <path d="M50 8 C 70 25, 70 75, 50 92" stroke="#06B6D4" strokeWidth="2" fill="none" />
            </svg>

            {/* Ball 3 — medium, center-left, white */}
            <svg style={{ position: 'absolute', top: '52%', left: '3%', width: 66, height: 66, opacity: 0.06, filter: 'blur(0.5px)', animation: 'float-c 38s ease-in-out infinite', animationDelay: '5s' }} viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="1.8" />
                <path d="M50 8 C 30 25, 30 75, 50 92" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M50 8 C 70 25, 70 75, 50 92" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M8 50 C 25 70, 75 70, 92 50" stroke="white" strokeWidth="1" strokeDasharray="3 4" fill="none" />
            </svg>

            {/* Ball 4 — tiny, top-center */}
            <svg style={{ position: 'absolute', top: '25%', left: '42%', width: 32, height: 32, opacity: 0.07, filter: 'blur(0.3px) drop-shadow(0 0 8px rgba(79,70,229,0.4))', animation: 'float-d 22s ease-in-out infinite', animationDelay: '12s' }} viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="42" stroke="#818cf8" strokeWidth="3" />
                <path d="M50 8 C 30 25, 30 75, 50 92" stroke="#818cf8" strokeWidth="2.5" fill="none" />
                <path d="M50 8 C 70 25, 70 75, 50 92" stroke="#818cf8" strokeWidth="2.5" fill="none" />
            </svg>

            {/* ══════════════════════════════════════════════════
                CRICKET BATS
            ══════════════════════════════════════════════════ */}

            {/* Bat 1 — large, top-right, tilted */}
            <svg style={{ position: 'absolute', top: '5%', right: '22%', width: 60, height: 160, opacity: 0.07, filter: 'drop-shadow(0 0 12px rgba(79,70,229,0.4))', transform: 'rotate(25deg)', animation: 'float-a 36s ease-in-out infinite', animationDelay: '3s' }} viewBox="0 0 60 200" fill="none">
                <rect x="12" y="10" width="36" height="130" rx="14" stroke="#4F46E5" strokeWidth="2" />
                <rect x="22" y="140" width="16" height="45" rx="5" stroke="#4F46E5" strokeWidth="2" />
                <line x1="22" y1="152" x2="38" y2="152" stroke="#4F46E5" strokeWidth="1.5" />
                <line x1="22" y1="162" x2="38" y2="162" stroke="#4F46E5" strokeWidth="1.5" />
            </svg>

            {/* Bat 2 — medium, bottom-right, slight tilt */}
            <svg style={{ position: 'absolute', bottom: '10%', right: '12%', width: 44, height: 120, opacity: 0.08, filter: 'blur(0.3px) drop-shadow(0 0 10px rgba(6,182,212,0.4))', transform: 'rotate(-18deg)', animation: 'float-b 32s ease-in-out infinite', animationDelay: '15s' }} viewBox="0 0 60 200" fill="none">
                <rect x="12" y="10" width="36" height="130" rx="14" stroke="#06B6D4" strokeWidth="2.5" />
                <rect x="22" y="140" width="16" height="45" rx="5" stroke="#06B6D4" strokeWidth="2.5" />
                <line x1="22" y1="155" x2="38" y2="155" stroke="#06B6D4" strokeWidth="1.5" />
            </svg>

            {/* Bat 3 — small, left-center */}
            <svg style={{ position: 'absolute', top: '38%', left: '14%', width: 30, height: 80, opacity: 0.06, filter: 'blur(0.5px)', transform: 'rotate(10deg)', animation: 'float-c 28s ease-in-out infinite', animationDelay: '20s' }} viewBox="0 0 60 200" fill="none">
                <rect x="12" y="10" width="36" height="130" rx="14" stroke="white" strokeWidth="2" />
                <rect x="22" y="140" width="16" height="45" rx="5" stroke="white" strokeWidth="2" />
            </svg>

            {/* ══════════════════════════════════════════════════
                STUMPS — Fixed: 3 evenly-spaced shafts + 2 bails
            ══════════════════════════════════════════════════ */}

            {/* Stumps 1 — large, bottom-left, cyan */}
            <svg style={{ position: 'absolute', bottom: '6%', left: '20%', width: 80, height: 110, opacity: 0.09, filter: 'drop-shadow(0 0 14px rgba(6,182,212,0.5))', animation: 'float-d 35s ease-in-out infinite', animationDelay: '7s' }} viewBox="0 0 90 130" fill="none">
                {/* Shafts */}
                <rect x="12" y="28" width="8" height="92" rx="3" stroke="#06B6D4" strokeWidth="1.8" />
                <rect x="41" y="28" width="8" height="92" rx="3" stroke="#06B6D4" strokeWidth="1.8" />
                <rect x="70" y="28" width="8" height="92" rx="3" stroke="#06B6D4" strokeWidth="1.8" />

                {/* Bails — flat lines between stump tops */}
                <line x1="18" y1="24" x2="43" y2="24" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
                <line x1="47" y1="24" x2="72" y2="24" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* Stumps 2 — small, top-left, indigo */}
            <svg style={{ position: 'absolute', top: '18%', left: '28%', width: 50, height: 70, opacity: 0.07, filter: 'blur(0.3px) drop-shadow(0 0 10px rgba(79,70,229,0.4))', animation: 'float-a 27s ease-in-out infinite', animationDelay: '18s' }} viewBox="0 0 90 130" fill="none">
                {/* Shafts */}
                <rect x="12" y="28" width="8" height="92" rx="3" stroke="#818cf8" strokeWidth="2" />
                <rect x="41" y="28" width="8" height="92" rx="3" stroke="#818cf8" strokeWidth="2" />
                <rect x="70" y="28" width="8" height="92" rx="3" stroke="#818cf8" strokeWidth="2" />

                {/* Bails — flat lines */}
                <line x1="18" y1="24" x2="43" y2="24" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
                <line x1="47" y1="24" x2="72" y2="24" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* ══════════════════════════════════════════════════
                PITCH / FIELD MARKINGS
            ══════════════════════════════════════════════════ */}

            {/* Full field circle — large, center */}
            <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70vw', maxWidth: 700, height: '60vh', maxHeight: 560, opacity: 0.04, animation: 'float-field 50s ease-in-out infinite' }} viewBox="0 0 700 560" fill="none">
                <ellipse cx="350" cy="280" rx="330" ry="250" stroke="white" strokeWidth="1" strokeDasharray="6 8" />
                <ellipse cx="350" cy="280" rx="200" ry="150" stroke="white" strokeWidth="0.8" strokeDasharray="4 6" />
                <circle cx="350" cy="280" r="40" stroke="white" strokeWidth="0.8" />
                <line x1="350" y1="30" x2="350" y2="530" stroke="white" strokeWidth="0.7" strokeDasharray="5 7" />
            </svg>

            {/* Pitch rectangle — bottom-right */}
            <svg style={{ position: 'absolute', bottom: '18%', right: '20%', width: 120, height: 200, opacity: 0.05, filter: 'blur(0.3px)', animation: 'float-b 42s ease-in-out infinite', animationDelay: '10s' }} viewBox="0 0 120 220" fill="none">
                <rect x="10" y="10" width="100" height="200" rx="4" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="6 6" />
                <line x1="10" y1="60" x2="110" y2="60" stroke="#06B6D4" strokeWidth="1" />
                <line x1="10" y1="160" x2="110" y2="160" stroke="#06B6D4" strokeWidth="1" />
                <line x1="60" y1="10" x2="60" y2="210" stroke="#06B6D4" strokeWidth="0.8" strokeDasharray="4 6" />
            </svg>

            {/* ══════════════════════════════════════════════════
                ANALYTICS / GRAPH ELEMENTS
            ══════════════════════════════════════════════════ */}

            {/* Floating bar chart — top-left */}
            <svg style={{ position: 'absolute', top: '12%', left: '5%', width: 100, height: 70, opacity: 0.08, filter: 'drop-shadow(0 0 8px rgba(79,70,229,0.4))', animation: 'float-c 32s ease-in-out infinite', animationDelay: '4s' }} viewBox="0 0 100 70" fill="none">
                <line x1="5" y1="5" x2="5" y2="60" stroke="#818cf8" strokeWidth="1.5" />
                <line x1="5" y1="60" x2="95" y2="60" stroke="#818cf8" strokeWidth="1.5" />
                {[15, 25, 35, 45, 55, 65, 75, 85].map((x, i) => {
                    const heights = [40, 25, 50, 20, 45, 30, 55, 35];
                    return <rect key={x} x={x - 4} y={60 - heights[i]} width="8" height={heights[i]} rx="2" stroke="#818cf8" strokeWidth="1" fill="rgba(79,70,229,0.15)" />;
                })}
            </svg>

            {/* Floating line graph — bottom-center */}
            <svg style={{ position: 'absolute', bottom: '15%', left: '35%', width: 180, height: 80, opacity: 0.07, filter: 'drop-shadow(0 0 10px rgba(6,182,212,0.4))', animation: 'float-a 38s ease-in-out infinite', animationDelay: '22s' }} viewBox="0 0 180 80" fill="none">
                <polyline points="0,65 25,50 50,55 75,30 100,40 125,15 150,25 175,10" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                {[0, 25, 50, 75, 100, 125, 150, 175].map((x, i) => {
                    const ys = [65, 50, 55, 30, 40, 15, 25, 10];
                    return <circle key={x} cx={x} cy={ys[i]} r="3" stroke="#06B6D4" strokeWidth="1.5" fill="#0B0F1A" />;
                })}
            </svg>

            {/* Radar pentagon — right side */}
            <svg style={{ position: 'absolute', top: '60%', right: '5%', width: 90, height: 90, opacity: 0.07, filter: 'drop-shadow(0 0 10px rgba(79,70,229,0.4))', animation: 'float-radar 40s ease-in-out infinite', animationDelay: '5s' }} viewBox="0 0 100 100" fill="none">
                <polygon points="50,5 95,35 80,82 20,82 5,35" stroke="#818cf8" strokeWidth="1.5" fill="rgba(79,70,229,0.05)" />
                <polygon points="50,20 78,38 68,68 32,68 22,38" stroke="#818cf8" strokeWidth="1" strokeDasharray="3 4" fill="none" />
                <circle cx="50" cy="50" r="4" stroke="#818cf8" strokeWidth="1.5" fill="rgba(79,70,229,0.3)" />
            </svg>

            {/* Spinning analytics rings — left-bottom */}
            <svg style={{ position: 'absolute', bottom: '30%', left: '2%', width: 70, height: 70, opacity: 0.06, animation: 'float-ring 38s ease-in-out infinite', animationDelay: '8s' }} viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="44" stroke="#4F46E5" strokeWidth="1.5" strokeDasharray="8 4" />
                <circle cx="50" cy="50" r="30" stroke="#06B6D4" strokeWidth="1" strokeDasharray="4 6" />
                <circle cx="50" cy="50" r="16" stroke="#818cf8" strokeWidth="1" />
            </svg>

            {/* ── KEYFRAME STYLES ───────────────────────────── */}
            <style>{`
                @keyframes float-a {
                    0%,100% { transform: translateY(0px) rotate(0deg); }
                    30%     { transform: translateY(-18px) rotate(2deg); }
                    70%     { transform: translateY(-8px) rotate(-1.5deg); }
                }
                @keyframes float-b {
                    0%,100% { transform: translateY(0px) rotate(0deg); }
                    40%     { transform: translateY(-14px) rotate(-2deg); }
                    75%     { transform: translateY(-22px) rotate(1deg); }
                }
                @keyframes float-c {
                    0%,100% { transform: translateY(0px); }
                    50%     { transform: translateY(-20px); }
                }
                @keyframes float-d {
                    0%,100% { transform: translateY(0px) rotate(0deg); }
                    25%     { transform: translateY(-10px) rotate(3deg); }
                    75%     { transform: translateY(-18px) rotate(-2deg); }
                }
                @keyframes float-field {
                    0%,100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
                    33%     { transform: translate(-50%, -50%) translateY(-14px) rotate(2deg); }
                    66%     { transform: translate(-50%, -50%) translateY(-8px) rotate(-1deg); }
                }
                @keyframes float-radar {
                    0%,100% { transform: translateY(0px) rotate(0deg); }
                    30%     { transform: translateY(-16px) rotate(180deg); }
                    60%     { transform: translateY(-24px) rotate(270deg); }
                }
                @keyframes float-ring {
                    0%,100% { transform: translateY(0px) rotate(0deg); }
                    40%     { transform: translateY(-20px) rotate(180deg); }
                    80%     { transform: translateY(-10px) rotate(330deg); }
                }
                @keyframes bg-drift-1 {
                    0%,100% { transform: translate(0,0); }
                    50%     { transform: translate(3vw, -3vh); }
                }
                @keyframes bg-drift-2 {
                    0%,100% { transform: translate(0,0); }
                    50%     { transform: translate(-3vw, 3vh); }
                }
                @keyframes bg-drift-3 {
                    0%,100% { transform: translate(0,0); }
                    33%     { transform: translate(2vw, 2vh); }
                    66%     { transform: translate(-2vw, -2vh); }
                }
            `}</style>
        </div>
    );
}

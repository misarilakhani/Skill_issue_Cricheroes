import React, { useState, useRef } from 'react';
import { HistoryModal } from './HistoryModal';

export function Hero({ setCurrentRoute }) {
    const [showHistory, setShowHistory] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

    return (
        <>
            {showHistory && <HistoryModal onClose={() => setShowHistory(false)} />}
            <div
                ref={heroRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Extra page-level glows on top of global background */}
                <div className="absolute top-0 right-1/4 w-[36rem] h-[36rem] rounded-full pointer-events-none -z-0"
                    style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 65%)' }} />
                <div className="absolute bottom-0 left-1/4 w-[28rem] h-[28rem] rounded-full pointer-events-none -z-0"
                    style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 65%)' }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                        {/* ── LEFT: Typography & CTAs ──────────────────── */}
                        <div className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0">

                            {/* Eyebrow badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-bold tracking-widest uppercase"
                                style={{
                                    background: 'rgba(79,70,229,0.12)',
                                    border: '1px solid rgba(79,70,229,0.3)',
                                    color: '#818cf8'
                                }}>
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                Cricket Analytics Platform
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
                                Cricket's{' '}
                                <br className="hidden sm:block" />
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{
                                        backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #06B6D4 100%)',
                                        filter: 'drop-shadow(0 0 18px rgba(6,182,212,0.4))',
                                    }}
                                >
                                    True Impact
                                </span>
                                <br className="hidden sm:block" />{' '}
                                Revealed.
                            </h1>

                            <p className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                                Move beyond traditional averages. Our advanced algorithm isolates a player's genuine match-winning contribution under real pressure scenarios.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                {/* Primary CTA */}
                                <button
                                    onClick={() => setCurrentRoute('calculator')}
                                    className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                                    style={{
                                        background: '#4F46E5',
                                        boxShadow: '0 0 28px rgba(79,70,229,0.45), 0 4px 14px rgba(0,0,0,0.4)'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(79,70,229,0.65), 0 4px 20px rgba(0,0,0,0.5)'}
                                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 28px rgba(79,70,229,0.45), 0 4px 14px rgba(0,0,0,0.4)'}
                                >
                                    Calculate Impact
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {/* Ghost secondary */}
                                <button
                                    onClick={() => setShowHistory(true)}
                                    className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-slate-300 transition-all duration-300 hover:text-white hover:bg-white/5 flex items-center justify-center"
                                    style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                                >
                                    View Previous Scores
                                </button>
                            </div>


                        </div>

                        {/* ── RIGHT: Score Orb Visual ───────────────────── */}
                        <div className="lg:col-span-6 relative flex justify-center items-center">
                            <div className="relative w-80 h-80 sm:w-[400px] sm:h-[400px] flex items-center justify-center">

                                {/* Glow beneath orb */}
                                <div
                                    className="absolute inset-0 rounded-full blur-[80px] -z-10"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(79,70,229,0.3) 0%, rgba(6,182,212,0.15) 60%, transparent 100%)',
                                        transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)`,
                                        transition: 'transform 0.3s ease-out'
                                    }}
                                />

                                {/* Main orb ring */}
                                <div
                                    className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden"
                                    style={{
                                        background: 'rgba(17,24,39,0.6)',
                                        backdropFilter: 'blur(32px)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
                                        transform: `perspective(1000px) rotateX(${mousePos.y * -12}deg) rotateY(${mousePos.x * 12}deg)`,
                                        transition: 'transform 0.25s ease-out'
                                    }}
                                >
                                    {/* Inner dot grid */}
                                    <div className="absolute inset-0 opacity-15 pointer-events-none"
                                        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

                                    {/* Spinning arc rings */}
                                    <svg className="absolute w-[90%] h-[90%] animate-spin-slow" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                                        <circle cx="50" cy="50" r="48" fill="none" stroke="url(#hero-arc)" strokeWidth="1.5" strokeDasharray="80 220" strokeLinecap="round" />
                                        <defs>
                                            <linearGradient id="hero-arc" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#06B6D4" />
                                                <stop offset="100%" stopColor="#4F46E5" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <svg className="absolute w-[72%] h-[72%] animate-spin-slow-rev" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" strokeDasharray="4 8" />
                                    </svg>

                                    {/* Center score */}
                                    <div
                                        className="relative z-10 flex flex-col items-center"
                                        style={{
                                            transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
                                            transition: 'transform 0.25s ease-out'
                                        }}
                                    >
                                        <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-secondary mb-1 opacity-80">Cricentrix</div>
                                        <div className="text-8xl font-black text-white tracking-tighter leading-none"
                                            style={{ textShadow: '0 0 40px rgba(79,70,229,0.6)' }}>
                                            87<span className="text-4xl text-slate-400 font-medium">.4</span>
                                        </div>

                                        {/* Sparkline bars */}
                                        <div className="w-36 h-10 mt-5 flex items-end justify-between gap-1 px-1">
                                            {[40, 65, 45, 80, 55, 90, 75, 100].map((h, i) => (
                                                <div
                                                    key={i}
                                                    className="flex-1 rounded-t-sm transition-all duration-300 hover:opacity-100"
                                                    style={{
                                                        height: `${h}%`,
                                                        background: `rgba(79,70,229,${0.3 + h / 250})`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-2 font-semibold">Impact Score</div>
                                    </div>
                                </div>

                                {/* Floating data chip — left */}
                                <div
                                    className="absolute top-[5%] -left-[18%] sm:-left-[22%] z-20 px-4 py-3 rounded-2xl animate-float"
                                    style={{
                                        background: 'rgba(17,24,39,0.85)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(16px)',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                                        animationDelay: '0s',
                                        transform: `translate(${mousePos.x * -22}px, ${mousePos.y * -22}px)`,
                                    }}
                                >
                                    <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Contextual Boost</div>
                                    <div className="text-sm font-black text-white">+24.5%</div>
                                </div>

                                {/* Floating data chip — right */}
                                <div
                                    className="absolute bottom-[12%] -right-[8%] sm:-right-[14%] z-20 px-4 py-3 rounded-2xl animate-float"
                                    style={{
                                        background: 'rgba(17,24,39,0.85)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(16px)',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                                        animationDelay: '2s',
                                        transform: `translate(${mousePos.x * -14}px, ${mousePos.y * -14}px)`,
                                    }}
                                >
                                    <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Match Pressure</div>
                                    <div className="text-sm font-black text-cyan-400 flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        High Variance
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

import React, { useState, useEffect, useRef } from 'react';
import { HistoryModal } from './HistoryModal';

export function Hero({ setCurrentRoute }) {
    const [showHistory, setShowHistory] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);

    // Track mouse movement over the hero section
    const handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        // Calculate mouse position relative to center of the section (-1 to 1)
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        // Smoothly return to center
        setMousePos({ x: 0, y: 0 });
    };

    return (
        <>
            {showHistory && <HistoryModal onClose={() => setShowHistory(false)} />}
            <div
                ref={heroRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center justify-center group/hero"
            >
                {/* Minimal Background Elements */}
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <div className="w-full h-full border-x border-white flex justify-center max-w-7xl">
                        <div className="w-[33%] h-full border-x border-white"></div>
                    </div>
                </div>

                <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-accent-primary/10 rounded-full blur-[120px] -z-10"></div>
                <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-accent-secondary/10 rounded-full blur-[100px] -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                        {/* Text Content */}
                        <div className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0">
                            {/* Badge Intentionally Removed */}
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight mb-6 leading-[1.1]">
                                Cricket's <br className="hidden sm:block" />
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">True Impact</span>
                                <br className="hidden sm:block" /> Revealed.
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                                Move beyond traditional averages and strike rates. Our advanced metric isolates a player's genuine match-winning contribution under pressure.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                                <button
                                    onClick={() => setCurrentRoute('calculator')}
                                    className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-slate-900 bg-white hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                >
                                    Calculate Impact
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                </button>
                                <button
                                    onClick={() => setShowHistory(true)}
                                    className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center"
                                >
                                    View Previous Scores
                                </button>
                            </div>
                        </div>

                        {/* Clean Minimalist Visual */}
                        <div className="lg:col-span-6 relative flex justify-center items-center">
                            <div className="relative w-80 h-80 sm:w-[400px] sm:h-[400px] flex items-center justify-center">

                                {/* Outer Ambient Glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/20 to-accent-secondary/20 rounded-full blur-[80px] -z-10 animate-pulse-glow"
                                    style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }}
                                ></div>

                                {/* Main Data Ring Container with 3D Parallax */}
                                <div
                                    className="relative w-full h-full rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl flex items-center justify-center group overflow-hidden hover:border-white/20 transition-all duration-300 ease-out"
                                    style={{
                                        transform: `perspective(1000px) rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 15}deg) translateZ(10px)`,
                                        boxShadow: `${mousePos.x * -10}px ${mousePos.y * -10}px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)`
                                    }}
                                >


                                    {/* Inner Grid Lines */}
                                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                                    {/* Rotating Arc Ring */}
                                    <svg className="absolute w-[90%] h-[90%] inset-auto animate-[spin_15s_linear_infinite]" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-white/20" />
                                        <circle cx="50" cy="50" r="48" fill="none" stroke="url(#arc-gradient)" strokeWidth="1.5" strokeDasharray="150" strokeDashoffset="0" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
                                        <defs>
                                            <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#06B6D4" />
                                                <stop offset="100%" stopColor="#4F46E5" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    <svg className="absolute w-[75%] h-[75%] inset-auto animate-[spin_20s_linear_infinite_reverse]" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" className="text-white/30" />
                                    </svg>

                                    {/* Core Score Container with opposing parallax for depth */}
                                    <div
                                        className="relative flex flex-col items-center justify-center z-10 transition-transform duration-300 ease-out"
                                        style={{ transform: `translateZ(30px) translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
                                    >
                                        <div className="absolute -inset-10 bg-gradient-to-b from-white/5 to-transparent rounded-full blur-xl pointer-events-none"></div>
                                        <div className="text-sm font-semibold text-accent-secondary uppercase tracking-[0.4em] mb-2 opacity-80">
                                            Impact Metric
                                        </div>
                                        <div className="text-7xl sm:text-8xl font-black text-white tracking-tighter drop-shadow-2xl flex items-start">
                                            87<span className="text-3xl sm:text-4xl text-slate-400 font-medium mt-2">.4</span>
                                        </div>

                                        {/* Mini sparkline underneath score */}
                                        <div className="w-32 h-10 mt-6 opacity-80 border-b border-white/10 pb-2 relative">
                                            {/* Simple dynamic bar chart abstraction */}
                                            <div className="absolute bottom-2 left-0 w-full h-full flex items-end justify-between gap-1 px-2">
                                                {[40, 65, 45, 80, 55, 90, 75, 100].map((h, i) => (
                                                    <div key={i} className="w-full bg-accent-primary/50 hover:bg-accent-primary rounded-t-sm transition-all duration-300" style={{ height: `${h}%` }}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating minimalist data chips with heavier parallax */}
                                <div
                                    className="absolute top-[5%] -left-[15%] sm:-left-[20%] z-20 bg-slate-900/60 border border-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-2xl animate-float group/chip cursor-default transition-transform duration-300 ease-out"
                                    style={{
                                        animationDelay: '0s',
                                        transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`
                                    }}
                                >
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary/0 to-accent-primary/10 opacity-0 group-hover/chip:opacity-100 transition-opacity"></div>
                                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-semibold">Contextual Boost</div>
                                    <div className="text-base font-bold text-white flex items-center gap-2">
                                        +24.5%
                                    </div>
                                </div>

                                <div
                                    className="absolute bottom-[15%] -right-[5%] sm:-right-[10%] bg-slate-900/60 border border-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-2xl animate-float group/chip cursor-default transition-transform duration-300 ease-out"
                                    style={{
                                        animationDelay: '1.5s',
                                        transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`
                                    }}
                                >
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-secondary/0 to-accent-secondary/10 opacity-0 group-hover/chip:opacity-100 transition-opacity"></div>
                                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-semibold">Match Pressure</div>
                                    <div className="text-base font-bold text-white flex items-center gap-2">
                                        <svg className="w-4 h-4 text-accent-secondary drop-shadow-[0_0_5px_rgba(139,92,246,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
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

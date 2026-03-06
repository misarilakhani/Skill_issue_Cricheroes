import React from 'react';

export function Hero({ setCurrentRoute }) {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
            {/* Background elements (pitch lines, glow) */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-full h-full max-w-5xl border-x border-white/10 flex justify-center">
                    <div className="w-[60%] h-full border-x border-white/5"></div>
                </div>
            </div>
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-primary/20 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-accent-secondary/10 rounded-full blur-[150px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                    {/* Text Content */}
                    <div className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-xs font-bold uppercase tracking-widest mb-6">
                            <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse"></span>
                            Hackathon MVP
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                            Measuring <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">True Impact</span> in Cricket
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Traditional statistics like runs and wickets do not always show the real influence a player has on a match.
                            <br /><br />
                            Our <strong className="text-slate-200">Impact Metric</strong> analyzes performance, match context, and pressure to determine how much a player truly impacts the game.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button
                                onClick={() => setCurrentRoute('calculator')}
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-accent-primary hover:bg-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                            >
                                Try the Impact Calculator
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </button>
                            <button
                                onClick={() => setCurrentRoute('calculator')}
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-slate-300 bg-card border border-white/10 hover:bg-slate-800 hover:text-white transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                            >
                                View Impact Score
                            </button>
                        </div>
                    </div>

                    {/* Visual Analytics Illustration */}
                    <div className="lg:col-span-6 relative">
                        <div className="relative rounded-[2.5rem] bg-card/40 backdrop-blur-xl border border-white/10 p-2 shadow-2xl p-6 overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Abstract Graphic representing Analytics + Cricket */}
                            <div className="relative z-10 w-full aspect-[4/3] flex flex-col items-center justify-center">
                                {/* Gauge Preview */}
                                <div className="relative w-48 h-48 mb-6">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                        {/* Background Circle */}
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" strokeLinecap="round" strokeDasharray="212" strokeDashoffset="70" />
                                        {/* Colored Arc */}
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="10" strokeLinecap="round" strokeDasharray="212" strokeDashoffset="120" className="drop-shadow-[0_0_10px_rgba(79,70,229,0.8)]" />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#06B6D4" />
                                                <stop offset="100%" stopColor="#4F46E5" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
                                        <span className="text-4xl font-black text-white drop-shadow-md">87<span className="text-xl text-slate-400">.4</span></span>
                                        <span className="text-[10px] font-bold text-accent-secondary uppercase tracking-widest mt-1">Impact</span>
                                    </div>
                                </div>

                                {/* Abstract 'Stumps' Data Bars */}
                                <div className="flex items-end gap-3 h-24 mt-4 w-full justify-center opacity-80">
                                    <div className="w-4 bg-slate-700 rounded-t-sm h-12 relative overflow-hidden"><div className="absolute bottom-0 w-full h-full bg-accent-secondary/50 transform origin-bottom scale-y-50"></div></div>
                                    <div className="w-4 bg-slate-700 rounded-t-sm h-20 relative overflow-hidden"><div className="absolute bottom-0 w-full h-full bg-accent-primary/50 transform origin-bottom scale-y-75 shadow-[0_0_15px_rgba(79,70,229,1)]"></div></div>
                                    <div className="w-4 bg-slate-700 rounded-t-sm h-16 relative overflow-hidden"><div className="absolute bottom-0 w-full h-full bg-accent-secondary/50 transform origin-bottom scale-y-60"></div></div>
                                </div>

                                {/* Orbiting element (Ball metaphor) */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full animate-spin" style={{ animationDuration: '10s', animationTimingFunction: 'linear' }}>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Metric Cards */}
                        <div className="absolute -left-8 top-12 bg-card/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '0s' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-accent-secondary/20 flex items-center justify-center text-accent-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Contextual</p>
                                    <p className="text-sm font-black text-white">+24.5% Boost</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-4 bottom-12 bg-card/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pressure</p>
                                    <p className="text-sm font-black text-white">High Variance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

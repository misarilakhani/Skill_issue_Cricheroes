import React, { useState } from 'react';
import { HowToModal } from './HowToModal';
import { Activity } from 'lucide-react';

export function Navbar({ currentRoute, setCurrentRoute }) {
    const [showHowTo, setShowHowTo] = useState(false);

    return (
        <>
            {showHowTo && (
                <HowToModal
                    onClose={() => setShowHowTo(false)}
                    onGoToCalculator={() => {
                        setShowHowTo(false);
                        setCurrentRoute('calculator');
                    }}
                />
            )}
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: 'rgba(11,15,26,0.8)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-[72px]">

                        {/* Logo */}
                        <div
                            className="flex items-center gap-3 group cursor-pointer"
                            onClick={() => setCurrentRoute('landing')}
                        >
                            <div className="relative">
                                {/* Glow halo on hover */}
                                <div className="absolute -inset-1.5 bg-gradient-to-r from-accent-primary/40 to-accent-secondary/40 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-500" />
                                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#1F2937] border border-white/10 group-hover:border-accent-primary/40 transition-all duration-300">
                                    <Activity className="w-5 h-5 text-accent-primary" />
                                </div>
                            </div>
                            <span className="text-[22px] font-black text-white tracking-tighter leading-none">
                                Cricentrix<span className="text-accent-secondary">.</span>
                            </span>
                        </div>

                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center gap-8">
                            <button
                                onClick={() => setCurrentRoute('landing')}
                                className="relative text-sm font-semibold tracking-wide transition-colors duration-200 group"
                            >
                                <span className={currentRoute === 'landing' ? 'text-white' : 'text-slate-400 hover:text-white'}>
                                    Home
                                </span>
                                {currentRoute === 'landing' && (
                                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
                                )}
                            </button>
                            <button
                                onClick={() => setCurrentRoute('calculator')}
                                className="relative text-sm font-semibold tracking-wide transition-colors duration-200"
                            >
                                <span className={currentRoute === 'calculator' ? 'text-white' : 'text-slate-400 hover:text-white'}>
                                    Impact Calculator
                                </span>
                                {currentRoute === 'calculator' && (
                                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
                                )}
                            </button>

                            {/* CTA */}
                            <button
                                onClick={() => setShowHowTo(true)}
                                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 active:scale-95 overflow-hidden group"
                                style={{
                                    background: '#4F46E5',
                                    boxShadow: '0 0 20px rgba(79,70,229,0.35)'
                                }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(79,70,229,0.6)'}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(79,70,229,0.35)'}
                            >
                                <span className="relative z-10">Try Demo</span>
                            </button>
                        </div>

                        {/* Mobile */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setShowHowTo(true)}
                                className="px-4 py-2 rounded-lg text-sm font-bold text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                            >
                                Try Demo
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

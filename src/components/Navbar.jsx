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
            <nav className="fixed top-0 left-0 right-0 z-50 bg-darker/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setCurrentRoute('landing')}>
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-slate-900 p-2 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors">
                                    <Activity className="w-6 h-6 text-accent-primary" />
                                </div>
                            </div>
                            <span className="text-2xl font-black text-white tracking-tighter">
                                Cricentrix<span className="text-accent-primary">.</span>
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <button
                                onClick={() => setCurrentRoute('landing')}
                                className={`text-sm font-medium transition-colors hover:text-white ${currentRoute === 'landing' ? 'text-white' : 'text-slate-400'}`}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => setCurrentRoute('calculator')}
                                className={`text-sm font-medium transition-colors hover:text-white ${currentRoute === 'calculator' ? 'text-white' : 'text-slate-400'}`}
                            >
                                Impact Calculator
                            </button>
                            <button
                                onClick={() => setShowHowTo(true)}
                                className="ml-4 inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-accent-primary hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary focus:ring-offset-darker transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-95"
                            >
                                Try Demo
                            </button>
                        </div>

                        {/* Mobile Menu Button (Simplified for MVP, defaults to Try Demo) */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setShowHowTo(true)}
                                className="inline-flex items-center justify-center px-4 py-2 border border-white/10 rounded-lg shadow-sm text-sm font-bold text-white bg-white/5 hover:bg-white/10 transition-all"
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

import React, { useState } from 'react';
import { HowToModal } from './HowToModal';

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
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => setCurrentRoute('landing')}>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white"><path d="M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                            </div>
                            <span className="text-2xl font-black text-white tracking-tight">Impact<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Metric</span></span>
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

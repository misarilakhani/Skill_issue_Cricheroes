import React from 'react';

export function HowToModal({ onClose, onGoToCalculator }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-2xl font-black text-white mb-6">How to Use Cricentrix</h2>
                <div className="space-y-4 mb-8">
                    <div className="flex gap-3 items-start text-slate-300">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center font-bold text-sm">1</span>
                        <p>Open the <strong>Impact Calculator</strong></p>
                    </div>
                    <div className="flex gap-3 items-start text-slate-300">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center font-bold text-sm">2</span>
                        <p>Select a player from the available list</p>
                    </div>
                    <div className="flex gap-3 items-start text-slate-300">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center font-bold text-sm">3</span>
                        <p>Click calculate to see the player's <strong>impact score</strong></p>
                    </div>
                    <div className="flex gap-3 items-start text-slate-300">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center font-bold text-sm">4</span>
                        <p>View current and previous scores in the history</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                        onClick={onGoToCalculator}
                        className="flex-1 bg-accent-primary hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)] text-sm"
                    >
                        Go to Impact Calculator
                    </button>
                    <button 
                        onClick={onClose}
                        className="sm:w-24 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 px-4 rounded-xl transition-colors border border-white/5 text-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

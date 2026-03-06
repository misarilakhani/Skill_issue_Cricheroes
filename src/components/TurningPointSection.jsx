import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Zap, AlertCircle } from 'lucide-react';
import { detectTurningPoint } from '../utils/turningPointDetector';

export function TurningPointSection({ result }) {
    const [isOpen, setIsOpen] = useState(false);
    const turningPoint = detectTurningPoint(result);

    return (
        <div className="glass-panel overflow-hidden rounded-3xl mb-6 transition-all duration-300">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-accent-teal/10 rounded-xl border border-accent-teal/20 group-hover:scale-110 transition-transform">
                        <Zap className="w-5 h-5 text-accent-teal" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 tracking-tight">Match Turning Point</h3>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {isOpen && (
                <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    {!turningPoint ? (
                        <div className="flex items-center gap-3 text-slate-400 bg-slate-900/40 p-6 rounded-2xl border border-white/5">
                            <AlertCircle className="w-5 h-5 opacity-50" />
                            <p className="font-medium">No clear turning point detected for this innings.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5">
                                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Over</span>
                                    <span className="text-xl font-black text-white">{turningPoint.over}</span>
                                </div>
                                <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5">
                                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Runs Scored</span>
                                    <span className="text-xl font-black text-white">{turningPoint.runs}</span>
                                </div>
                                <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5">
                                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Req. Run Rate</span>
                                    <span className="text-xl font-black text-white">{turningPoint.requiredRunRate}</span>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-accent-teal/10 to-transparent p-6 rounded-2xl border-l-4 border-accent-teal shadow-xl">
                                <span className="block text-[10px] font-bold text-accent-teal uppercase tracking-widest mb-2">Insight</span>
                                <p className="text-slate-200 font-medium leading-relaxed italic">
                                    "{turningPoint.insight}"
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

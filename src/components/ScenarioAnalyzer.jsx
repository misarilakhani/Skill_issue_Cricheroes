import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Target, Search, RefreshCw } from 'lucide-react';
import { evaluateScenario } from '../utils/scenarioAnalyzer';

export function ScenarioAnalyzer({ result }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scenario, setScenario] = useState({
        target: 180,
        oversRemaining: 10,
        requiredRunRate: 9,
        wicketsLost: 3
    });
    const [analysis, setAnalysis] = useState(null);

    const handleAnalyze = () => {
        const res = evaluateScenario(result, scenario);
        setAnalysis(res);
    };

    return (
        <div className="glass-panel overflow-hidden rounded-3xl mb-6 transition-all duration-300">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-accent-purple/10 rounded-xl border border-accent-purple/20 group-hover:scale-110 transition-transform">
                        <Target className="w-5 h-5 text-accent-purple" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 tracking-tight">Match Scenario Analyzer</h3>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {isOpen && (
                <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Scenario Inputs</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Target Score</label>
                                    <input 
                                        type="number" 
                                        value={scenario.target}
                                        onChange={(e) => setScenario({...scenario, target: parseInt(e.target.value)})}
                                        className="w-full bg-slate-900/60 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-accent-purple outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Overs Remaining</label>
                                    <input 
                                        type="number" 
                                        value={scenario.oversRemaining}
                                        onChange={(e) => setScenario({...scenario, oversRemaining: parseInt(e.target.value)})}
                                        className="w-full bg-slate-900/60 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-accent-purple outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Req. Run Rate</label>
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        value={scenario.requiredRunRate}
                                        onChange={(e) => setScenario({...scenario, requiredRunRate: parseFloat(e.target.value)})}
                                        className="w-full bg-slate-900/60 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-accent-purple outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Wickets Lost</label>
                                    <input 
                                        type="number" 
                                        value={scenario.wicketsLost}
                                        onChange={(e) => setScenario({...scenario, wicketsLost: parseInt(e.target.value)})}
                                        className="w-full bg-slate-900/60 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-accent-purple outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={handleAnalyze}
                                className="w-full bg-accent-purple hover:bg-accent-purple/80 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-accent-purple/20"
                            >
                                <Search className="w-4 h-4" />
                                Analyze Scenario
                            </button>
                        </div>

                        <div className="flex flex-col justify-center">
                            {analysis ? (
                                <div className="space-y-6 animate-in zoom-in duration-500">
                                    <div className="text-center">
                                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Suitability</h4>
                                        <div className={`text-3xl font-black uppercase tracking-tighter ${
                                            analysis.suitability === 'Strong' ? 'text-emerald-400' : 
                                            analysis.suitability === 'Moderate' ? 'text-amber-400' : 'text-rose-400'
                                        }`}>
                                            {analysis.suitability}
                                        </div>
                                    </div>
                                    <div className="bg-slate-900/80 p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-accent-purple"></div>
                                        <p className="text-sm text-slate-300 leading-relaxed italic">
                                            "{analysis.insight}"
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center p-8 opacity-40">
                                    <RefreshCw className="w-12 h-12 mx-auto mb-4 text-slate-500 animate-spin-slow" />
                                    <p className="text-sm font-medium">Input scenario data and hit analyze to see if this player fits the moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

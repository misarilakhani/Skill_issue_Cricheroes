import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Target, Search, RefreshCw, Users, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { evaluateScenario } from '../utils/scenarioAnalyzer';
import { calculateImpact } from '../lib/impactLogic';

export function ScenarioAnalyzer({ result, players }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scenario, setScenario] = useState({
        target: 180,
        oversRemaining: 10,
        requiredRunRate: 9,
        wicketsLost: 3
    });
    const [analysis, setAnalysis] = useState(null);
    const [scoutResults, setScoutResults] = useState(null);
    const [isScouting, setIsScouting] = useState(false);

    const handleAnalyze = () => {
        const res = evaluateScenario(result, scenario);
        setAnalysis(res);
    };

    const handleScout = () => {
        setIsScouting(true);
        // Small delay to show loading state
        setTimeout(() => {
            if (!players) {
                setIsScouting(false);
                return;
            }

            const results = players.map(player => {
                const impactResult = calculateImpact(player);
                const evaluation = evaluateScenario(impactResult, scenario);
                return {
                    name: player.playerName,
                    suitability: evaluation.suitability,
                    score: impactResult.score
                };
            });

            // Sort by suitability: Strong -> Moderate -> Low
            const suitOrder = { 'Strong': 3, 'Moderate': 2, 'Low': 1 };
            results.sort((a, b) => suitOrder[b.suitability] - suitOrder[a.suitability] || b.score - a.score);

            setScoutResults(results);
            setIsScouting(false);
        }, 600);
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
                                        onChange={(e) => setScenario({...scenario, target: parseInt(e.target.value) || 0})}
                                        className="w-full bg-slate-900/60 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-accent-purple outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Overs Remaining</label>
                                    <input 
                                        type="number" 
                                        value={scenario.oversRemaining}
                                        onChange={(e) => setScenario({...scenario, oversRemaining: parseInt(e.target.value) || 0})}
                                        className="w-full bg-slate-900/60 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-accent-purple outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Req. Run Rate</label>
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        value={scenario.requiredRunRate}
                                        onChange={(e) => setScenario({...scenario, requiredRunRate: parseFloat(e.target.value) || 0})}
                                        className="w-full bg-slate-900/60 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-accent-purple outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Wickets Lost</label>
                                    <input 
                                        type="number" 
                                        value={scenario.wicketsLost}
                                        onChange={(e) => setScenario({...scenario, wicketsLost: parseInt(e.target.value) || 0})}
                                        className="w-full bg-slate-900/60 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-accent-purple outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    onClick={handleAnalyze}
                                    className="bg-accent-purple hover:bg-accent-purple/80 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-accent-purple/20"
                                >
                                    <Search className="w-4 h-4" />
                                    Analyze
                                </button>
                                <button 
                                    onClick={handleScout}
                                    disabled={isScouting}
                                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 border border-white/5 disabled:opacity-50"
                                >
                                    {isScouting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Users className="w-4 h-4" />}
                                    Scout Team
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            {analysis ? (
                                <div className="space-y-6 animate-in zoom-in duration-500">
                                    <div className="text-center">
                                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Selected Player Suitability</h4>
                                        <div className={`text-3xl font-black uppercase tracking-tighter ${
                                            analysis.suitability === 'Strong' ? 'text-emerald-400' : 
                                            analysis.suitability === 'Moderate' ? 'text-amber-400' : 'text-rose-400'
                                        }`}>
                                            {analysis.suitability}
                                        </div>
                                    </div>
                                    <div className="bg-slate-900/80 p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                                        <div className={`absolute top-0 left-0 w-1 h-full ${
                                            analysis.suitability === 'Strong' ? 'bg-emerald-500' : 
                                            analysis.suitability === 'Moderate' ? 'bg-amber-500' : 'bg-rose-500'
                                        }`}></div>
                                        <p className="text-sm text-slate-300 leading-relaxed italic">
                                            "{analysis.insight}"
                                        </p>
                                    </div>
                                </div>
                            ) : !scoutResults ? (
                                <div className="text-center p-8 opacity-40">
                                    <RefreshCw className="w-12 h-12 mx-auto mb-4 text-slate-500 animate-spin-slow" />
                                    <p className="text-sm font-medium">Input scenario data and hit analyze to see if this player fits the moment.</p>
                                </div>
                            ) : null}

                            {scoutResults && (
                                <div className="mt-4 space-y-4 animate-in slide-in-from-right-4 duration-500">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Team Suitability Report</h4>
                                        <button onClick={() => setScoutResults(null)} className="text-[10px] text-slate-500 hover:text-slate-300 uppercase font-bold">Clear</button>
                                    </div>
                                    <div className="bg-slate-900/60 rounded-2xl border border-white/5 overflow-hidden max-h-[300px] overflow-y-auto custom-scrollbar">
                                        <table className="w-full text-left text-sm">
                                            <thead className="text-[10px] uppercase font-black text-slate-500 bg-slate-900/80 sticky top-0 z-10">
                                                <tr>
                                                    <th className="px-4 py-3">Player</th>
                                                    <th className="px-4 py-3 text-center">Impact</th>
                                                    <th className="px-4 py-3 text-right">Result</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {scoutResults.map((p, idx) => (
                                                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                        <td className="px-4 py-3 font-bold text-slate-200">{p.name}</td>
                                                        <td className="px-4 py-3 text-center font-mono text-slate-400">{p.score}</td>
                                                        <td className="px-4 py-3 text-right">
                                                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                                                                p.suitability === 'Strong' ? 'bg-emerald-500/10 text-emerald-400' : 
                                                                p.suitability === 'Moderate' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                                                            }`}>
                                                                {p.suitability}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex gap-4 items-center px-2">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Strong Fit</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Weak Fit</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

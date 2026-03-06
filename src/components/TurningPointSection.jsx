import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Zap, AlertCircle } from 'lucide-react';
import { detectTurningPoint } from '../utils/turningPointDetector';

export function TurningPointSection({ result }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!result || !result.recentInnings || result.recentInnings.length === 0) {
        return null;
    }

    const innings = result.recentInnings;
    const selectedInning = innings[selectedIndex];

    // Generate dynamic insight based on the inning's data
    const generateInsight = (inning) => {
        let insight = `In this match against ${inning.opposition || 'the opponent'}, `;
        insight += `the player scored ${inning.runs || 0} runs `;
        if (inning.balls) insight += `off ${inning.balls} balls `;
        insight += `in the ${inning.phase || 'match'} phase. `;
        
        if (inning.requiredRunRate) {
            insight += `Facing a required run rate of ${inning.requiredRunRate}, `;
        }
        
        if (inning.impactScore > 80) {
            insight += `this was a massive game-changer, swinging the momentum entirely.`;
        } else if (inning.impactScore > 50) {
            insight += `this performance steadily built pressure on the opposition.`;
        } else {
            insight += `while the impact was moderate, it played a role in the overall outcome.`;
        }

        if (inning.wickets > 0) {
            insight += ` Taking ${inning.wickets} wicket(s) also provided a crucial breakthrough.`;
        }
        
        return insight;
    };

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
                    <h3 className="text-lg font-bold text-slate-100 tracking-tight">Match Turning Point Analysis</h3>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {isOpen && (
                <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="mb-6">
                        <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Select Match to Analyze</label>
                        <select
                            value={selectedIndex}
                            onChange={(e) => setSelectedIndex(Number(e.target.value))}
                            className="w-full bg-slate-900/80 border border-slate-700/50 text-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-teal focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                        >
                            {innings.map((inning, idx) => (
                                <option key={idx} value={idx}>
                                    {inning.date} vs {inning.opposition || 'Unknown'} - {inning.runs} Runs (Impact: {inning.impactScore})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5">
                                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Phase</span>
                                <span className="text-xl font-black text-white">{selectedInning.phase || 'N/A'}</span>
                            </div>
                            <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5">
                                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Runs Scored</span>
                                <span className="text-xl font-black text-white">{selectedInning.runs || 0}</span>
                            </div>
                            <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5">
                                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Strike Rate</span>
                                <span className="text-xl font-black text-white">{selectedInning.battingStrikeRate || 'N/A'}</span>
                            </div>
                            <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5">
                                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Req. Run Rate</span>
                                <span className="text-xl font-black text-white">{selectedInning.requiredRunRate || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-accent-teal/10 to-transparent p-6 rounded-2xl border-l-4 border-accent-teal shadow-xl">
                            <span className="block text-[10px] font-bold text-accent-teal uppercase tracking-widest mb-2">Insight</span>
                            <p className="text-slate-200 font-medium leading-relaxed italic">
                                "{generateInsight(selectedInning)}"
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

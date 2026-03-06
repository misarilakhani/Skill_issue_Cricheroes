import React, { useEffect, useState } from 'react';
import { Trophy, Clock, Medal } from 'lucide-react';
import { getLeaderboard } from '../utils/leaderboardStorage';

export function ImpactLeaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const data = getLeaderboard();
        setLeaderboard(data);
    }, []);

    if (leaderboard.length === 0) {
        return (
            <div className="glass-panel rounded-3xl p-12 text-center mb-10 border border-dashed border-white/10">
                <Trophy className="w-12 h-12 text-slate-700 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold text-slate-300 mb-2">Impact Leaderboard</h3>
                <p className="text-slate-500 max-w-sm mx-auto">No previous scores yet. Calculate a player's impact score to generate the leaderboard.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900/40 backdrop-blur-md rounded-[2rem] overflow-hidden border border-white/5 relative">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-slate-900/20">
                <div>
                    <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                        <Trophy className="w-6 h-6 text-amber-400 shadow-amber-400/20 shadow-lg" />
                        Impact Leaderboard
                    </h3>
                    <p className="text-sm font-medium text-slate-400 mt-1">Based on your recent calculations</p>
                </div>
                <div className="bg-slate-900/60 px-4 py-2 rounded-full border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    Top Performances
                </div>
            </div>

            <div className="divide-y divide-white/5">
                {leaderboard.map((entry, index) => (
                    <div
                        key={`${entry.playerName}-${index}`}
                        className="p-6 flex items-center justify-between hover:bg-white/5 transition-all group"
                    >
                        <div className="flex items-center gap-6">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm border ${index === 0 ? 'bg-amber-400/20 border-amber-400/30 text-amber-400' :
                                    index === 1 ? 'bg-slate-300/20 border-slate-300/30 text-slate-200' :
                                        index === 2 ? 'bg-orange-500/20 border-orange-500/30 text-orange-400' :
                                            'bg-slate-900 border-white/5 text-slate-500'
                                }`}>
                                {index + 1}
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">{entry.playerName}</h4>
                                <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">
                                    <Medal className="w-3 h-3" />
                                    {new Date(entry.timestamp).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-3xl font-black text-white tracking-tighter tabular-nums drop-shadow-md">
                                {entry.impactScore}
                            </div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Impact Score</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

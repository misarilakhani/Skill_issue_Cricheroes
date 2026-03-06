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
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-transparent">
                <div>
                    <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                        <Trophy className="w-6 h-6 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                        Impact Leaderboard
                    </h3>
                    <p className="text-sm font-medium text-slate-400 mt-1">Based on your recent calculations</p>
                </div>
                <div className="bg-[#111625] px-5 py-2.5 rounded-full border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    Top Performances
                </div>
            </div>

            <div className="divide-y divide-white/5">
                {leaderboard.map((entry, index) => {
                    const getRankStyle = (idx) => {
                        if (idx === 0) return 'bg-[#3b3524] border-[#fbbf24]/30 text-[#fbbf24]';
                        if (idx === 1) return 'bg-[#333742] border-[#cbd5e1]/30 text-[#cbd5e1]';
                        if (idx === 2) return 'bg-[#4a2e21] border-[#f97316]/30 text-[#f97316]';
                        return 'bg-[#181d2d] border-white/5 text-slate-500';
                    };

                    return (
                        <div
                            key={`${entry.playerName}-${index}`}
                            className="p-8 flex items-center justify-between hover:bg-white/5 transition-all group"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border ${getRankStyle(index)}`}>
                                    {index + 1}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-xl font-bold text-slate-200 group-hover:text-white transition-colors tracking-tight">{entry.playerName}</h4>
                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        <Medal className="w-3.5 h-3.5" />
                                        {new Date(entry.timestamp).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="text-right flex flex-col items-end gap-1">
                                <div className="text-4xl font-black text-white tracking-tighter tabular-nums drop-shadow-md leading-none">
                                    {entry.impactScore}
                                </div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Impact Score</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

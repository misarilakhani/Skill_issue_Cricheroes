import React, { useState, useEffect } from 'react';
import { getHistory } from '../lib/historyStore';
import { ImpactLeaderboard } from './ImpactLeaderboard';

export function HistoryModal({ onClose }) {
    const [history, setHistory] = useState([]);
    const [activeTab, setActiveTab] = useState('history'); // 'history' | 'leaderboard'

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#111625] border border-white/5 rounded-3xl shadow-2xl max-w-3xl w-full relative max-h-[85vh] flex flex-col">
                <div className="p-4 sm:p-6 border-b border-white/5 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-6">
                        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight hidden sm:block">Scores</h2>
                        <div className="flex bg-[#1e2434] rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`px-4 py-1.5 sm:px-5 text-sm font-bold rounded-md transition-all ${activeTab === 'history' ? 'bg-[#313b52] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                            >
                                History
                            </button>
                            <button
                                onClick={() => setActiveTab('leaderboard')}
                                className={`px-4 py-1.5 sm:px-5 text-sm font-bold rounded-md transition-all ${activeTab === 'leaderboard' ? 'bg-[#313b52] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                            >
                                Leaderboard
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors p-2 bg-[#1e2434] rounded-full hover:bg-[#313b52]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                    {activeTab === 'leaderboard' ? (
                        <ImpactLeaderboard />
                    ) : history.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-300 mb-1">No previous scores yet</h3>
                            <p className="text-sm text-slate-500 max-w-[250px] mx-auto">Calculate a player's impact score to see history here.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {history.map((entry, idx) => (
                                <div key={idx} className="bg-[#181d2d] border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-[#1f2638] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-white text-xl">{entry.player1}</span>
                                        <span className="bg-[#132c32] text-[#36d399] border border-[#132c32] px-2.5 py-1 rounded flex items-center justify-center font-bold text-sm">{entry.score1}</span>
                                    </div>
                                    <div className="text-[11px] font-bold text-slate-400 bg-[#111625] px-4 py-2 rounded-xl border border-white/5 uppercase tracking-wide">
                                        {formatDate(entry.timestamp)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 shrink-0 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-[#242c3d] hover:bg-[#313b52] text-white font-bold py-2.5 px-8 rounded-xl transition-colors text-sm shadow-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

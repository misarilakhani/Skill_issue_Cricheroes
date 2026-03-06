import React, { useState, useEffect } from 'react';
import { getHistory } from '../lib/historyStore';

export function HistoryModal({ onClose }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full relative max-h-[85vh] flex flex-col">
                <div className="p-6 border-b border-white/10 flex justify-between items-center shrink-0">
                    <h2 className="text-2xl font-black text-white tracking-tight">Previous Impact Scores</h2>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto flex-1">
                    {history.length === 0 ? (
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
                                <div key={idx} className="bg-slate-800/50 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/80 transition-colors">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-bold text-white text-lg">{entry.player1}</span>
                                            <span className="bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded flex items-center justify-center font-black text-sm">{entry.score1}</span>
                                        </div>
                                        {entry.player2 && (
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest px-1">VS</span>
                                                <span className="font-bold text-slate-300 text-sm">{entry.player2}</span>
                                                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded flex items-center justify-center font-black text-sm">{entry.score2}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-xs font-bold text-slate-500 shrink-0 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                                        {formatDate(entry.timestamp)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="p-4 border-t border-white/10 shrink-0 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 px-6 rounded-xl transition-colors border border-white/5 text-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

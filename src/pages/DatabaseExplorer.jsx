import React, { useState, useEffect } from 'react';
import { loadDataset } from '../lib/loadDataset';
import { Navbar } from '../components/Navbar';
import { Database, Search, User, Calendar, Activity, ChevronRight, Filter, AlertCircle, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import supabase from '../services/supabaseClient';

export function DatabaseExplorer({ setCurrentRoute }) {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isDemoMode, setIsDemoMode] = useState(!supabase);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await loadDataset();
            setPlayers(data.players || []);
            setLoading(false);
        }
        fetchData();
    }, []);

    const filteredPlayers = players.filter(p => 
        p.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.team?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-darker">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darker text-slate-100 font-sans selection:bg-accent-primary/30 selection:text-white pb-20 pt-32">
            <Navbar currentRoute="database" setCurrentRoute={setCurrentRoute} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] -z-10"></div>
                
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-accent-primary/10 rounded-xl border border-accent-primary/20">
                                    <Database className="w-5 h-5 text-accent-primary" />
                                </div>
                                <span className="text-xs font-black text-accent-primary uppercase tracking-[0.3em]">Dataset Explorer</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                                Player <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Database</span>
                            </h2>
                            <p className="text-slate-400 mt-4 max-w-2xl font-medium">
                                Browse the complete match history used for impact scoring. Each player has a minimum of 10 matches recorded to ensure analytical precision.
                            </p>
                        </div>

                        {/* Connection Badge */}
                        <div className={cn(
                            "px-4 py-2 rounded-2xl border flex items-center gap-2 transition-all shadow-lg",
                            isDemoMode 
                                ? "bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-amber-500/5" 
                                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-emerald-500/5"
                        )}>
                            <div className={cn("w-2 h-2 rounded-full", isDemoMode ? "bg-amber-400 animate-pulse" : "bg-emerald-400")}></div>
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                Status: {isDemoMode ? 'Demo Mode' : 'Cloud Sync Active'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar / List */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-accent-primary transition-colors" />
                            <input 
                                type="text"
                                placeholder="Search players or teams..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-accent-primary/30 focus:ring-4 focus:ring-accent-primary/10 transition-all font-medium"
                            />
                        </div>

                        <div className="glass-panel rounded-3xl overflow-hidden max-h-[600px] flex flex-col">
                            <div className="p-4 border-b border-white/5 bg-slate-900/30">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Available Players ({filteredPlayers.length})</span>
                            </div>
                            <div className="overflow-y-auto custom-scrollbar">
                                {filteredPlayers.map(p => (
                                    <button
                                        key={p.playerId}
                                        onClick={() => setSelectedPlayer(p)}
                                        className={cn(
                                            "w-full p-4 flex items-center justify-between group transition-all border-b border-white/5 last:border-0",
                                            selectedPlayer?.playerId === p.playerId ? "bg-accent-primary/10" : "hover:bg-white/5"
                                        )}
                                    >
                                        <div className="flex items-center gap-4 text-left">
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border",
                                                selectedPlayer?.playerId === p.playerId ? "bg-accent-primary border-accent-primary text-white" : "bg-slate-900 border-white/5 text-slate-400 group-hover:border-white/20"
                                            )}>
                                                {p.playerName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{p.playerName}</div>
                                                <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">{p.team || 'National Team'}</div>
                                            </div>
                                        </div>
                                        <ChevronRight className={cn(
                                            "w-4 h-4 transition-all",
                                            selectedPlayer?.playerId === p.playerId ? "text-accent-primary translate-x-0" : "text-slate-600 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                        )} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Details View */}
                    <div className="lg:col-span-8">
                        {!selectedPlayer ? (
                            <div className="glass-panel rounded-[2rem] h-[600px] flex flex-col items-center justify-center p-12 text-center opacity-80 border-dashed">
                                <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center mb-6">
                                    <User className="w-10 h-10 text-slate-700" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-300">Select a Player</h3>
                                <p className="text-sm text-slate-500 mt-2 max-w-xs">
                                    Select a player from the list to view their 10-match historical data and performance metrics.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                {/* Profile Card */}
                                <div className="glass-panel p-8 rounded-[2rem] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8">
                                        <User className="w-24 h-24 text-white/5 group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-4xl font-black text-white tracking-tight mb-2">{selectedPlayer.playerName}</h3>
                                        <div className="flex flex-wrap gap-3">
                                            <span className="px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase tracking-widest">
                                                {selectedPlayer.team || 'Team India'}
                                            </span>
                                            <span className="px-4 py-1.5 rounded-full bg-slate-900 border border-white/5 text-slate-400 text-[10px] font-medium uppercase tracking-widest flex items-center gap-2">
                                                <Calendar className="w-3 h-3" />
                                                Dataset: 2023-24 Season
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Table Card */}
                                <div className="glass-panel rounded-[2rem] overflow-hidden">
                                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Activity className="w-5 h-5 text-accent-secondary" />
                                            <h4 className="font-bold text-white tracking-tight">Recent Matches</h4>
                                        </div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-900 px-3 py-1.5 rounded-lg border border-white/5">
                                            {selectedPlayer.innings?.length || 0} Records Captured
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead>
                                                <tr className="bg-slate-900/50 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                                                    <th className="px-6 py-4 font-black">Match Date</th>
                                                    <th className="px-6 py-4 font-black">Opposition</th>
                                                    <th className="px-6 py-4 font-black text-center">Score</th>
                                                    <th className="px-6 py-4 font-black text-center">SR / Econ</th>
                                                    <th className="px-6 py-4 font-black text-right">Phase</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {selectedPlayer.innings?.map((inning, idx) => (
                                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                                        <td className="px-6 py-4">
                                                            <div className="font-bold text-slate-300 group-hover:text-white transition-colors">{inning.date}</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-slate-400 font-medium">vs {inning.opposition}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="flex flex-col items-center">
                                                                <span className="font-black text-white">{inning.runs > 0 ? inning.runs : (inning.wickets || 0)}</span>
                                                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">{inning.runs > 0 ? 'Runs' : 'Wickets'}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="font-mono text-accent-secondary/80 font-bold">{inning.battingStrikeRate || (inning.economy ? inning.economy.toFixed(1) : '-')}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className={cn(
                                                                "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter border",
                                                                inning.phase === 'Death' ? "bg-rose-500/10 border-rose-500/20 text-rose-400" :
                                                                inning.phase === 'Powerplay' ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                                                                "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                                            )}>
                                                                {inning.phase}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="p-4 bg-accent-primary/5 border border-accent-primary/20 rounded-2xl flex items-start gap-3">
                                    <Info className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" />
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                        This data is strictly audited for accuracy. To update this database with live match data on-demand, the system uses <span className="text-white font-bold">Supabase Realtime</span> sync as shown by the connection badge above.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { loadDataset } from '../lib/loadDataset';
import { calculateImpact } from '../lib/impactLogic';
import { MetricCard } from '../components/ui';
import { Header } from '../components/ui';
import { ImpactMeter } from '../components/ImpactMeter';
import { TrendChart } from '../components/TrendChart';
import { ProfileRadar } from '../components/ProfileRadar';
import { Activity, Target, Zap, AlertCircle, RefreshCw, Loader2, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';
import { addHistoryEntry } from '../lib/historyStore';
import { generateScoreStory } from '../utils/generateScoreStory';
import { analyzePressure } from '../utils/pressureAnalysis';
import { ScoreStoryCard } from '../components/ScoreStoryCard';
import { PressureAnalysisCard } from '../components/PressureAnalysisCard';
import { Navbar } from '../components/Navbar';
import { TurningPointSection } from '../components/TurningPointSection';
import { ScenarioAnalyzer } from '../components/ScenarioAnalyzer';
import { saveToLeaderboard } from '../utils/leaderboardStorage';
import supabase from '../services/supabaseClient';
import { ScoreRevealAnimation } from '../components/ScoreRevealAnimation';


export function ImpactCalculator({ setCurrentRoute, initialPlayers = [], initialFormats = [] }) {
    const [players, setPlayers] = useState(initialPlayers);
    const [formats, setFormats] = useState(initialFormats);

    const [selectedPlayerId, setSelectedPlayerId] = useState('');
    const [selectedPlayer2Id, setSelectedPlayer2Id] = useState('none');
    const [selectedFormat, setSelectedFormat] = useState('');
    const [isCompareMode, setIsCompareMode] = useState(false);

    const [result, setResult] = useState(null);
    const [result2, setResult2] = useState(null);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [calculating, setCalculating] = useState(false);
    const [isAnimatingScore, setIsAnimatingScore] = useState(false);
    const isDemoMode = !supabase;

    useEffect(() => {
        setPlayers(initialPlayers);
        setFormats(initialFormats);

        // Select first format and player if available
        if (initialFormats?.length > 0) setSelectedFormat(initialFormats[0]);
        if (initialPlayers?.length > 0) setSelectedPlayerId(initialPlayers[0].playerId);
    }, [initialPlayers, initialFormats]);

    const fetchPlayerData = async (player) => {
        // If player already has innings (fallback demo data), don't fetch
        if (player.innings && player.innings.length > 0) return player;

        try {
            console.log(`Fetching detailed data for ${player.playerName} from Supabase...`);
            if (!supabase) throw new Error("Supabase client not initialized.");

            const { data, error } = await supabase
                .from('ipl_match_data')
                .select('*')
                .eq('player_name', player.playerName);

            if (error) throw error;
            if (!data) return player;

            // Map Supabase columns to internal format (adapt to user's requested columns)
            const innings = data.map(row => ({
                matchId: row.match_id || row.id,
                date: row.match_date || row.match_id,
                format: row.format || 'T20',
                runs: row.runs || row.runs_scored || 0,
                balls: row.balls || row.balls_faced || 0,
                battingStrikeRate: row.strike_rate || 0,
                wickets: row.wickets || row.wickets_taken || 0,
                overs: row.overs || row.overs_bowled || 0,
                runsConceded: row.runs_conceded || 0,
                economy: row.economy || row.economy_rate || 0,
                phase: row.match_phase || 'Middle',
                requiredRunRate: row.required_run_rate || 0,
                isChase: row.is_chasing || false,
                team: row.team || '',
                opposition: row.opposition_team || row.opposition || '',
                result: row.match_result || 'Unknown'
            }));

            return { ...player, innings };
        } catch (err) {
            console.error(`Failed to fetch data for ${player.playerName}:`, err);
            return player;
        }
    };

    const playersWithCounts = React.useMemo(() => {
        return players.map(p => {
            const count = p.innings ? p.innings.length : 0;
            return { ...p, matchCount: count };
        });
    }, [players]);

    const handleCalculate = async () => {
        setCalculating(true);
        let impact1 = null;
        try {
            const p1Meta = players.find(p => p.playerId === selectedPlayerId);
            if (!p1Meta) return;

            const player1 = await fetchPlayerData(p1Meta);
            const filteredPlayer1 = {
                ...player1,
                innings: selectedFormat ? player1.innings.filter(i => i.format === selectedFormat) : player1.innings
            };

            impact1 = calculateImpact(filteredPlayer1);
            setResult({ player: filteredPlayer1, ...impact1 });

            let impact2 = null;
            let p2Name = null;

            if (isCompareMode && selectedPlayer2Id !== 'none') {
                const p2Meta = players.find(p => p.playerId === selectedPlayer2Id);
                if (p2Meta) {
                    const player2 = await fetchPlayerData(p2Meta);
                    const filteredPlayer2 = {
                        ...player2,
                        innings: selectedFormat ? player2.innings.filter(i => i.format === selectedFormat) : player2.innings
                    };
                    impact2 = calculateImpact(filteredPlayer2);
                    p2Name = player2.playerName;
                    setResult2({ player: filteredPlayer2, ...impact2 });
                }
            } else {
                setResult2(null);
            }

            addHistoryEntry({
                player1: player1.playerName,
                score1: impact1.score,
                player2: p2Name,
                score2: impact2 ? impact2.score : null,
                timestamp: new Date().toISOString()
            });

            saveToLeaderboard({
                playerName: player1.playerName,
                impactScore: impact1.score
            });
            if (impact2) {
                saveToLeaderboard({
                    playerName: p2Name,
                    impactScore: impact2.score
                });
            }
        } catch (err) {
            console.error("Calculation error:", err);
        } finally {
            setCalculating(false);
            if (impact1) {
                setIsAnimatingScore(true);
            }
        }
    };


    const renderPlayerResult = (res, isPlayer2 = false) => {
        const story = generateScoreStory(res);
        const pressureAnalysis = analyzePressure(res.recentInnings);

        const themeCls = {
            glow: isPlayer2 ? "bg-amber-500/10" : "bg-teal-500/10",
            glowHover: isPlayer2 ? "group-hover:bg-amber-500/20" : "group-hover:bg-teal-500/20",
            iconWrapper: isPlayer2 ? "bg-amber-500/10 border-amber-500/20" : "bg-teal-500/10 border-teal-500/20",
            icon: isPlayer2 ? "text-amber-400" : "text-teal-400",
            ribbon: isPlayer2 ? "from-amber-500" : "from-teal-500",
            ribbonHover: isPlayer2 ? "hover:border-amber-500/30" : "hover:border-teal-500/30",
            meterTheme: isPlayer2 ? "amber" : "teal",
            title: isPlayer2 ? "text-amber-50" : "text-white"
        };

        return (
            <div className={`flex flex-col h-full space-y-6 ${isPlayer2 ? 'opacity-95' : ''}`}>
                <div className="flex items-center justify-between mb-2 px-2">
                    <h2 className={`text-4xl lg:text-3xl font-extrabold tracking-tight drop-shadow-md ${themeCls.title}`}>{res.player.playerName}</h2>
                    {res.isLowConfidence && (
                        <div className="flex items-center gap-1.5 text-amber-300 bg-amber-400/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.2)]">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Low sample size</span>
                        </div>
                    )}
                </div>

                <div className="glass-panel rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] -z-10 ${themeCls.glow}`} />
                    <ImpactMeter score={res.score} animate={true} colorTheme={themeCls.meterTheme} />
                    <p className="text-slate-400 text-sm text-center mt-2 max-w-[200px]">
                        Based on last {res.recentInnings.length} innings<br />
                        <span className="text-xs opacity-60">(Newer innings heavily weighted)</span>
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <MetricCard title="Performance" value={res.breakdown.performance} icon={Zap} colorClass={isPlayer2 ? "text-amber-300" : "text-amber-400"} delay={0.1} />
                    <MetricCard title="Context" value={res.breakdown.context} icon={Activity} colorClass={isPlayer2 ? "text-emerald-300" : "text-emerald-400"} delay={0.2} />
                    <MetricCard title="Pressure" value={res.breakdown.pressure} icon={Target} colorClass={isPlayer2 ? "text-blue-300" : "text-blue-400"} delay={0.3} />
                </div>

                <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group flex-1 flex flex-col">
                    <div className={`absolute top-0 left-0 w-32 h-32 rounded-full blur-[60px] -z-10 transition-colors duration-700 ${themeCls.glow} ${themeCls.glowHover}`}></div>
                    <div className="flex items-center gap-3 mb-5 border-b border-white/5 pb-3">
                        <div className={`relative flex items-center justify-center p-2 rounded-xl border ${themeCls.iconWrapper}`}>
                            <Zap className={`w-4 h-4 absolute animate-ping opacity-50 ${themeCls.icon}`} />
                            <Zap className={`w-4 h-4 relative z-10 ${themeCls.icon}`} />
                        </div>
                        <h3 className="text-sm font-black text-slate-200 tracking-widest uppercase">Score Analysis</h3>
                    </div>
                    <div className="space-y-4">
                        {res.drivers.map((driver, idx) => (
                            <div key={idx} className={`flex gap-4 text-slate-300 bg-slate-900/40 p-4 rounded-2xl border border-white/5 hover:bg-slate-800/60 transition-all duration-300 shadow-sm relative overflow-hidden group/item ${themeCls.ribbonHover}`}>
                                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b transparent opacity-0 group-hover/item:opacity-100 transition-opacity ${themeCls.ribbon}`}></div>
                                <span className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 border border-slate-700 font-black text-xs ${themeCls.icon}`}>
                                    {idx + 1}
                                </span>
                                <p className="text-xs font-medium leading-relaxed tracking-wide">{driver}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-4 rounded-3xl relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] -z-10 transition-colors duration-700 ${themeCls.glow} ${themeCls.glowHover}`}></div>
                    <ProfileRadar breakdown={res.breakdown} theme={themeCls.meterTheme} />
                </div>

                <div className={`grid grid-cols-1 ${!result2 ? 'lg:grid-cols-2' : ''} gap-4 mt-6 items-stretch`}>
                    <ScoreStoryCard story={story} isPlayer2={isPlayer2} />
                    <PressureAnalysisCard analysis={pressureAnalysis} isPlayer2={isPlayer2} />
                </div>
            </div>
        );
    };

    const renderTable = (res, isPlayer2 = false) => {
        const themeColorText = isPlayer2 ? "text-amber-400" : "text-accent-teal";
        const themeColorBg = isPlayer2 ? "bg-amber-400/10 text-amber-400 border-amber-400/20" : "bg-accent-teal/10 text-accent-teal border-accent-teal/20";
        return (
            <div className="glass-panel rounded-3xl mt-6 overflow-hidden">
                <div className="p-5 border-b border-white/5 bg-slate-900/30 flex items-center justify-between">
                    <h3 className="font-bold text-sm tracking-wide text-slate-200">{res.player.playerName}'s Recent Matches</h3>
                    <div className="text-xs font-medium text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">{res.recentInnings.length} Innings</div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-300">
                        <thead className="text-[10px] uppercase bg-slate-900/80 text-slate-400 border-b border-white/5 font-extrabold tracking-[0.2em]">
                            <tr>
                                <th className="px-6 py-5">Date</th>
                                <th className="px-6 py-5">Opponent</th>
                                <th className="px-6 py-5">Runs <span className="text-[8px] opacity-70">(B)</span></th>
                                <th className="px-6 py-5">4s / 6s</th>
                                <th className="px-6 py-5">Strike Rate</th>
                                <th className="px-6 py-5">Wickets</th>
                                <th className="px-6 py-5">Economy</th>
                                <th className={`px-6 py-5 text-right ${themeColorText}`}>Impact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-medium">
                            {res.recentInnings.slice().reverse().map((inning, idx) => (
                                <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-5 whitespace-nowrap text-slate-400 group-hover:text-slate-200 transition-colors">{inning.date}</td>
                                    <td className="px-6 py-5 text-slate-300">{inning.opposition || '-'}</td>
                                    <td className="px-6 py-5">
                                        <span className="font-bold text-white text-lg">{inning.runs || 0}</span>
                                        <span className="text-slate-500 text-xs ml-1.5 font-normal">({inning.balls !== undefined ? inning.balls : '-'})</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-slate-400 font-semibold">{inning.fours || 0}</span> <span className="text-slate-600 mx-1">/</span> <span className="text-slate-200 font-bold">{inning.sixes || 0}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-slate-300 font-semibold">{inning.battingStrikeRate || '-'}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="font-bold text-white text-lg">{inning.wickets || 0}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-slate-300 font-semibold">{inning.economy || '-'}</span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <span className={`inline-flex items-center justify-center border px-3 py-1 rounded-lg font-bold ${themeColorBg}`}>
                                            {inning.impactScore}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    // Since data is loaded in App.jsx, we don't need a separate loading screen here
    // unless we are specifically waiting for a comparison fetch

    return (
        <div className="min-h-screen text-slate-100 pb-20 overflow-x-hidden pt-24 relative z-10">
            <Navbar currentRoute="calculator" setCurrentRoute={setCurrentRoute} />
            <main className="max-w-4xl lg:max-w-[70rem] mx-auto px-4 sm:px-6">
                <div className="glass-panel p-8 rounded-[2rem] mb-6 overflow-hidden group relative border-accent-top">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-all duration-1000 -z-10"></div>
                    <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] -z-10" style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)' }}></div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400 tracking-tight">
                                Analyze Performance with Cricentrix
                            </h2>
                            <p className="text-sm text-slate-400 mt-2 font-medium">
                                Select players to generate their 0-100 impact score based on recent performances, context, and pressure.
                            </p>
                        </div>

                        {/* Data Source Badge */}
                        <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0">
                            <div className={cn(
                                "px-4 py-2 rounded-2xl border flex items-center gap-2 transition-all shadow-lg",
                                isDemoMode
                                    ? "bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-amber-500/5"
                                    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-emerald-500/5"
                            )}>
                                <div className={cn("w-2 h-2 rounded-full", isDemoMode ? "bg-amber-400 animate-pulse" : "bg-emerald-400")}></div>
                                <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                                    {isDemoMode ? 'Demo Fallback' : 'Supabase Active'}
                                </span>
                            </div>

                            <button
                                onClick={() => setCurrentRoute('highlights')}
                                className="group flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-slate-900/50 hover:bg-slate-800 border border-white/5 hover:border-accent-primary/30 transition-all duration-300"
                            >
                                <Trophy className="w-4 h-4 text-accent-primary" />
                                <span className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-300 group-hover:text-white">View Impact Highlights</span>
                            </button>
                        </div>
                    </div>

                    {isDemoMode && (
                        <div className="mb-8 p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-2">
                            <div className="bg-indigo-500/20 p-2 rounded-xl">
                                <AlertCircle className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-300">
                                    <span className="font-bold text-white">Rule:</span> Each demo player has <span className="text-accent-teal font-black">10 matches</span>. Connect Supabase via <code className="bg-black/40 px-1.5 py-0.5 rounded text-accent-teal">.env</code> for live data.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        {formats.length > 0 && (
                            <div className="md:col-span-3">
                                <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Format</label>
                                <select
                                    value={selectedFormat}
                                    onChange={(e) => setSelectedFormat(e.target.value)}
                                    className="w-full rounded-2xl px-5 py-4 outline-none transition-all appearance-none font-semibold text-white"
                                    style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }}
                                    onFocus={e => e.target.style.borderColor = 'rgba(79,70,229,0.6)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                                >
                                    <option value="">All Formats</option>
                                    {formats.map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                            </div>
                        )}

                        <div className={cn("md:col-span-3", formats.length === 0 && "md:col-span-4")}>
                            <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Player 1</label>
                            <select
                                value={selectedPlayerId}
                                onChange={(e) => setSelectedPlayerId(e.target.value)}
                                className="w-full rounded-2xl px-5 py-4 outline-none transition-all appearance-none font-semibold text-white"
                                style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }}
                                onFocus={e => e.target.style.borderColor = 'rgba(79,70,229,0.6)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                            >
                                {playersWithCounts.map(p => (
                                    <option key={p.playerId} value={p.playerId}>{p.playerName} ({p.matchCount})</option>
                                ))}
                            </select>
                        </div>

                        {!isCompareMode ? (
                            <div className={cn("md:col-span-3", formats.length === 0 && "md:col-span-4", "flex flex-col justify-end")}>
                                <button
                                    onClick={() => { setIsCompareMode(true); if (playersWithCounts.length > 1) setSelectedPlayer2Id(playersWithCounts.find(p => p.playerId !== selectedPlayerId)?.playerId || 'none'); }}
                                    className="w-full rounded-2xl px-5 py-4 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 font-bold text-slate-300 hover:text-white"
                                    style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)' }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                                >
                                    Compare Player
                                </button>
                            </div>
                        ) : (
                            <div className={cn("md:col-span-3", formats.length === 0 && "md:col-span-4")}>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Player 2 (Compare)</label>
                                    <button
                                        onClick={() => { setIsCompareMode(false); setSelectedPlayer2Id('none'); setResult2(null); }}
                                        className="text-[10px] text-red-400 hover:text-red-300 font-bold uppercase tracking-widest transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <select
                                    value={selectedPlayer2Id}
                                    onChange={(e) => setSelectedPlayer2Id(e.target.value)}
                                    className="w-full rounded-2xl px-5 py-4 outline-none transition-all appearance-none font-semibold text-white"
                                    style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }}
                                    onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.5)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                                >
                                    <option value="none" disabled>Select Player 2</option>
                                    {playersWithCounts.map(p => (
                                        <option key={p.playerId} value={p.playerId} disabled={p.playerId === selectedPlayerId}>{p.playerName} ({p.matchCount})</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="md:col-span-3">
                            <button
                                onClick={handleCalculate}
                                disabled={calculating}
                                className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-indigo-500 hover:to-cyan-400 text-white font-bold rounded-2xl px-5 py-4 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 shadow-[0_10px_20px_-10px_rgba(79,70,229,0.5)] group overflow-hidden relative disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                {calculating ? (
                                    <Loader2 className="w-5 h-5 relative z-10 animate-spin" />
                                ) : (
                                    <RefreshCw className="w-5 h-5 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
                                )}
                                <span className="relative z-10 tracking-wide">
                                    {calculating ? 'Fetching Data...' : 'Calculate'}
                                </span>

                            </button>
                        </div>
                    </div>
                </div>
                
                {isAnimatingScore && result && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-500 overflow-hidden">
                        <div className={cn(
                            "flex items-center justify-center gap-8 md:gap-16 w-full max-w-6xl px-4",
                            isCompareMode ? "flex-col md:flex-row" : "flex-row"
                        )}>
                            <div className={isCompareMode ? "w-full md:w-1/2" : "w-full"}>
                                <ScoreRevealAnimation 
                                    score={result.score} 
                                    onComplete={() => !result2 && setIsAnimatingScore(false)} 
                                    title={isCompareMode ? "PLAYER 1 IMPACT" : "MATCH IMPACT"}
                                    variant={isCompareMode ? "half" : "full"}
                                    isWinner={isCompareMode && result2 && result.score >= result2.score}
                                    subtitle={isCompareMode && result2 && result.score === result2.score ? "Tied" : result.player.playerName}
                                />
                            </div>
                            
                            {isCompareMode && result2 && (
                                <div className="w-full md:w-1/2">
                                    <ScoreRevealAnimation 
                                        score={result2.score} 
                                        onComplete={() => setIsAnimatingScore(false)} 
                                        title="PLAYER 2 IMPACT"
                                        variant="half"
                                        isWinner={result2.score >= result.score}
                                        subtitle={result.score === result2.score ? "Tied" : result2.player.playerName}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {!result && (
                    <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-700">
                        <div className="w-24 h-24 mb-6 rounded-3xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50 shadow-[0_0_50px_rgba(79,70,229,0.1)] group">
                            <Target className="w-12 h-12 text-slate-500 group-hover:text-accent-primary transition-colors duration-500 animate-pulse-slow" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-300 mb-2">Ready to crunch numbers?</h3>
                        <p className="text-slate-500 max-w-sm">Select a format and a player above, then hit Calculate to reveal their impact metrics.</p>
                    </div>
                )}

                {result && !isAnimatingScore && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
                        <div className={`grid grid-cols-1 ${result2 ? 'lg:grid-cols-2' : ''} gap-8 lg:gap-12 relative`}>
                            {renderPlayerResult(result, false)}
                            {result2 && (
                                <>
                                    <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2 pointer-events-none" />
                                    {renderPlayerResult(result2, true)}
                                </>
                            )}
                        </div>

                        {/* Advanced Analytics Toggle */}
                        {!result2 && (
                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={() => setShowAdvanced(!showAdvanced)}
                                    className="bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-bold py-3 px-8 rounded-2xl border border-white/5 transition-all active:scale-95 flex items-center gap-2 group"
                                >
                                    <Zap className={`w-4 h-4 transition-transform group-hover:rotate-12 ${showAdvanced ? 'text-accent-teal' : ''}`} />
                                    {showAdvanced ? 'Hide Advanced Analysis' : 'Run Advanced Scenario Analysis'}
                                </button>
                            </div>
                        )}

                        {/* Advanced Analytics Sections */}
                        {!result2 && showAdvanced && (
                            <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                                <TurningPointSection result={result} />
                                <ScenarioAnalyzer result={result} players={players} />
                            </div>
                        )}

                        <div className="glass-panel p-8 rounded-3xl mt-8 relative" style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both` }}>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-accent-primary/5 blur-[80px] rounded-full pointer-events-none"></div>

                            <h3 className="text-2xl font-black mb-1 tracking-tight text-white flex items-center gap-2">
                                <Activity className="w-6 h-6 text-accent-primary" /> Impact Trend {result2 && 'Comparison'}
                            </h3>
                            <p className="text-sm font-medium text-slate-400 mb-2">Rolling window of past matches (Left = Oldest, Right = Newest)</p>

                            {result2 && (
                                <div className="flex gap-4 mt-2 mb-4">
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-teal-400"></div><span className="text-xs font-bold text-slate-300">{result.player.playerName}</span></div>
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400"></div><span className="text-xs font-bold text-slate-300">{result2.player.playerName}</span></div>
                                </div>
                            )}

                            <TrendChart data={result.recentInnings} data2={result2 ? result2.recentInnings : null} />
                        </div>

                        <div style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both` }}>
                            {renderTable(result, false)}
                            {result2 && renderTable(result2, true)}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

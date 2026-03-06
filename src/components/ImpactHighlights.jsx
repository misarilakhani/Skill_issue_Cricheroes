import React from 'react';
import { LayoutGrid, Trophy, Zap, ChevronLeft, Target, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { Navbar } from './Navbar';

export function ImpactHighlights({ highlights, onBack, currentRoute, setCurrentRoute }) {
    const Section = ({ title, icon: Icon, items, colorClass }) => (
        <div className="mb-16">
            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                <div className={cn("p-2 rounded-xl border", colorClass.split(' ')[0].replace('text-', 'bg-') + '/10', colorClass.split(' ')[0].replace('text-', 'border-') + '/20')}>
                    <Icon className={cn("w-6 h-6", colorClass)} />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight leading-none uppercase">{title}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div 
                        key={item.id} 
                        className="glass-panel p-6 rounded-3xl group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
                    >
                        {/* Decorative background glow */}
                        <div className={cn("absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-700", colorClass.split(' ')[0].replace('text-', 'bg-'))} />
                        
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-lg font-black text-white leading-tight group-hover:text-accent-primary transition-colors">{item.playerName}</h4>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1 opacity-70">
                                    Match #{item.matchNumber} • Over {item.overNumber}
                                </div>
                            </div>
                            <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border", colorClass.split(' ')[0].replace('text-', 'bg-') + '/10', colorClass.split(' ')[0].replace('text-', 'border-') + '/20', colorClass)}>
                                {item.type}
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6 flex-grow">
                            "{item.description}"
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Match Pressure</span>
                                <span className="text-xs font-bold text-slate-200">RRR: {item.rrr || 'N/A'}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Moment IQ</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-8 h-1 bg-slate-800 rounded-full overflow-hidden">
                                        <div 
                                            className={cn("h-full", colorClass.split(' ')[0].replace('text-', 'bg-'))} 
                                            style={{ width: `${(item.highlightScore / 15) * 100}%` }}
                                        />
                                    </div>
                                    <span className={cn("text-xs font-black", colorClass)}>{item.highlightScore}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-darker">
            <Navbar currentRoute={currentRoute} setCurrentRoute={setCurrentRoute} />
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <button 
                            onClick={onBack}
                            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group text-sm font-bold uppercase tracking-widest"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Calculator
                        </button>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-accent-primary/10 rounded-2xl border border-accent-primary/20">
                                <Trophy className="w-8 h-8 text-accent-primary" />
                            </div>
                            <div>
                                <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
                                    Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Highlights</span>
                                </h2>
                                <p className="text-slate-500 mt-2 font-medium max-w-xl">
                                    Curated high-pressure moments from our dataset. We analyze context, match phase, and required run rate to find the hits that actually changed outcomes.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-center px-6 py-4 rounded-3xl bg-slate-900/50 border border-white/5">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Moments</div>
                            <div className="text-2xl font-black text-white">{(highlights.sixes.length + highlights.fours.length + highlights.wickets.length)}</div>
                        </div>
                        <div className="text-center px-6 py-4 rounded-3xl bg-slate-900/50 border border-white/5">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact Players</div>
                            <div className="text-2xl font-black text-accent-secondary">7</div>
                        </div>
                    </div>
                </div>

                <Section 
                    title="Magnificent Sixes" 
                    icon={Zap} 
                    items={highlights.sixes} 
                    colorClass="text-accent-primary" 
                />
                
                <Section 
                    title="Precision Fours" 
                    icon={Activity} 
                    items={highlights.fours} 
                    colorClass="text-accent-teal" 
                />
                
                <Section 
                    title="Crucial Wickets" 
                    icon={Target} 
                    items={highlights.wickets} 
                    colorClass="text-rose-400" 
                />
            </div>
        </div>
    );
}

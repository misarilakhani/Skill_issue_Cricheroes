import React from 'react';
import { cn } from '../lib/utils';
import { Trophy, Activity, Target } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-darker/60 backdrop-blur-xl pb-4 pt-6 px-4 sm:px-6 lg:px-8 shadow-2xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-accent-teal to-accent-blue p-3 rounded-2xl shadow-[0_0_20px_rgba(20,184,166,0.3)] animate-pulse-glow relative group">
                        <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Trophy className="w-6 h-6 text-white relative z-10 animate-float" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-blue-300 to-purple-400 tracking-tight">
                            Impact Metric
                        </h1>
                        <p className="text-sm text-slate-400 font-medium tracking-wide">0-100 Player Evaluation</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export function MetricCard({ title, value, icon: Icon, colorClass, delay = 0 }) {
    // Generate gentle background gradients based on the title to give each card a unique premium feel
    const bgGradient = title === 'Performance' ? 'from-amber-500/5 to-transparent' :
        title === 'Context' ? 'from-emerald-500/5 to-transparent' :
            'from-blue-500/5 to-transparent';

    const borderGlow = title === 'Performance' ? 'group-hover:border-amber-500/30 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.1)]' :
        title === 'Context' ? 'group-hover:border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]' :
            'group-hover:border-blue-500/30 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]';

    return (
        <div
            className={cn("glass-panel rounded-3xl p-4 md:p-6 flex flex-col justify-between group transition-all duration-500 relative overflow-hidden", borderGlow)}
            style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both` }}
        >
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none -z-10", bgGradient)}></div>
            <div className="flex items-start justify-between flex-wrap gap-2 mb-4 md:mb-6">
                <h3 className="text-slate-400 text-[9px] min-[380px]:text-[10px] lg:text-xs font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase pt-1 max-w-[65%]">{title}</h3>
                {Icon && (
                    <div className={cn("p-1.5 md:p-2 rounded-xl bg-slate-900/80 border border-white/5 group-hover:scale-110 transition-transform shadow-inner flex shrink-0 items-center justify-center", colorClass)}>
                        <Icon className="w-4 h-4 md:w-5 md:h-5 drop-shadow-md" />
                    </div>
                )}
            </div>
            <div className="flex items-baseline gap-1 md:gap-2 relative z-10">
                <span className="text-4xl lg:text-5xl font-extrabold text-white tracking-tighter drop-shadow-lg">
                    {value}
                </span>
                <span className="text-xs md:text-sm font-bold text-slate-500 mb-1">/ 100</span>
            </div>
        </div>
    );
}

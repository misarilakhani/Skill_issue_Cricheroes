import React from 'react';
import { Target, CheckCircle2, AlertCircle } from 'lucide-react';

export function ScoreStoryCard({ story, isPlayer2 = false }) {
    if (!story) return null;

    const themeCls = {
        glow: isPlayer2 ? "bg-amber-500/10" : "bg-teal-500/10",
        glowHover: isPlayer2 ? "group-hover:bg-amber-500/20" : "group-hover:bg-teal-500/20",
        iconWrapper: isPlayer2 ? "bg-amber-500/10 border-amber-500/20" : "bg-teal-500/10 border-teal-500/20",
        icon: isPlayer2 ? "text-amber-400" : "text-teal-400",
        ribbon: isPlayer2 ? "from-amber-500" : "from-teal-500",
        title: isPlayer2 ? "text-amber-50" : "text-white"
    };

    return (
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group w-full h-full flex flex-col">
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] -z-10 transition-colors duration-700 ${themeCls.glow} ${themeCls.glowHover}`}></div>

            <div className="flex items-start gap-3 mb-5 border-b border-white/5 pb-3">
                <div className={`relative flex items-center justify-center p-2 rounded-xl border ${themeCls.iconWrapper}`}>
                    <Target className={`w-5 h-5 relative z-10 ${themeCls.icon}`} />
                </div>
                <h3 className={`text-lg font-black tracking-wide mt-1 ${themeCls.title}`}>
                    {story.title || "Story Behind the Score"}
                </h3>
            </div>

            <div className="space-y-3 mb-4">
                {story.points && story.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 flex-wrap">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${themeCls.icon}`} />
                        <p className="text-sm font-medium text-slate-300 flex-1 leading-relaxed">
                            {point}
                        </p>
                    </div>
                ))}
            </div>

            <div className={`mt-auto pt-4 border-t border-white/5 flex gap-2 items-start text-sm font-semibold italic opacity-90 ${themeCls.icon}`}>
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <p>"{story.summary}"</p>
            </div>
        </div>
    );
}

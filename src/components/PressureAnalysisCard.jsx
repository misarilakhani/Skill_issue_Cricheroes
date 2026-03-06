import React from 'react';
import { Zap, ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';

export function PressureAnalysisCard({ analysis, isPlayer2 = false }) {
    if (!analysis) return null;

    const themeCls = {
        glow: isPlayer2 ? "bg-amber-500/10" : "bg-teal-500/10",
        glowHover: isPlayer2 ? "group-hover:bg-amber-500/20" : "group-hover:bg-teal-500/20",
        iconWrapper: isPlayer2 ? "bg-amber-500/10 border-amber-500/20" : "bg-teal-500/10 border-teal-500/20",
        icon: isPlayer2 ? "text-amber-400" : "text-teal-400",
        title: isPlayer2 ? "text-amber-50" : "text-white"
    };

    let StatusIcon = HelpCircle;
    let statusClass = "text-slate-400 bg-slate-400/10 border-slate-400/20";

    if (analysis.status === "YES") {
        StatusIcon = CheckCircle;
        statusClass = isPlayer2 ? "text-amber-400 bg-amber-400/10 border-amber-400/20" : "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    } else if (analysis.status === "MODERATE") {
        StatusIcon = Zap;
        statusClass = "text-blue-400 bg-blue-400/10 border-blue-400/20";
    } else if (analysis.status === "NO") {
        StatusIcon = ShieldAlert;
        statusClass = "text-red-400 bg-red-400/10 border-red-400/20";
    }

    return (
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group flex-1 flex flex-col mt-4">
            <div className={`absolute bottom-0 left-0 w-32 h-32 rounded-full blur-[60px] -z-10 transition-colors duration-700 ${themeCls.glow} ${themeCls.glowHover}`}></div>

            <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-3">
                <div className="flex items-center gap-3">
                    <div className={`relative flex items-center justify-center p-2 rounded-xl border ${themeCls.iconWrapper}`}>
                        <Zap className={`w-5 h-5 relative z-10 ${themeCls.icon}`} />
                    </div>
                    <h3 className={`text-lg font-black tracking-wide ${themeCls.title}`}>
                        Pressure / Clutch Analysis
                    </h3>
                </div>
            </div>

            <div className="flex flex-col gap-4 mb-4">
                <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status:</span>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${statusClass}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span>{analysis.status}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rating:</span>
                    <span className="text-sm font-semibold text-slate-200">{analysis.rating}</span>
                </div>
            </div>

            <div className="bg-slate-900/40 p-4 rounded-2xl border border-white/5 mb-4">
                <p className="text-sm font-medium text-slate-300 leading-relaxed">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Key Insight:</span>
                    "{analysis.insight}"
                </p>
            </div>

            <div className="space-y-2 mt-auto">
                {analysis.reasons && analysis.reasons.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${themeCls.glowHover.replace("group-hover:", "")}`}></div>
                        <p className="text-xs font-medium text-slate-400 flex-1">{reason}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

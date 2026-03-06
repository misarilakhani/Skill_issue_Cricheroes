import React from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export function TrendChart({ data, data2 }) {
    if (!data || data.length === 0) return null;

    const formatData = (d) => [...d].reverse();
    const d1 = formatData(data);
    const d2 = data2 ? formatData(data2) : [];

    const maxLength = Math.max(d1.length, d2.length);
    const chartData = Array.from({ length: maxLength }).map((_, i) => {
        const item = { name: `M${i + 1}` };
        if (i < d1.length) {
            item.score = typeof d1[i].impactScore === 'number' ? Math.round(d1[i].impactScore) : 50;
            item.date = d1[i].date;
            item.opp = d1[i].opposition || 'Opponent';
        }
        if (i < d2.length) {
            item.score2 = typeof d2[i].impactScore === 'number' ? Math.round(d2[i].impactScore) : 50;
            item.date2 = d2[i].date;
            item.opp2 = d2[i].opposition || 'Opponent';
        }
        return item;
    });

    const isSinglePoint = chartData.length === 1;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 p-4 rounded-2xl shadow-xl transform transition-all scale-105 min-w-[150px]">
                    {payload.map((entry, idx) => {
                        const isSecond = entry.dataKey === 'score2';
                        const pDate = isSecond ? entry.payload.date2 : entry.payload.date;
                        const pOpp = isSecond ? entry.payload.opp2 : entry.payload.opp;
                        const colorClass = isSecond ? 'text-amber-400' : 'text-teal-400';
                        const borderClass = isSecond && payload.length > 1 ? 'border-t border-amber-500/20 mt-3 pt-3' : '';

                        if (entry.value === undefined) return null;

                        return (
                            <div key={idx} className={`${borderClass}`}>
                                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1 break-words">{pDate} <span className="text-slate-600">vs</span> <span className="text-slate-200">{pOpp}</span></p>
                                <div className="flex items-baseline gap-2">
                                    <p className={`${colorClass} font-black text-3xl drop-shadow-sm`}>{entry.value}</p>
                                    <span className="text-slate-500 text-xs font-bold">Impact</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
        return null;
    };

    const gradientDef = (
        <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
    );

    // For single point comparison, render a BarChart
    if (isSinglePoint) {
        return (
            <div style={{ width: '100%', height: 320 }} className="mt-6 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 10 }} barSize={40}>
                        {gradientDef}
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.4} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={14} fontFamily="Outfit" fontWeight={600} tickLine={false} axisLine={false} dy={10} />
                        <YAxis domain={[0, 100]} stroke="#64748b" fontSize={14} fontFamily="Outfit" fontWeight={600} tickLine={false} axisLine={false} tickFormatter={(val) => val === 0 ? '' : val} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#334155', opacity: 0.2 }} />
                        <Bar dataKey="score" fill="#14b8a6" radius={[4, 4, 0, 0]} animationDuration={1000} />
                        {data2 && <Bar dataKey="score2" fill="#fbbf24" radius={[4, 4, 0, 0]} animationDuration={1000} />}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: 320 }} className="mt-6 relative">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                    {gradientDef}
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} fontFamily="Outfit" fontWeight={600} tickLine={false} axisLine={false} dy={15} />
                    <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} fontFamily="Outfit" fontWeight={600} tickLine={false} axisLine={false} tickFormatter={(val) => val === 0 ? '' : val} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#64748b', strokeWidth: 1, strokeDasharray: '5 5' }} />
                    <Line type="linear" dataKey="score" stroke="#14b8a6" strokeWidth={4} activeDot={{ r: 8, fill: '#14b8a6', stroke: '#fff', strokeWidth: 3 }} dot={{ r: 4, fill: '#0f172a', stroke: '#14b8a6', strokeWidth: 2 }} animationDuration={2000} filter="url(#glow)" />
                    {data2 && <Line type="linear" dataKey="score2" stroke="#fbbf24" strokeWidth={4} activeDot={{ r: 8, fill: '#fbbf24', stroke: '#fff', strokeWidth: 3 }} dot={{ r: 4, fill: '#0f172a', stroke: '#fbbf24', strokeWidth: 2 }} animationDuration={2000} filter="url(#glow2)" />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

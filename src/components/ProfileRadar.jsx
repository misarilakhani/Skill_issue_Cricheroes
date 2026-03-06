import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function ProfileRadar({ breakdown, theme = 'teal' }) {
    const data = [
        { subject: 'Consistency', A: breakdown.consistency || 0, fullMark: 100 },
        { subject: 'Pressure', A: breakdown.pressure || 0, fullMark: 100 },
        { subject: 'Striking', A: breakdown.striking || 0, fullMark: 100 },
        { subject: 'Context', A: breakdown.context || 0, fullMark: 100 },
        { subject: 'Economy', A: breakdown.economy || 0, fullMark: 100 },
    ];

    const colors = {
        teal: { stroke: '#2dd4bf', fill: '#14b8a6', text: '#94a3b8' },
        amber: { stroke: '#fbbf24', fill: '#f59e0b', text: '#94a3b8' }
    };

    const color = colors[theme] || colors.teal;

    return (
        <div className="w-full h-64 flex flex-col items-center justify-center relative">
            <h3 className="absolute top-0 text-white font-bold tracking-wide">360° Profile</h3>
            <div className="w-full h-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="rgba(255,255,255,0.05)" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: color.text, fontSize: 11, fontWeight: 600 }}
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
                            itemStyle={{ color: color.stroke, fontWeight: 'bold' }}
                            formatter={(value) => [`${value}/100`, 'Score']}
                        />
                        <Radar
                            name="Score"
                            dataKey="A"
                            stroke={color.stroke}
                            fill={color.fill}
                            fillOpacity={0.4}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

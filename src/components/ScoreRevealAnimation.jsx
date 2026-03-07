import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

export const ScoreRevealAnimation = ({ 
    score, 
    onComplete, 
    title = "MATCH IMPACT", 
    subtitle = "Verification Complete",
    isWinner = false,
    variant = "full" // "full" or "half"
}) => {
    const [displayScore, setDisplayScore] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    
    useEffect(() => {
        const duration = 1200; // 1.2 seconds total
        const startTime = Date.now();
        
        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for the "slowing down" effect
            const easeOutQuad = (t) => t * (2 - t);
            const easedProgress = easeOutQuad(progress);
            
            if (progress < 1) {
                // Generate random-looking digits during the flip
                const randomVal = Math.floor(Math.random() * 100);
                setDisplayScore(randomVal);
                requestAnimationFrame(animate);
            } else {
                setDisplayScore(score);
                setIsLocked(true);
                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 2500); // Increased pause for better visibility
            }
        };
        
        requestAnimationFrame(animate);
    }, [score, onComplete]);

    const isHalf = variant === "half";

    return (
        <div className={cn(
            "z-[100] flex items-center justify-center animate-in fade-in duration-500",
            !isHalf ? "fixed inset-0 bg-slate-950/80 backdrop-blur-md" : "relative bg-transparent backdrop-blur-none"
        )}>
            <div className={cn(
                "relative group transition-all duration-700 mx-auto",
                isHalf ? "w-full scale-90 md:scale-100" : "w-full flex justify-center",
                isWinner && isLocked && "scale-105 md:scale-110"
            )}>
                {/* Background Glow */}
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] transition-all duration-1000 opacity-60",
                    isHalf ? "w-60 h-60" : "w-80 h-80",
                    isLocked ? "bg-accent-primary/40 scale-125" : "bg-slate-700/20 scale-100",
                    isWinner && isLocked && "bg-accent-secondary/60 blur-[120px]"
                )} />
                
                {/* Scoreboard Panel */}
                <div className={cn(
                    "relative overflow-hidden glass-panel rounded-[2.5rem] border-2 flex flex-col items-center justify-center transition-all duration-500 shadow-2xl",
                    isHalf ? "p-6 md:p-8" : "p-10",
                    isLocked ? "border-accent-primary/40 bg-slate-900/90" : "border-white/10 bg-slate-900/80",
                    isWinner && isLocked ? "border-accent-secondary/60 winner-glow shadow-accent-secondary/20" : ""
                )}>
                    {/* Scanline effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
                    
                    <div className="relative z-10 flex flex-col items-center">
                        <span className={cn(
                            "font-black tracking-[0.4em] text-accent-primary uppercase opacity-80",
                            isHalf ? "text-[8px] mb-2" : "text-[10px] mb-4"
                        )}>
                            {title}
                        </span>
                        
                        <div className="relative">
                            <h2 className={cn(
                                "font-black tracking-tighter tabular-nums transition-all duration-300",
                                isHalf ? "text-6xl md:text-7xl" : "text-8xl md:text-9xl",
                                isLocked ? "text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "text-slate-400",
                                isWinner && isLocked && "text-accent-secondary drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                            )}>
                                {displayScore.toString().padStart(2, '0')}
                            </h2>
                            
                            {/* Flicker effect when not locked */}
                            {!isLocked && (
                                <div className="absolute inset-0 bg-accent-primary/10 animate-pulse rounded-lg blur-xl mix-blend-overlay" />
                            )}
                        </div>
                        
                        <div className={cn(
                            "px-6 py-2 rounded-full border transition-all duration-700",
                            isHalf ? "mt-4" : "mt-6",
                            isLocked 
                                ? "bg-accent-primary/10 border-accent-primary/30 opacity-100 translate-y-0" 
                                : "bg-transparent border-transparent opacity-0 translate-y-4",
                            isWinner && isLocked && "bg-accent-secondary/20 border-accent-secondary/40"
                        )}>
                            <span className={cn(
                                "font-bold tracking-widest uppercase",
                                isHalf ? "text-[10px]" : "text-xs",
                                isWinner && isLocked ? "text-accent-secondary" : "text-accent-primary"
                            )}>
                                {isWinner && isLocked ? (subtitle === "Tied" ? "🏆 TIED" : "🏆 WINNER") : subtitle}
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Decorative corner accents */}
                <div className={cn(
                    "absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 transition-all duration-500",
                    isLocked ? "border-accent-primary" : "border-white/20",
                    isWinner && isLocked && "border-accent-secondary"
                )} />
                <div className={cn(
                    "absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 transition-all duration-500",
                    isLocked ? "border-accent-primary" : "border-white/20",
                    isWinner && isLocked && "border-accent-secondary"
                )} />
            </div>
        </div>
    );
};


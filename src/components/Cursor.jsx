import React, { useEffect, useState } from 'react';

export function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
            // Use requestAnimationFrame for smooth 60fps tracking without CSS delays
            requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY });
            });
            if (hidden) setHidden(false);
        };

        const handleMouseLeave = () => setHidden(true);
        const handleMouseEnter = () => setHidden(false);

        window.addEventListener('mousemove', updatePosition, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [hidden]);

    if (hidden) return null;

    return (
        <div
            className="fixed pointer-events-none z-[99999] flex items-center justify-center overflow-hidden w-5 h-5 rounded-full bg-gradient-to-br from-white to-slate-200 shadow-[0_0_15px_4px_rgba(255,255,255,0.4),inset_-2px_-2px_6px_rgba(0,0,0,0.15)] hidden lg:flex"
            style={{
                left: 0,
                top: 0,
                // Instant update, no CSS transition delay for accuracy
                transform: `matrix(1, 0, 0, 1, ${position.x - 10}, ${position.y - 10}) rotate(${position.x}deg)`
            }}
        >
            {/* Cricket Ball Seam details */}
            <div className="absolute w-full h-[1px] bg-slate-400/80 transform -rotate-12 shadow-[0_1px_1px_rgba(255,255,255,0.8)]"></div>
            <div className="absolute w-full h-[1px] bg-slate-400/80 transform rotate-12 mt-1 shadow-[0_1px_1px_rgba(255,255,255,0.8)]"></div>

            {/* Highlight for 3D sphere effect */}
            <div className="absolute top-[10%] left-[15%] w-1.5 h-1.5 bg-white rounded-full blur-[1px]"></div>
        </div>
    );
}

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
            className="fixed pointer-events-none z-[99999] flex items-center justify-center w-6 h-6 hidden lg:flex"
            style={{
                left: 0,
                top: 0,
                transform: `translate3d(${position.x - 12}px, ${position.y - 12}px, 0) rotate(${(position.x + position.y) * 0.5}deg)`
            }}
        >
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Dark Inner Fill to make white pop */}
                <circle
                    cx="50" cy="50" r="45"
                    fill="#050505"
                />

                {/* Main Circle Outline */}
                <circle
                    cx="50" cy="50" r="45"
                    stroke="white"
                    strokeWidth="5"
                />

                {/* Left Seam Line */}
                <path
                    d="M40 8V92"
                    stroke="white"
                    strokeWidth="4"
                />

                {/* Right Seam Line */}
                <path
                    d="M60 8V92"
                    stroke="white"
                    strokeWidth="4"
                />

                {/* Center Dotted Seam Line */}
                <path
                    d="M50 10V90"
                    stroke="white"
                    strokeWidth="5"
                    strokeDasharray="4 6"
                />
            </svg>
        </div>
    );
}

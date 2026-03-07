import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CricketIntroScene } from './CricketIntroScene';

/**
 * IntroCinematic — Cinematic intro overlay.
 *
 * Phases:
 *   waiting   — Dark screen, branding + "Tap to Enter". Ball is visible but idle.
 *   animating — On tap: ball flies toward viewer → shrinks → overlay fades → onComplete()
 */
export function IntroCinematic({ onComplete }) {
    const [phase, setPhase] = useState('waiting');
    const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const [clickPos, setClickPos] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handler, { passive: true });
        return () => window.removeEventListener('mousemove', handler);
    }, []);

    useEffect(() => {
        if (phase === 'animating') {
            const t = setTimeout(() => onComplete?.(), 2200);
            return () => clearTimeout(t);
        }
    }, [phase, onComplete]);

    const handleTap = useCallback((e) => {
        if (phase === 'waiting') {
            const pos = e?.touches?.[0]
                ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
                : { x: mousePos.current.x, y: mousePos.current.y };
            setClickPos(pos);
            setPhase('animating');
        }
    }, [phase]);

    // Handle Enter key to trigger the animation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                handleTap();
            }
        };

        if (phase === 'waiting') {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [phase, handleTap]);

    return <CricketIntroScene phase={phase} onTap={handleTap} mousePos={clickPos} />;
}

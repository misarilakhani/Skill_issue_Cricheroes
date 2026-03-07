import React from 'react';

/**
 * ShootingStarsBackground — A premium, sparse shooting star effect.
 * Renders 3-4 reusable star elements with staggered, infrequent animations.
 */
export function ShootingStarsBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="premium-star"
                    style={{
                        '--delay': `${i * 12 + Math.random() * 5}s`,
                        '--duration': `${2.5 + Math.random() * 1.5}s`,
                        '--top': `${Math.random() * 40}%`,
                        '--left': `${20 + Math.random() * 60}%`,
                        '--rot': i % 2 === 0 ? '45deg' : '-45deg',
                        '--len': `${150 + Math.random() * 100}px`
                    }}
                />
            ))}
        </div>
    );
}

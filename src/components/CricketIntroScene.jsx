import { ShootingStarsBackground } from './ShootingStarsBackground';

/**
 * CricketIntroScene — Presentational intro overlay.
 *
 * waiting:   Ball visible at center (large, idle), branding + "Tap to Enter"
 * animating: Ball flies toward viewer → shrinks to cursor → overlay fades out
 */
export function CricketIntroScene({ phase, onTap, mousePos }) {
    return (
        <div
            className={`ci-overlay ${phase === 'animating' ? 'ci-exiting' : ''}`}
            onClick={phase === 'waiting' ? onTap : undefined}
            onTouchEnd={phase === 'waiting' ? onTap : undefined}
        >
            {/* Ambient mood light */}
            <div className="ci-ambient" />

            {/* Shooting Stars — Premium Cinematic Background */}
            <ShootingStarsBackground />

            {/* Subtle floating particles */}
            <div className="ci-particles" aria-hidden="true">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="ci-particle"
                        style={{
                            '--x': `${15 + Math.random() * 70}%`,
                            '--y': `${10 + Math.random() * 80}%`,
                            '--delay': `${i * 0.4}s`,
                            '--size': `${2 + Math.random() * 3}px`,
                        }}
                    />
                ))}
            </div>

            {/* Cricket ball — realistic white */}
            <div
                className={[
                    'ci-ball',
                    phase === 'waiting' ? 'ci-ball-idle' : '',
                    phase === 'animating' ? 'ci-ball-fly-shrink' : '',
                ].join(' ')}
                style={
                    phase === 'animating' && mousePos
                        ? {
                            '--shrink-x': `${mousePos.x}px`,
                            '--shrink-y': `${mousePos.y}px`,
                        }
                        : undefined
                }
            >
                <div className="ci-ball-inner">
                    <RealisticWhiteBall />
                </div>
            </div>

            {/* Tagline — always visible */}
            <div className={`ci-tagline ci-tagline-visible`}>
                <span className="ci-brand-name">CRICENTRIX</span>
                <span className="ci-brand-sub">Cricket Impact Analytics</span>
            </div>

            {/* Tap to Enter prompt — only when waiting */}
            {phase === 'waiting' && (
                <div className="ci-tap-prompt">
                    <div className="ci-tap-ring" />
                    <span className="ci-tap-text">Tap to Enter</span>
                </div>
            )}
        </div>
    );
}

/* ─── Realistic White Cricket Ball (Generated Image) ─ */
function RealisticWhiteBall() {
    return (
        <img
            src="/cricket-ball.png"
            alt="Cricket Ball"
            width="380"
            height="380"
            className="ci-ball-svg"
            draggable={false}
        />
    );
}

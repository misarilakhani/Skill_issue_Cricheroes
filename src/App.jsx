import React, { useState, useEffect } from 'react';
import { Landing } from './pages/Landing';
import { ImpactCalculator } from './pages/ImpactCalculator';
import { DatabaseExplorer } from './pages/DatabaseExplorer';
import { ImpactHighlights } from './components/ImpactHighlights';
import { Cursor } from './components/Cursor';
import { CricketBackground } from './components/CricketBackground';
import { IntroCinematic } from './components/IntroCinematic';
import { detectHighlights } from './utils/highlightDetector';
import { loadDataset } from './lib/loadDataset';

function App() {
    const [currentRoute, setCurrentRoute] = useState('landing');
    const [allPlayers, setAllPlayers] = useState([]);
    const [formats, setFormats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Show cinematic intro on every page load/refresh
    const [showIntro, setShowIntro] = useState(true);

    const handleIntroComplete = () => {
        setShowIntro(false);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 5000); // 5 second safety timeout

        async function init() {
            try {
                const data = await loadDataset();
                setAllPlayers(data.players || []);
                setFormats(data.formats || []);
            } catch (err) {
                console.error("Failed to initialize app data:", err);
            } finally {
                setIsLoading(false);
                clearTimeout(timeoutId);
            }
        }
        init();
        return () => clearTimeout(timeoutId);
    }, []);

    const renderRoute = () => {
        if (isLoading) {
            // Only show bare spinner if intro already done (i.e. data still loading after replay)
            if (!showIntro) {
                return (
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12" style={{ border: '3px solid rgba(255,255,255,0.05)', borderTopColor: '#4F46E5' }}></div>
                    </div>
                );
            }
            return null; // Intro is showing, no need for spinner
        }

        switch (currentRoute) {
            case 'landing':
                return <Landing setCurrentRoute={setCurrentRoute} />;
            case 'calculator':
                return (
                    <ImpactCalculator
                        setCurrentRoute={setCurrentRoute}
                        initialPlayers={allPlayers}
                        initialFormats={formats}
                    />
                );
            case 'database':
                return <DatabaseExplorer setCurrentRoute={setCurrentRoute} />;
            case 'highlights':
                const highlights = detectHighlights(allPlayers);
                return (
                    <ImpactHighlights
                        highlights={highlights}
                        onBack={() => setCurrentRoute('calculator')}
                        currentRoute={currentRoute}
                        setCurrentRoute={setCurrentRoute}
                    />
                );
            default:
                return <Landing setCurrentRoute={setCurrentRoute} />;
        }
    };

    return (
        <>
            {/* Cinematic intro — renders on top of everything, self-removes */}
            {showIntro && <IntroCinematic onComplete={handleIntroComplete} />}

            {/* Main app — hidden behind intro, fades in naturally after */}
            {!showIntro && (
                <>
                    <CricketBackground />
                    <Cursor />
                    {renderRoute()}
                </>
            )}
        </>
    );
}

export default App;

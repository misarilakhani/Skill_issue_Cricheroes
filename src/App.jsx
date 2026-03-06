import React, { useState, useEffect } from 'react';
import { Landing } from './pages/Landing';
import { ImpactCalculator } from './pages/ImpactCalculator';
import { DatabaseExplorer } from './pages/DatabaseExplorer';
import { ImpactHighlights } from './components/ImpactHighlights';
import { Cursor } from './components/Cursor';
import { CricketBackground } from './components/CricketBackground';
import { detectHighlights } from './utils/highlightDetector';
import { loadDataset } from './lib/loadDataset';

function App() {
    const [currentRoute, setCurrentRoute] = useState('landing');
    const [allPlayers, setAllPlayers] = useState([]);
    const [formats, setFormats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12" style={{ border: '3px solid rgba(255,255,255,0.05)', borderTopColor: '#4F46E5' }}></div>
                </div>
            );
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
            <CricketBackground />
            <Cursor />
            {renderRoute()}
        </>
    );
}

export default App;

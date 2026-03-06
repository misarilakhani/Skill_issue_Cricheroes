import React, { useState } from 'react';
import { Landing } from './pages/Landing';
import { ImpactCalculator } from './pages/ImpactCalculator';
import { DatabaseExplorer } from './pages/DatabaseExplorer';
import { Cursor } from './components/Cursor';
import { CricketBackground } from './components/CricketBackground';

function App() {
    const [currentRoute, setCurrentRoute] = useState('landing');

    const renderRoute = () => {
        switch (currentRoute) {
            case 'landing':
                return <Landing setCurrentRoute={setCurrentRoute} />;
            case 'calculator':
                return <ImpactCalculator setCurrentRoute={setCurrentRoute} />;
            case 'database':
                return <DatabaseExplorer setCurrentRoute={setCurrentRoute} />;
            default:
                return <Landing setCurrentRoute={setCurrentRoute} />;
        }
    };

    return (
        <>
            {/* Global decorative background layer — sits behind everything */}
            <CricketBackground />
            <Cursor />
            {renderRoute()}
        </>
    );
}

export default App;

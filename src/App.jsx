import React, { useState } from 'react';
import { Landing } from './pages/Landing';
import { ImpactCalculator } from './pages/ImpactCalculator';
import { Cursor } from './components/Cursor';
import { CricketBackground } from './components/CricketBackground';

function App() {
    const [currentRoute, setCurrentRoute] = useState('landing');

    return (
        <>
            {/* Global decorative background layer — sits behind everything */}
            <CricketBackground />
            <Cursor />
            {currentRoute === 'landing' ? (
                <Landing setCurrentRoute={setCurrentRoute} />
            ) : (
                <ImpactCalculator setCurrentRoute={setCurrentRoute} />
            )}
        </>
    );
}

export default App;

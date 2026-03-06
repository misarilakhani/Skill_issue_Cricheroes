import React, { useState } from 'react';
import { Landing } from './pages/Landing';
import { ImpactCalculator } from './pages/ImpactCalculator';

function App() {
    const [currentRoute, setCurrentRoute] = useState('landing');

    return (
        <>
            {currentRoute === 'landing' ? (
                <Landing setCurrentRoute={setCurrentRoute} />
            ) : (
                <ImpactCalculator setCurrentRoute={setCurrentRoute} />
            )}
        </>
    );
}

export default App;

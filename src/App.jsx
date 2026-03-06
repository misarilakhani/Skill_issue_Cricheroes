import React, { useState } from 'react';
import { Landing } from './pages/Landing';
import { ImpactCalculator } from './pages/ImpactCalculator';
import { Cursor } from './components/Cursor';

function App() {
    const [currentRoute, setCurrentRoute] = useState('landing');

    return (
        <>
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

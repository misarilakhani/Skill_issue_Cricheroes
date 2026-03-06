import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ParticleBackground } from '../components/ParticleBackground';

export function Landing({ setCurrentRoute }) {
    return (
        <div className="min-h-screen bg-darker text-slate-100 font-sans selection:bg-accent-primary/30 selection:text-white relative overflow-hidden">
            <ParticleBackground />
            <Navbar currentRoute="landing" setCurrentRoute={setCurrentRoute} />
            <Hero setCurrentRoute={setCurrentRoute} />
        </div>
    );
}

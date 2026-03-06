import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';

export function Landing({ setCurrentRoute }) {
    return (
        <div className="relative min-h-screen text-slate-100 font-sans overflow-hidden">
            <Navbar currentRoute="landing" setCurrentRoute={setCurrentRoute} />
            <Hero setCurrentRoute={setCurrentRoute} />
        </div>
    );
}

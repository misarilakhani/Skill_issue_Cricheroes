/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: '#0f172a',    // slate-900
                darker: '#020617',  // slate-950
                accent: {
                    teal: '#14b8a6',  // teal-500
                    purple: '#8b5cf6', // violet-500
                    pink: '#ec4899',   // pink-500
                    blue: '#3b82f6'    // blue-500
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s infinite',
            }
        },
    },
    plugins: [],
}

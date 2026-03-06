/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: '#0f172a',    // slate-900 (keeping for backwards compat if used)
                darker: '#0B0F1A',  // Updated Background to #0B0F1A
                card: '#1F2937',    // Added Cards #1F2937
                accent: {
                    teal: '#14b8a6',  // teal-500
                    purple: '#8b5cf6', // violet-500
                    pink: '#ec4899',   // pink-500
                    blue: '#3b82f6',    // blue-500
                    primary: '#4F46E5', // Primary accent #4F46E5
                    secondary: '#06B6D4' // Secondary accent #06B6D4
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

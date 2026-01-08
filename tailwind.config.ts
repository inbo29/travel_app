import type { Config } from 'tailwindcss'

export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: {
                    dark: '#0B1120',   // Deep Navy/Slate
                    light: '#F8F9FA'   // Nature Warm Grey
                },
                card: {
                    dark: 'rgba(255, 255, 255, 0.05)',
                    light: 'rgba(255, 255, 255, 0.7)'
                },
                text: {
                    dark: '#FFFFFF',
                    light: '#0F172A'   // slate-900
                },
                sub: {
                    dark: '#94A3B8',   // slate-400
                    light: '#475569'   // slate-600
                },
                accent: '#22C55E'
            }
        }
    },
    plugins: []
} satisfies Config

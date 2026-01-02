import type { Config } from 'tailwindcss'

export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: {
                    dark: '#020617',   // slate-950
                    light: '#F8FAFC'   // slate-50
                },
                card: {
                    dark: '#020617',
                    light: '#FFFFFF'
                },
                text: {
                    dark: '#E5E7EB',
                    light: '#020617'
                },
                sub: {
                    dark: '#94A3B8',
                    light: '#475569'
                },
                accent: '#22C55E'
            }
        }
    },
    plugins: []
} satisfies Config

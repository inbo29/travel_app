
import { useTheme } from '@/context/ThemeContext'

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full
        bg-white/10 hover:bg-white/20
        backdrop-blur-md border border-white/10
        flex items-center justify-center
        transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? '🌙' : '☀️'}
        </button>
    )
}

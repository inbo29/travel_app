import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useI18n } from '@/hooks/useI18n'

import { useState } from 'react'
import { SearchModal } from './SearchModal'

export default function Header() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    return (
        <header className="relative w-full z-50 h-16 bg-white/70 dark:bg-bg-dark/50 backdrop-blur-xl border-b border-black/[0.03] dark:border-white/[0.03] transition-all duration-300">
            <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between gap-4">
                {/* Left: Logo */}
                <div
                    onClick={() => navigate('/home')}
                    className="flex items-center gap-2 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <span className="font-bold text-2xl tracking-tighter text-slate-900 dark:text-white">
                        Trap
                    </span>
                </div>

                {/* Center: Search (PC/Mobile unified but responsive) */}
                {/* Center: Search Icon (Click to verify) */}
                <div className="flex-1 flex justify-end md:justify-center">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="p-3 text-slate-400 hover:text-accent hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all group lg:w-full lg:max-w-xl lg:bg-black/[0.03] lg:dark:bg-white/[0.05] lg:rounded-2xl lg:px-4 lg:py-2.5 lg:flex lg:items-center lg:gap-3 lg:hover:text-slate-400 lg:hover:bg-black/[0.05] lg:dark:hover:bg-white/[0.1]"
                    >
                        <svg className="w-6 h-6 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="hidden lg:block text-sm font-medium text-slate-400 dark:text-white/40">
                            {t('header.searchPlaceholder')}
                        </span>
                    </button>
                    <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <LanguageSwitcher />
                    <ThemeToggle />

                    <button className="hidden sm:flex p-2.5 text-slate-600 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors relative">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-white dark:border-bg-dark" />
                    </button>

                    <button className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/10 overflow-hidden ring-2 ring-transparent hover:ring-accent/50 transition-all group p-0.5">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover rounded-[10px]" />
                    </button>
                </div>
            </div>
        </header>
    )
}

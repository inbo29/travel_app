import { useNavigate, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useI18n } from '@/hooks/useI18n'
import { useAuthStore } from '@/stores/authStore'

import { useState, useEffect } from 'react'
import { SearchModal } from './SearchModal'

export default function Header() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // Auth state
    const { isAuthenticated, user, logout } = useAuthStore()

    const isHome = location.pathname === '/home' || location.pathname === '/'

    // Check scroll for transparency
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1)
        } else {
            navigate('/home')
        }
    }

    const isAuthPage = ['/login', '/signup'].includes(location.pathname)

    // Dynamic classes based on scroll and page
    const containerClasses = isScrolled
        ? "bg-white/70 dark:bg-black/60 backdrop-blur-xl border-b border-black/[0.03] dark:border-white/[0.03]"
        : "bg-transparent border-transparent"

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${containerClasses}`}>
            <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between gap-4">
                {/* Left Area: Always Logo */}
                <div className="flex items-center gap-2 shrink-0 min-w-[100px]">
                    <div
                        onClick={() => navigate('/home')}
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <span className={`font-bold text-2xl tracking-tighter ${isScrolled || !isHome ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                            Moril
                        </span>
                    </div>
                </div>

                {/* Center Area: Spacer only */}
                <div className="flex-1" />


                {/* Right Area: Actions */}
                <div className="flex items-center gap-2 md:gap-3 shrink-0">

                    {/* Back Button (only not home) */}
                    {!isHome && (
                        <button
                            onClick={handleBack}
                            className="w-9 h-9 flex items-center justify-center rounded-xl
                       bg-black/5 dark:bg-white/10
                       text-slate-900 dark:text-white
                       hover:bg-black/10 dark:hover:bg-white/20
                       transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {!isAuthPage && (
                        <>
                            {/* Search Button */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="w-9 h-9 flex items-center justify-center
                        text-slate-500 dark:text-white/70
                        hover:text-accent
                        hover:bg-black/5 dark:hover:bg-white/10
                        rounded-xl transition-all group"
                            >
                                <svg
                                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>

                            <SearchModal
                                isOpen={isSearchOpen}
                                onClose={() => setIsSearchOpen(false)}
                            />
                        </>
                    )}

                    <LanguageSwitcher />
                    <ThemeToggle />

                    {/* Auth-dependent UI */}
                    {isAuthenticated ? (
                        <>
                            {/* Notification Bell */}
                            <button className="hidden sm:flex p-2 text-slate-600 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors relative">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11
                     a6.002 6.002 0 00-4-5.659V5
                     a2 2 0 10-4 0v.341
                     C7.67 6.165 6 8.388 6 11v3.159
                     c0 .538-.214 1.055-.595 1.436L4 17h5
                     m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white dark:border-bg-dark" />
                            </button>

                            {/* Profile Avatar */}
                            <button
                                onClick={() => navigate('/profile')}
                                className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/10 overflow-hidden
                    ring-2 ring-transparent hover:ring-accent/50 transition-all p-0.5"
                            >
                                <img
                                    src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-[10px]"
                                />
                            </button>
                        </>
                    ) : (
                        /* Login Button (when logged out, hide on auth pages) */
                        !isAuthPage && (
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90 transition-colors"
                            >
                                {t('auth.login')}
                            </button>
                        )
                    )}
                </div>


            </div>
        </header>
    )
}


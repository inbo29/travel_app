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

    const { isAuthenticated, user } = useAuthStore()

    const isHome = location.pathname === '/' || location.pathname === '/home'
    const isAuthPage = ['/login', '/signup'].includes(location.pathname)

    /* ✅ Scroll detection */
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleBack = () => {
        if (window.history.length > 2) navigate(-1)
        else navigate('/home')
    }

    /* ✅ 핵심: 헤더 상태 판별 */
    const isHeroTop = isHome && !isScrolled

    const headerBgClass = isHeroTop
        ? 'bg-black/10 backdrop-blur-md border-transparent'
        : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10'

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${headerBgClass}`}
        >
            <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between gap-4">
                {/* Left: Logo */}
                <div
                    onClick={() => navigate('/home')}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <span className="font-bold text-2xl tracking-tighter text-slate-900 dark:text-white">
                        Moril
                    </span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Back button */}
                    {!isHome && (
                        <button
                            onClick={handleBack}
                            className="w-9 h-9 flex items-center justify-center rounded-xl
              bg-black/5 dark:bg-white/10
              text-slate-900 dark:text-white
              hover:bg-black/10 dark:hover:bg-white/20 transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {!isAuthPage && (
                        <>
                            {/* Search */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="w-9 h-9 flex items-center justify-center
                text-slate-500 dark:text-white/70
                hover:text-accent hover:bg-black/5 dark:hover:bg-white/10
                rounded-xl transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>

                            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
                        </>
                    )}

                    <LanguageSwitcher />
                    <ThemeToggle />

                    {isAuthenticated ? (
                        /* Hide profile on specific service pages to focus on MY tab access only */
                        !['/market-rates', '/tickets', '/insurance', '/accommodation', '/travel', '/guides'].some(path => location.pathname.startsWith(path)) && (
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
                        )
                    ) : (
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

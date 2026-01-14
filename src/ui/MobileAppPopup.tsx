import { useState, useEffect } from 'react'
import { useI18n } from '@/hooks/useI18n'

const STORAGE_KEY = 'moril-app-popup-dismissed'

export default function MobileAppPopup() {
    const { t } = useI18n()
    const [isVisible, setIsVisible] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            const mobile = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
            setIsMobile(mobile)
        }
        checkMobile()

        // Check if already dismissed
        const dismissed = localStorage.getItem(STORAGE_KEY)
        if (!dismissed && isMobile) {
            // Show after a delay
            const timer = setTimeout(() => setIsVisible(true), 2000)
            return () => clearTimeout(timer)
        }
    }, [isMobile])

    const handleDismiss = () => {
        setIsVisible(false)
        localStorage.setItem(STORAGE_KEY, 'true')
    }

    const handleOpenApp = () => {
        // In a real app, this would deep link to the native app
        window.location.href = 'moril://open'
    }

    if (!isMobile || !isVisible) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
                onClick={handleDismiss}
            />

            {/* Bottom Sheet Popup */}
            <div className="fixed bottom-0 left-0 right-0 z-[201] animate-slide-up">
                <div className="bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl p-6 pb-8 safe-area-bottom">
                    {/* Close Button */}
                    <button
                        onClick={handleDismiss}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Content */}
                    <div className="flex items-center gap-4 mb-6">
                        {/* App Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-emerald-500 flex items-center justify-center shadow-lg">
                            <span className="text-white text-2xl font-bold">M</span>
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                {t('appPopup.tagline')}
                            </p>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {t('appPopup.title')}
                            </h3>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleOpenApp}
                            className="w-full py-4 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-colors"
                        >
                            {t('appPopup.openApp')}
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="w-full py-3 text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-slate-700 dark:hover:text-white transition-colors"
                        >
                            {t('appPopup.continueWeb')}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slide-up {
                    from {
                        transform: translateY(100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out forwards;
                }
                .safe-area-bottom {
                    padding-bottom: max(2rem, env(safe-area-inset-bottom));
                }
            `}</style>
        </>
    )
}

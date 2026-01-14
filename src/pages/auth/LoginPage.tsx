import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import { useAuthStore } from '@/stores/authStore'
import { glassClasses } from '@/styles/glass'
import { useRandomBackground } from '@/hooks/useRandomBackground'
import Header from '@/ui/Header'

export default function LoginPage() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showSocialPopup, setShowSocialPopup] = useState(false)
    const [socialProvider, setSocialProvider] = useState('')

    const bgImage = useRandomBackground()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        setTimeout(() => {
            if (email && password) {
                login({
                    id: '1',
                    email,
                    name: email.split('@')[0],
                })
                navigate('/home')
            } else {
                setError(t('auth.error.invalidCredentials'))
            }
            setLoading(false)
        }, 1000)
    }

    const handleSocialLogin = (provider: string) => {
        setSocialProvider(provider)
        setShowSocialPopup(true)
    }

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300 relative">
            {/* Global Header */}
            <Header />

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {bgImage && (
                    <img
                        key={bgImage}
                        src={bgImage}
                        alt="Background"
                        className="w-full h-full object-cover animate-fade-in"
                    />
                )}
                {/* Blur Overlay - slightly heavier than before for text readability */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-6 pt-20">
                <div className="w-full max-w-md">
                    <div className={`${glassClasses} rounded-3xl p-8 border border-slate-200/50 dark:border-white/10 shadow-2xl animate-fade-in-up`}>
                        {/* Logo */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Moril</h1>
                            <p className="text-slate-500 dark:text-white/60 text-sm">{t('auth.loginSubtitle')}</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-slate-700 dark:text-white/80 text-sm font-medium mb-2">
                                    {t('auth.email')}
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t('auth.emailPlaceholder')}
                                        className="w-full px-4 py-3.5 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                                    />
                                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-slate-700 dark:text-white/80 text-sm font-medium mb-2">
                                    {t('auth.password')}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder={t('auth.passwordPlaceholder')}
                                        className="w-full px-4 py-3.5 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-slate-300 dark:border-white/30 bg-slate-100 dark:bg-white/10 text-accent focus:ring-accent/50"
                                    />
                                    <span className="text-slate-600 dark:text-white/70 text-sm">{t('auth.rememberMe')}</span>
                                </label>
                                <button type="button" className="text-accent text-sm font-medium hover:underline">
                                    {t('auth.forgotPassword')}
                                </button>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="p-3 bg-red-100 dark:bg-red-500/20 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-200 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                ) : (
                                    t('auth.login')
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-slate-200 dark:bg-white/20" />
                            <span className="text-slate-400 dark:text-white/50 text-sm">{t('auth.or')}</span>
                            <div className="flex-1 h-px bg-slate-200 dark:bg-white/20" />
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => handleSocialLogin('Google')}
                                className="py-3 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-200 dark:hover:bg-white/20 transition-colors flex items-center justify-center"
                            >
                                <span className="text-lg font-bold text-slate-600 dark:text-white">G</span>
                            </button>
                            <button
                                onClick={() => handleSocialLogin('Apple')}
                                className="py-3 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-200 dark:hover:bg-white/20 transition-colors flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 text-slate-600 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleSocialLogin('Kakao')}
                                className="py-3 bg-[#FEE500] border border-[#FEE500] rounded-xl hover:bg-[#FEE500]/80 transition-colors flex items-center justify-center"
                            >
                                <span className="text-xl">💬</span>
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center mt-6">
                            <span className="text-slate-500 dark:text-white/60 text-sm">{t('auth.noAccount')}</span>
                            <button
                                onClick={() => navigate('/signup')}
                                className="text-accent font-semibold text-sm ml-1 hover:underline"
                            >
                                {t('auth.signUp')}
                            </button>
                        </div>

                        {/* Copyright */}
                        <p className="text-center text-slate-400 dark:text-white/30 text-xs mt-6">
                            © {new Date().getFullYear()} Moril. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Social Login Popup */}
            {showSocialPopup && (
                <>
                    <div
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowSocialPopup(false)}
                    />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-sm">
                        <div className={`${glassClasses} rounded-2xl p-6 border border-slate-200 dark:border-white/10 text-center`}>
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                {t('auth.socialNotReady')}
                            </h3>
                            <p className="text-slate-500 dark:text-white/60 text-sm mb-6">
                                {t('auth.socialNotReadyDesc', { provider: socialProvider })}
                            </p>
                            <button
                                onClick={() => setShowSocialPopup(false)}
                                className="w-full py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-colors"
                            >
                                {t('common.confirm')}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import { useAuthStore } from '@/stores/authStore'
import { LanguageSwitcher } from '@/ui'

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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Simulate login - replace with actual API call
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
        // Placeholder for social login
        console.log(`Social login with ${provider}`)
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/90 via-purple-600/80 to-indigo-700/90" />
                <div className="absolute inset-0 bg-[url('/nature/nt2.png')] bg-cover bg-center opacity-20" />
            </div>

            {/* Top Bar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl">
                    <LanguageSwitcher />
                </div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                        {/* Logo */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Moril</h1>
                            <p className="text-white/70 text-sm">{t('auth.loginSubtitle')}</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    {t('auth.email')}
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t('auth.emailPlaceholder')}
                                        className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                                    />
                                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    {t('auth.password')}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder={t('auth.passwordPlaceholder')}
                                        className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
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
                                        className="w-4 h-4 rounded border-white/30 bg-white/10 text-accent focus:ring-accent/50"
                                    />
                                    <span className="text-white/70 text-sm">{t('auth.rememberMe')}</span>
                                </label>
                                <button type="button" className="text-white/70 text-sm hover:text-white transition-colors">
                                    {t('auth.forgotPassword')}
                                </button>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm text-center">
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
                            <div className="flex-1 h-px bg-white/20" />
                            <span className="text-white/50 text-sm">{t('auth.or')}</span>
                            <div className="flex-1 h-px bg-white/20" />
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => handleSocialLogin('google')}
                                className="py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleSocialLogin('apple')}
                                className="py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleSocialLogin('kakao')}
                                className="py-3 bg-[#FEE500]/90 border border-[#FEE500] rounded-xl hover:bg-[#FEE500] transition-colors flex items-center justify-center"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#3C1E1E">
                                    <path d="M12 3c-5.5 0-10 3.58-10 8 0 2.84 1.88 5.33 4.7 6.73-.15.55-.96 3.5-.99 3.73 0 0-.02.17.09.24.11.06.24.01.24.01.31-.04 3.65-2.39 4.23-2.79.55.08 1.13.13 1.73.13 5.5 0 10-3.58 10-8s-4.5-8-10-8z" />
                                </svg>
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center mt-6">
                            <span className="text-white/60 text-sm">{t('auth.noAccount')}</span>
                            <button
                                onClick={() => navigate('/signup')}
                                className="text-white font-semibold text-sm ml-1 hover:underline"
                            >
                                {t('auth.signUp')}
                            </button>
                        </div>

                        {/* Copyright */}
                        <p className="text-center text-white/30 text-xs mt-6">
                            © {new Date().getFullYear()} Moril. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

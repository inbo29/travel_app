import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import { LanguageSwitcher } from '@/ui'

const COUNTRIES = [
    { code: 'KR', name: '대한민국', flag: '🇰🇷' },
    { code: 'MN', name: 'Mongolia', flag: '🇲🇳' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'JP', name: '日本', flag: '🇯🇵' },
    { code: 'CN', name: '中国', flag: '🇨🇳' },
]

export default function SignupPage() {
    const { t } = useI18n()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [country, setCountry] = useState('')
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [agreePrivacy, setAgreePrivacy] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError(t('auth.error.passwordMismatch'))
            return
        }

        if (!agreeTerms || !agreePrivacy) {
            setError(t('auth.error.agreeRequired'))
            return
        }

        setLoading(true)

        // Simulate signup - replace with actual API call
        setTimeout(() => {
            navigate('/login')
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 via-teal-500/80 to-accent/90" />
                <div className="absolute inset-0 bg-[url('/nature/nt3.png')] bg-cover bg-center opacity-20" />
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

            {/* Signup Card */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-6 py-20">
                <div className="w-full max-w-md">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                        {/* Logo */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Moril</h1>
                            <p className="text-white/70 text-sm">{t('auth.signupSubtitle')}</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSignup} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    {t('auth.email')}
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('auth.emailPlaceholder')}
                                    required
                                    className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    {t('auth.password')}
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={t('auth.passwordPlaceholder')}
                                    required
                                    className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    {t('auth.confirmPassword')}
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder={t('auth.confirmPasswordPlaceholder')}
                                    required
                                    className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    {t('auth.country')}
                                </label>
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                    className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all appearance-none"
                                >
                                    <option value="" className="text-slate-900">{t('auth.selectCountry')}</option>
                                    {COUNTRIES.map((c) => (
                                        <option key={c.code} value={c.code} className="text-slate-900">
                                            {c.flag} {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Terms */}
                            <div className="space-y-3 pt-2">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        className="w-5 h-5 mt-0.5 rounded border-white/30 bg-white/10 text-accent focus:ring-accent/50"
                                    />
                                    <span className="text-white/70 text-sm leading-relaxed">
                                        {t('auth.agreeTerms')}{' '}
                                        <a href="#" className="text-white underline">{t('footer.terms')}</a>
                                    </span>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={agreePrivacy}
                                        onChange={(e) => setAgreePrivacy(e.target.checked)}
                                        className="w-5 h-5 mt-0.5 rounded border-white/30 bg-white/10 text-accent focus:ring-accent/50"
                                    />
                                    <span className="text-white/70 text-sm leading-relaxed">
                                        {t('auth.agreePrivacy')}{' '}
                                        <a href="#" className="text-white underline">{t('footer.privacy')}</a>
                                    </span>
                                </label>
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
                                className="w-full py-4 bg-white text-accent font-bold rounded-xl hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
                            >
                                {loading ? (
                                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                ) : (
                                    t('auth.createAccount')
                                )}
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="text-center mt-6">
                            <span className="text-white/60 text-sm">{t('auth.hasAccount')}</span>
                            <button
                                onClick={() => navigate('/login')}
                                className="text-white font-semibold text-sm ml-1 hover:underline"
                            >
                                {t('auth.login')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

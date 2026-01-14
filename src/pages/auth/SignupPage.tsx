import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import { useAuthStore } from '@/stores/authStore'
import { glassClasses } from '@/styles/glass'
import { useRandomBackground } from '@/hooks/useRandomBackground'
import Header from '@/ui/Header'

type Step = 'email' | 'verify' | 'password' | 'complete'

export default function SignupPage() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)

    const [step, setStep] = useState<Step>('email')
    const [email, setEmail] = useState('')
    const [verifyCode, setVerifyCode] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [sentCode, setSentCode] = useState('')

    const bgImage = useRandomBackground()

    const handleSendCode = () => {
        if (!email.includes('@')) {
            setError(t('auth.error.invalidEmail'))
            return
        }
        setLoading(true)
        // Mock: Generate random 6-digit code
        const mockCode = Math.random().toString().slice(2, 8)
        setSentCode(mockCode)
        console.log('Verification code:', mockCode) // For testing
        setTimeout(() => {
            setLoading(false)
            setStep('verify')
            setError('')
        }, 1000)
    }

    const handleVerifyCode = () => {
        if (verifyCode !== sentCode) {
            setError(t('auth.error.invalidCode'))
            return
        }
        setError('')
        setStep('password')
    }

    const handleCreateAccount = () => {
        if (password.length < 6) {
            setError(t('auth.error.passwordTooShort'))
            return
        }
        if (password !== confirmPassword) {
            setError(t('auth.error.passwordMismatch'))
            return
        }
        if (!agreeTerms) {
            setError(t('auth.error.agreeRequired'))
            return
        }

        setLoading(true)
        setTimeout(() => {
            login({
                id: Date.now().toString(),
                email,
                name: email.split('@')[0],
            })
            setStep('complete')
            setLoading(false)
        }, 1000)
    }

    const handleBackStep = () => {
        if (step === 'verify') setStep('email')
        else if (step === 'password') setStep('verify')
        else if (step === 'email') navigate(-1) // Should be handled by Header, but just in case
    }

    const renderStep = () => {
        switch (step) {
            case 'email':
                return (
                    <>
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('auth.signup.enterEmail')}</h2>
                            <p className="text-slate-500 dark:text-white/60 text-sm mt-2">{t('auth.signup.emailDesc')}</p>
                        </div>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('auth.emailPlaceholder')}
                            className="w-full px-4 py-3.5 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 mb-4"
                        />

                        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                        <button
                            onClick={handleSendCode}
                            disabled={loading || !email}
                            className="w-full py-4 bg-accent text-white font-bold rounded-xl disabled:opacity-50 transition-all"
                        >
                            {loading ? t('common.loading') : t('auth.signup.sendCode')}
                        </button>
                    </>
                )

            case 'verify':
                return (
                    <>
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('auth.signup.verifyEmail')}</h2>
                            <p className="text-slate-500 dark:text-white/60 text-sm mt-2">
                                {t('auth.signup.codeSentTo')} <span className="text-accent font-medium">{email}</span>
                            </p>
                        </div>

                        <input
                            type="text"
                            value={verifyCode}
                            onChange={(e) => setVerifyCode(e.target.value)}
                            placeholder={t('auth.signup.enterCode')}
                            maxLength={6}
                            className="w-full px-4 py-3.5 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-center text-2xl tracking-[0.5em] placeholder:text-slate-400 placeholder:tracking-normal placeholder:text-base focus:outline-none focus:ring-2 focus:ring-accent/50 mb-4"
                        />

                        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                        <button
                            onClick={handleVerifyCode}
                            disabled={verifyCode.length < 6}
                            className="w-full py-4 bg-accent text-white font-bold rounded-xl disabled:opacity-50 transition-all mb-3"
                        >
                            {t('auth.signup.verify')}
                        </button>

                        <button
                            onClick={handleSendCode}
                            className="w-full py-3 text-slate-500 dark:text-white/60 text-sm hover:text-accent transition-colors"
                        >
                            {t('auth.signup.resendCode')}
                        </button>
                    </>
                )

            case 'password':
                return (
                    <>
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('auth.signup.setPassword')}</h2>
                            <p className="text-slate-500 dark:text-white/60 text-sm mt-2">{t('auth.signup.passwordDesc')}</p>
                        </div>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t('auth.passwordPlaceholder')}
                            className="w-full px-4 py-3.5 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 mb-3"
                        />

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder={t('auth.confirmPasswordPlaceholder')}
                            className="w-full px-4 py-3.5 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 mb-4"
                        />

                        <label className="flex items-start gap-3 cursor-pointer mb-4">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="w-5 h-5 mt-0.5 rounded border-slate-300 dark:border-white/30 bg-slate-100 dark:bg-white/10 text-accent focus:ring-accent/50"
                            />
                            <span className="text-slate-600 dark:text-white/70 text-sm leading-relaxed">
                                {t('auth.agreeTerms')} 및 {t('auth.agreePrivacy')}
                            </span>
                        </label>

                        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                        <button
                            onClick={handleCreateAccount}
                            disabled={loading}
                            className="w-full py-4 bg-accent text-white font-bold rounded-xl disabled:opacity-50 transition-all"
                        >
                            {loading ? t('common.loading') : t('auth.createAccount')}
                        </button>
                    </>
                )

            case 'complete':
                return (
                    <>
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('auth.signup.welcome')}</h2>
                            <p className="text-slate-500 dark:text-white/60 mb-8">{t('auth.signup.welcomeDesc')}</p>

                            <button
                                onClick={() => navigate('/home')}
                                className="w-full py-4 bg-accent text-white font-bold rounded-xl transition-all"
                            >
                                {t('auth.signup.goToHome')}
                            </button>
                        </div>
                    </>
                )
        }
    }

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300 relative">
            {/* Global Header */}
            <Header />

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {bgImage && (
                    <img
                        src={bgImage}
                        alt="Background"
                        className="w-full h-full object-cover transition-opacity duration-1000"
                    />
                )}
                {/* Blur Overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]" />
            </div>

            {/* Step Indicator */}
            {step !== 'complete' && (
                <div className="relative z-10 flex items-center justify-center gap-2 pt-20 pb-4">
                    {['email', 'verify', 'password'].map((s, idx) => (
                        <div key={s} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step === s ? 'bg-accent text-white' :
                                ['email', 'verify', 'password'].indexOf(step) > idx ? 'bg-emerald-500 text-white' :
                                    'bg-slate-200 dark:bg-white/10 text-slate-400'
                                }`}>
                                {['email', 'verify', 'password'].indexOf(step) > idx ? '✓' : idx + 1}
                            </div>
                            {idx < 2 && (
                                <div className={`w-8 h-0.5 transition-colors ${['email', 'verify', 'password'].indexOf(step) > idx ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Card */}
            <div className="relative z-10 flex items-center justify-center px-6 py-4">
                <div className="w-full max-w-md">
                    <div className={`${glassClasses} rounded-3xl p-8 border border-slate-200/50 dark:border-white/10 shadow-2xl animate-fade-in-up relative`}>
                        {/* Step Back Button */}
                        {step !== 'email' && step !== 'complete' && (
                            <button
                                onClick={handleBackStep}
                                className="absolute top-8 left-8 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}

                        {/* Logo */}
                        <div className="text-center mb-4">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Moril</h1>
                        </div>

                        {renderStep()}

                        {/* Login Link */}
                        {step === 'email' && (
                            <div className="text-center mt-6">
                                <span className="text-slate-500 dark:text-white/60 text-sm">{t('auth.hasAccount')}</span>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-accent font-semibold text-sm ml-1 hover:underline"
                                >
                                    {t('auth.login')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

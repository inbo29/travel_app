import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import { useAuthStore } from '@/stores/authStore'
import { ThemeToggle } from '@/ui'
import { glassClasses } from '@/styles/glass'

export default function MyPage() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const { user, isAuthenticated, logout } = useAuthStore()

    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // Settings state (mock)
    const [locationSharing, setLocationSharing] = useState(true)
    const [notifications, setNotifications] = useState(true)
    const [marketingNotifications, setMarketingNotifications] = useState(false)

    // SOS Contacts (mock)
    const [sosContacts, setSosContacts] = useState([
        { id: 1, name: '김철수', phone: '010-1234-5678' },
    ])

    const handleLogout = () => {
        logout()
        navigate('/home')
    }

    const handleDeleteAccount = () => {
        logout()
        navigate('/home')
    }

    const activityCards = [
        { key: 'taxi', icon: '🚕', label: 'mypage.activity.taxi', path: '/taxi/history', count: 5 },
        { key: 'payment', icon: '💳', label: 'mypage.activity.payment', path: '/exchange', count: 12 },
        { key: 'tickets', icon: '🎫', label: 'mypage.activity.tickets', path: '/tickets/my', count: 3 },
        { key: 'log', icon: '📔', label: 'mypage.activity.log', path: '/travel-log', count: 2 },
        { key: 'guides', icon: '🧭', label: 'mypage.activity.guides', path: '/guides', count: 1 },
    ]

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className={`${glassClasses} rounded-3xl p-8 max-w-sm text-center`}>
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('mypage.loginRequired')}</h2>
                    <p className="text-slate-500 dark:text-white/60 text-sm mb-6">{t('mypage.loginRequiredDesc')}</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full py-4 bg-accent text-white font-bold rounded-xl"
                    >
                        {t('auth.login')}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 bg-pattern-dark opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

            <main className="relative z-10 pt-20 md:pt-24 max-w-7xl mx-auto px-4 md:px-6 pb-32">
                <div className="max-w-3xl mx-auto space-y-10 animate-fade-in">
                    {/* Profile Header */}
                    <header className="flex flex-col items-center text-center space-y-6">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-accent to-emerald-500 flex items-center justify-center shadow-2xl shadow-accent/30 ring-4 ring-white dark:ring-white/5 group-hover:scale-105 transition-transform duration-500">
                                <span className="text-5xl text-white font-black drop-shadow-lg">
                                    {user?.name?.charAt(0).toUpperCase() || 'M'}
                                </span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 dark:border-white/10 text-xl cursor-not-allowed">
                                📷
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{user?.name}</h1>
                            <p className="text-slate-500 dark:text-white/40 font-bold uppercase text-[10px] tracking-widest">{user?.email}</p>
                        </div>
                    </header>

                    {/* Quick Stats / Achievements (Optional, but looks premium) */}
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: 'Level', value: '7', icon: '⭐' },
                            { label: 'Credits', value: '1.2k', icon: '💰' },
                            { label: 'Badges', value: '4', icon: '🏅' }
                        ].map((stat, idx) => (
                            <div key={idx} className={`${glassClasses} p-4 rounded-3xl text-center border border-white/20 dark:border-white/5 bg-white/50 dark:bg-white/5`}>
                                <div className="text-xl mb-1">{stat.icon}</div>
                                <div className="font-black text-slate-900 dark:text-white">{stat.value}</div>
                                <div className="text-[10px] text-slate-400 font-bold uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8">
                        {/* ========== ACTIVITY ========== */}
                        <section className="space-y-4">
                            <h3 className="px-2 text-xs font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em]">
                                {t('mypage.activity.title')}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {activityCards.map((card) => (
                                    <button
                                        key={card.key}
                                        onClick={() => navigate(card.path)}
                                        className={`${glassClasses} p-6 bg-white/70 dark:bg-white/5 rounded-[2rem] border border-white/20 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 text-left hover:scale-[1.05] active:scale-[0.98] group relative overflow-hidden`}
                                    >
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full -mr-10 -mt-10 blur-xl group-hover:bg-accent/10 transition-colors" />
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-3xl group-hover:scale-110 transition-transform duration-500">{card.icon}</span>
                                            <span className="text-[10px] px-2 py-1 bg-accent/10 text-accent rounded-full font-black ring-1 ring-accent/20">{card.count}</span>
                                        </div>
                                        <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">{t(card.label)}</p>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* ========== SETTINGS ========== */}
                        <section className="space-y-4">
                            <h3 className="px-2 text-xs font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em]">
                                {t('mypage.settings.title')}
                            </h3>
                            <div className={`${glassClasses} rounded-[2.5rem] bg-white/70 dark:bg-white/5 border border-white/20 dark:border-white/5 overflow-hidden shadow-2xl shadow-black/5`}>
                                {/* Theme */}
                                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xl shadow-sm">🌓</div>
                                        <span className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wider">{t('mypage.settings.theme')}</span>
                                    </div>
                                    <ThemeToggle />
                                </div>

                                {/* Location Sharing */}
                                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xl shadow-sm">📍</div>
                                        <span className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wider">{t('mypage.settings.location')}</span>
                                    </div>
                                    <button
                                        onClick={() => setLocationSharing(!locationSharing)}
                                        className={`w-14 h-8 rounded-full transition-all duration-300 relative border-2 ${locationSharing ? 'bg-accent border-accent shadow-lg shadow-accent/20' : 'bg-slate-200 dark:bg-white/10 border-transparent'}`}
                                    >
                                        <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-xl transition-all duration-300 ${locationSharing ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>

                                {/* Notifications */}
                                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xl shadow-sm">🔔</div>
                                        <span className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wider">{t('mypage.settings.notifications')}</span>
                                    </div>
                                    <button
                                        onClick={() => setNotifications(!notifications)}
                                        className={`w-14 h-8 rounded-full transition-all duration-300 relative border-2 ${notifications ? 'bg-accent border-accent shadow-lg shadow-accent/20' : 'bg-slate-200 dark:bg-white/10 border-transparent'}`}
                                    >
                                        <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-xl transition-all duration-300 ${notifications ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>

                                {/* Marketing */}
                                <div className="flex items-center justify-between p-6 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xl shadow-sm">📣</div>
                                        <span className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wider">{t('mypage.settings.marketing')}</span>
                                    </div>
                                    <button
                                        onClick={() => setMarketingNotifications(!marketingNotifications)}
                                        className={`w-14 h-8 rounded-full transition-all duration-300 relative border-2 ${marketingNotifications ? 'bg-accent border-accent shadow-lg shadow-accent/20' : 'bg-slate-200 dark:bg-white/10 border-transparent'}`}
                                    >
                                        <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-xl transition-all duration-300 ${marketingNotifications ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* ========== SOS CONTACTS ========== */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-xs font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em]">
                                    {t('mypage.sos.title')}
                                </h3>
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${locationSharing ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20' : 'bg-slate-100 text-slate-400 dark:bg-white/5 border border-slate-200 dark:border-white/10'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${locationSharing ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                    {locationSharing ? t('mypage.sos.locationOn') : t('mypage.sos.locationOff')}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {sosContacts.map((contact) => (
                                    <div key={contact.id} className={`${glassClasses} flex items-center justify-between p-5 bg-white/50 dark:bg-white/5 rounded-3xl border border-white/20 dark:border-white/5 group`}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xl shadow-sm">👤</div>
                                            <div>
                                                <p className="font-black text-slate-900 dark:text-white text-sm tracking-tight">{contact.name}</p>
                                                <p className="text-xs text-slate-500 dark:text-white/40 font-bold uppercase tracking-widest mt-0.5">{contact.phone}</p>
                                            </div>
                                        </div>
                                        <button className="w-10 h-10 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 flex items-center justify-center transition-colors">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                <button className="w-full py-5 border-2 border-dashed border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/30 rounded-3xl hover:border-accent hover:text-accent hover:bg-accent/5 transition-all flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest">
                                    <span className="text-xl">+</span> {t('mypage.sos.addContact')}
                                </button>
                            </div>
                        </section>

                        {/* ========== LOGOUT ========== */}
                        <div className="pt-8 space-y-4">
                            <button
                                onClick={() => setShowLogoutModal(true)}
                                className="w-full py-5 text-slate-400 dark:text-white/30 font-black text-xs uppercase tracking-[0.2em] hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 rounded-[1.5rem] transition-all hover:bg-slate-50 dark:hover:bg-white/5 active:scale-95"
                            >
                                {t('mypage.logout')}
                            </button>

                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="w-full py-4 text-red-500/40 hover:text-red-500 font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">⚠️</span>
                                {t('mypage.profile.deleteAccount')}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Logout Modal */}
            {showLogoutModal && (
                <>
                    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md animate-fade-in" onClick={() => setShowLogoutModal(false)} />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-sm animate-fade-in-up">
                        <div className={`${glassClasses} rounded-[2.5rem] p-10 border border-white/20 dark:border-white/10 text-center space-y-8 bg-white dark:bg-slate-900`}>
                            <div className="w-20 h-20 rounded-[2rem] bg-slate-100 dark:bg-white/5 flex items-center justify-center text-4xl mx-auto shadow-inner ring-1 ring-slate-200 dark:ring-white/10">
                                👋
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('mypage.logoutConfirm')}</h3>
                                <p className="text-slate-500 dark:text-white/40 font-medium text-sm px-4">{t('mypage.logoutConfirmDesc')}</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-4 bg-red-500 text-white rounded-2xl font-black shadow-xl shadow-red-500/20 active:scale-95 transition-all hover:bg-red-600"
                                >
                                    {t('mypage.logout')}
                                </button>
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    className="w-full py-4 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/60 rounded-2xl font-black text-sm uppercase tracking-widest active:scale-95 transition-all hover:bg-slate-200 dark:hover:bg-white/20"
                                >
                                    {t('common.cancel')}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Delete Account Modal */}
            {showDeleteModal && (
                <>
                    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md animate-fade-in" onClick={() => setShowDeleteModal(false)} />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-sm animate-fade-in-up">
                        <div className={`${glassClasses} rounded-[2.5rem] p-10 border border-white/20 dark:border-white/10 text-center space-y-8 bg-white dark:bg-slate-900`}>
                            <div className="w-20 h-20 rounded-[2rem] bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-4xl mx-auto ring-1 ring-red-100 dark:ring-red-500/20 shadow-inner">
                                ⚠️
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('mypage.deleteConfirm')}</h3>
                                <p className="text-slate-500 dark:text-white/40 font-medium text-sm px-4">{t('mypage.deleteConfirmDesc')}</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleDeleteAccount}
                                    className="w-full py-4 bg-red-500 text-white rounded-2xl font-black shadow-xl shadow-red-500/20 active:scale-95 transition-all hover:bg-red-600"
                                >
                                    {t('mypage.profile.deleteAccount')}
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="w-full py-4 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/60 rounded-2xl font-black text-sm uppercase tracking-widest active:scale-95 transition-all hover:bg-slate-200 dark:hover:bg-white/20"
                                >
                                    {t('common.cancel')}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

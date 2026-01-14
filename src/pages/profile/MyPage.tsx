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
        <div className="pb-32">
            {/* Header */}
            <div className="px-6 py-8 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/20">
                    <span className="text-4xl text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase() || 'M'}
                    </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name}</h1>
                <p className="text-slate-500 dark:text-white/60 text-sm">{user?.email}</p>
            </div>

            <div className="max-w-2xl mx-auto px-6 space-y-6">
                {/* ========== SETTINGS ========== */}
                <section className={`${glassClasses} rounded-2xl p-5`}>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-4">
                        {t('mypage.settings.title')}
                    </h3>

                    {/* Theme */}
                    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-white/10">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">🌓</span>
                            <span className="text-slate-900 dark:text-white font-medium">{t('mypage.settings.theme')}</span>
                        </div>
                        <ThemeToggle />
                    </div>

                    {/* Location Sharing */}
                    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-white/10">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">📍</span>
                            <span className="text-slate-900 dark:text-white font-medium">{t('mypage.settings.location')}</span>
                        </div>
                        <button
                            onClick={() => setLocationSharing(!locationSharing)}
                            className={`w-12 h-7 rounded-full transition-colors relative ${locationSharing ? 'bg-accent' : 'bg-slate-300 dark:bg-white/20'}`}
                        >
                            <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${locationSharing ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>

                    {/* Notifications */}
                    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-white/10">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">🔔</span>
                            <span className="text-slate-900 dark:text-white font-medium">{t('mypage.settings.notifications')}</span>
                        </div>
                        <button
                            onClick={() => setNotifications(!notifications)}
                            className={`w-12 h-7 rounded-full transition-colors relative ${notifications ? 'bg-accent' : 'bg-slate-300 dark:bg-white/20'}`}
                        >
                            <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${notifications ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">📣</span>
                            <span className="text-slate-900 dark:text-white font-medium">{t('mypage.settings.marketing')}</span>
                        </div>
                        <button
                            onClick={() => setMarketingNotifications(!marketingNotifications)}
                            className={`w-12 h-7 rounded-full transition-colors relative ${marketingNotifications ? 'bg-accent' : 'bg-slate-300 dark:bg-white/20'}`}
                        >
                            <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${marketingNotifications ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>
                </section>

                {/* ========== PROFILE ========== */}
                <section className={`${glassClasses} rounded-2xl p-5`}>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-4">
                        {t('mypage.profile.title')}
                    </h3>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between py-2">
                            <span className="text-slate-600 dark:text-white/70">{t('mypage.profile.email')}</span>
                            <span className="text-slate-900 dark:text-white font-medium">{user?.email}</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-slate-600 dark:text-white/70">{t('mypage.profile.joinMethod')}</span>
                            <span className="text-slate-900 dark:text-white font-medium">Email</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full mt-4 py-3 text-red-500 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                        {t('mypage.profile.deleteAccount')}
                    </button>
                </section>

                {/* ========== SOS CONTACTS ========== */}
                <section className={`${glassClasses} rounded-2xl p-5`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider">
                            {t('mypage.sos.title')}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${locationSharing ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-white/10'}`}>
                            {locationSharing ? t('mypage.sos.locationOn') : t('mypage.sos.locationOff')}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {sosContacts.map((contact) => (
                            <div key={contact.id} className="flex items-center justify-between py-3 px-4 bg-slate-50 dark:bg-white/5 rounded-xl">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">{contact.name}</p>
                                    <p className="text-sm text-slate-500 dark:text-white/60">{contact.phone}</p>
                                </div>
                                <button className="text-red-500 text-sm">
                                    {t('common.delete')}
                                </button>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-4 py-3 border-2 border-dashed border-slate-200 dark:border-white/20 text-slate-500 dark:text-white/60 rounded-xl hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2">
                        <span>+</span> {t('mypage.sos.addContact')}
                    </button>
                </section>

                {/* ========== ACTIVITY ========== */}
                <section className={`${glassClasses} rounded-2xl p-5`}>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-4">
                        {t('mypage.activity.title')}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {activityCards.map((card) => (
                            <button
                                key={card.key}
                                onClick={() => navigate(card.path)}
                                className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-left"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl">{card.icon}</span>
                                    <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full font-bold">{card.count}</span>
                                </div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">{t(card.label)}</p>
                            </button>
                        ))}
                    </div>
                </section>

                {/* ========== LOGOUT ========== */}
                <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full py-4 text-slate-500 dark:text-white/60 font-medium hover:text-slate-700 dark:hover:text-white border border-slate-200 dark:border-white/10 rounded-xl transition-colors"
                >
                    {t('mypage.logout')}
                </button>
            </div>

            {/* Logout Modal */}
            {showLogoutModal && (
                <>
                    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-sm">
                        <div className={`${glassClasses} rounded-2xl p-6 border border-slate-200 dark:border-white/10 text-center`}>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t('mypage.logoutConfirm')}</h3>
                            <p className="text-slate-500 dark:text-white/60 text-sm mb-6">{t('mypage.logoutConfirmDesc')}</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    className="flex-1 py-3 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white rounded-xl font-medium"
                                >
                                    {t('common.cancel')}
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium"
                                >
                                    {t('mypage.logout')}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Delete Account Modal */}
            {showDeleteModal && (
                <>
                    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-sm">
                        <div className={`${glassClasses} rounded-2xl p-6 border border-slate-200 dark:border-white/10 text-center`}>
                            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t('mypage.deleteConfirm')}</h3>
                            <p className="text-slate-500 dark:text-white/60 text-sm mb-6">{t('mypage.deleteConfirmDesc')}</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 py-3 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white rounded-xl font-medium"
                                >
                                    {t('common.cancel')}
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium"
                                >
                                    {t('mypage.profile.deleteAccount')}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

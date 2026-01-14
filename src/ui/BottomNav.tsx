import { NavLink } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'

interface BottomNavProps {
    onCategoryClick?: () => void
}

const tabs = [
    { to: '#category', key: 'category', isAction: true },
    { to: '/map', key: 'map' },
    { to: '/home', key: 'home', isCenter: true },
    { to: '/exchange', key: 'payme' },
    { to: '/profile', key: 'my' }
]

// Icons for each tab
const TabIcon = ({ tabKey, isActive }: { tabKey: string; isActive: boolean }) => {
    const iconClass = `w-5 h-5 ${isActive ? 'text-accent' : 'text-current'}`

    switch (tabKey) {
        case 'category':
            return (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            )
        case 'map':
            return (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
            )
        case 'home':
            return (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        case 'payme':
            return (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            )
        case 'my':
            return (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        default:
            return null
    }
}

export default function BottomNav({ onCategoryClick }: BottomNavProps) {
    const { t } = useI18n()

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-lg bg-white/70 dark:bg-bg-dark/50 backdrop-blur-xl border border-black/[0.03] dark:border-white/[0.03] rounded-3xl shadow-2xl shadow-black/10">
            <ul className="flex justify-around items-center py-2 px-2">
                {tabs.map(tab => (
                    <li key={tab.key} className="flex-1">
                        {tab.isAction ? (
                            <button
                                onClick={onCategoryClick}
                                className="w-full flex flex-col items-center gap-1 transition-all duration-300 text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70 py-1"
                            >
                                <TabIcon tabKey={tab.key} isActive={false} />
                                <span className="text-[10px] font-bold tracking-tighter uppercase">{t(`nav.${tab.key}`)}</span>
                            </button>
                        ) : (
                            <NavLink
                                to={tab.to}
                                className={({ isActive }) =>
                                    `flex flex-col items-center gap-1 transition-all duration-300 py-1 ${tab.isCenter && isActive
                                        ? 'text-accent scale-110'
                                        : isActive
                                            ? 'text-accent'
                                            : 'text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <TabIcon tabKey={tab.key} isActive={isActive} />
                                        <span className="text-[10px] font-bold tracking-tighter uppercase">{t(`nav.${tab.key}`)}</span>
                                        {isActive && tab.isCenter && <div className="w-1.5 h-1.5 rounded-full bg-accent mt-0.5" />}
                                    </>
                                )}
                            </NavLink>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

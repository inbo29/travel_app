import { NavLink } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'

const tabs = [
    { to: '/home', key: 'home' },
    { to: '/translator', key: 'translate' },
    { to: '/map', key: 'map' },
    { to: '/exchange', key: 'payme' },
    { to: '/profile', key: 'my' }
]

export default function BottomNav() {
    const { t } = useI18n()

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-lg bg-white/70 dark:bg-bg-dark/50 backdrop-blur-xl border border-black/[0.03] dark:border-white/[0.03] rounded-3xl shadow-2xl shadow-black/10">
            <ul className="flex justify-around items-center py-3 px-2">
                {tabs.map(tab => (
                    <li key={tab.to} className="flex-1">
                        <NavLink
                            to={tab.to}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-accent scale-110' : 'text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span className="text-[10px] font-bold tracking-tighter uppercase">{t(`nav.${tab.key}`)}</span>
                                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-accent mt-0.5" />}
                                </>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

import { NavLink } from 'react-router-dom'

const tabs = [
    { to: '/home', label: 'Home' },
    { to: '/translator', label: 'Translate' },
    { to: '/map', label: 'Map' },
    { to: '/exchange', label: 'Exchange' },
    { to: '/profile', label: 'My' }
]

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-t border-white/10 md:hidden">
            <ul className="flex justify-around py-3">
                {tabs.map(tab => (
                    <li key={tab.to}>
                        <NavLink
                            to={tab.to}
                            className={({ isActive }) =>
                                `text-xs flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-accent font-bold drop-shadow-sm' : 'text-white/60 hover:text-white'
                                }`
                            }
                        >
                            <div className={`w-1 h-1 rounded-full mb-1 ${({ isActive }: any) => isActive ? 'bg-accent' : 'bg-transparent'}`} />
                            {tab.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

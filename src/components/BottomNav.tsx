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
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 md:hidden">
            <ul className="flex justify-around py-2">
                {tabs.map(tab => (
                    <li key={tab.to}>
                        <NavLink
                            to={tab.to}
                            className={({ isActive }) =>
                                `text-xs ${isActive ? 'text-accent font-semibold' : 'text-slate-400'
                                }`
                            }
                        >
                            {tab.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

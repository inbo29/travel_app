import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
            <Header />
            <main>
                <Outlet />
            </main>
            <BottomNav />
        </div>
    )
}

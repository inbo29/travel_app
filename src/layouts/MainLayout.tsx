import { Outlet } from 'react-router-dom'
import { Header, BottomNav } from '@/ui'
import { useTaxiSimulator } from '@/hooks/useTaxiSimulator'

export default function MainLayout() {
    useTaxiSimulator()

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

import { Outlet } from 'react-router-dom'
import Header from '@/ui/Header'
import BottomNav from '@/ui/BottomNav'
import { TaxiFloatingIndicator } from '@/components/TaxiFloatingIndicator'

/**
 * DefaultLayout - For pages WITHOUT map
 * Header + Main Content + BottomNav
 * No map interference
 */
export default function DefaultLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-bg-dark dark:to-bg-dark">
            {/* Fixed Header */}
            <Header />

            {/* Main Content */}
            <main className="relative z-10 min-h-screen">
                <Outlet />
            </main>

            {/* Fixed Bottom Nav */}
            <BottomNav />

            {/* Global Taxi Indicator */}
            <TaxiFloatingIndicator />
        </div>
    )
}

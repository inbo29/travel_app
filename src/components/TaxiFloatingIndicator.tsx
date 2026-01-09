import { useNavigate, useLocation } from 'react-router-dom'
import { useTaxiStore } from '@/store/taxiStore'

/**
 * Floating indicator shown when taxi ride is active
 * but user is on a non-taxi page
 */
export function TaxiFloatingIndicator() {
    const navigate = useNavigate()
    const location = useLocation()
    const { ride } = useTaxiStore()

    // Don't show if no active ride or if on taxi pages
    const isOnTaxiPage = location.pathname.startsWith('/taxi')

    // Active statuses that should show the indicator
    const inactiveStatuses = ['IDLE', 'CANCELLED']
    const hasActiveRide = ride && !inactiveStatuses.includes(ride.status)

    if (!hasActiveRide || isOnTaxiPage) return null

    const statusTextMap: Record<string, string> = {
        SEARCHING: '🔍 Finding driver...',
        MATCHED: '✅ Driver matched!',
        MATCH_ACCEPTED: '🚗 Driver accepted',
        DRIVER_ARRIVING: '🚗 Driver on the way',
        IN_RIDE: '🚕 Ride in progress',
        PAYING: '💳 Payment pending',
    }
    const statusText = statusTextMap[ride.status] || '🚕 Taxi Active'

    return (
        <button
            onClick={() => navigate('/taxi/ride')}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-accent text-white font-bold rounded-full shadow-2xl shadow-accent/30 flex items-center gap-3 animate-pulse hover:scale-105 transition-transform"
        >
            <span>{statusText}</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Tap to view</span>
        </button>
    )
}

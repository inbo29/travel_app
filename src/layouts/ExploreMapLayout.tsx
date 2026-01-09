import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/ui/Header'
import BottomNav from '@/ui/BottomNav'
import { ExploreMap } from '@/infra/map/explore'
import { TaxiFloatingIndicator } from '@/components/TaxiFloatingIndicator'
import { POI, SafetyZone } from '@/infra/map/types'

// Mock POI data
const MOCK_POIS: POI[] = [
    { id: 'p1', name: 'Modern Nomads', category: 'restaurant', lat: 47.9200, lng: 106.9180, rating: 4.8, icon: '🍽️' },
    { id: 'p2', name: 'Cafe Amsterdam', category: 'cafe', lat: 47.9175, lng: 106.9220, rating: 4.5, icon: '☕' },
    { id: 'p3', name: 'National Museum', category: 'museum', lat: 47.9210, lng: 106.9150, rating: 4.9, icon: '🏛️' },
    { id: 'p4', name: 'Sukhbaatar Square', category: 'attraction', lat: 47.9186, lng: 106.9170, rating: 4.7, icon: '📍' },
]

const MOCK_SAFETY: SafetyZone[] = [
    { id: 's1', name: 'US Embassy', type: 'embassy', lat: 47.9230, lng: 106.9100, icon: '🏛️' },
    { id: 's2', name: 'Central Hospital', type: 'hospital', lat: 47.9150, lng: 106.9250, radius: 200, icon: '🏥' },
]

/**
 * ExploreMapLayout - For POI/explore pages
 * Map as background (z-index: 1)
 * Header/Nav overlay (z-index: 50)
 */
export default function ExploreMapLayout() {
    const [center] = useState({ lat: 47.9186, lng: 106.9170 })
    const [selectedPOI, setSelectedPOI] = useState<POI | null>(null)

    return (
        <div className="fixed inset-0 overflow-hidden">
            {/* Map Background - z-index: 1 */}
            <div className="absolute inset-0 z-[1]">
                <ExploreMap
                    center={center}
                    pois={MOCK_POIS}
                    safetyZones={MOCK_SAFETY}
                    onPOISelect={setSelectedPOI}
                />
            </div>

            {/* Header Overlay - z-index: 50 */}
            <div className="fixed top-0 left-0 right-0 z-50 pointer-events-auto">
                <Header />
            </div>

            {/* Content Overlay - z-index: 30 */}
            <div className="fixed bottom-24 left-0 right-0 z-30 px-4 pointer-events-none">
                <div className="pointer-events-auto max-w-md mx-auto">
                    <Outlet context={{ selectedPOI, setSelectedPOI }} />
                </div>
            </div>

            {/* Bottom Nav Overlay - z-index: 50 */}
            <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-auto">
                <BottomNav />
            </div>

            {/* Global Taxi Indicator */}
            <TaxiFloatingIndicator />
        </div>
    )
}

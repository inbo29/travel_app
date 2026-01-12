import { create } from 'zustand'
import { POI, SafetyZone } from '@/infra/map/types'

// Expanded Mock Data
export const MOCK_POIS: POI[] = [
    { id: 'p1', name: 'Modern Nomads', category: 'restaurant', lat: 47.9200, lng: 106.9180, rating: 4.8, icon: '🍽️', address: 'Baga Toiruu, Sukhbaatar District' },
    { id: 'p2', name: 'Cafe Amsterdam', category: 'cafe', lat: 47.9175, lng: 106.9220, rating: 4.5, icon: '☕', address: 'Peace Avenue' },
    { id: 'p3', name: 'National Museum', category: 'museum', lat: 47.9210, lng: 106.9150, rating: 4.9, icon: '🏛️', address: 'Juulchin Street' },
    { id: 'p4', name: 'Sukhbaatar Square', category: 'attraction', lat: 47.9186, lng: 106.9170, rating: 4.7, icon: '📍', address: 'Central Square' },
    { id: 'p5', name: 'Shangri-La Hotel', category: 'hotel', lat: 47.9155, lng: 106.9190, rating: 4.9, icon: '🏨', address: 'Olympic Street' },
    { id: 'p6', name: 'Black Burger', category: 'restaurant', lat: 47.9195, lng: 106.9250, rating: 4.6, icon: '🍔', address: 'Seoul Street' },
    { id: 'p7', name: 'State Department Store', category: 'shopping', lat: 47.9160, lng: 106.9080, rating: 4.7, icon: '🛍️', address: 'Peace Avenue' },
]

export const MOCK_SAFETY: SafetyZone[] = [
    { id: 's1', name: 'US Embassy', type: 'embassy', lat: 47.9230, lng: 106.9100, icon: '🏛️' },
    { id: 's2', name: 'Central Hospital', type: 'hospital', lat: 47.9150, lng: 106.9250, radius: 200, icon: '🏥' },
    // Danger Zone
    { id: 'd1', name: 'Theft Prone Area', type: 'danger', lat: 47.9120, lng: 106.9050, radius: 300, icon: '⚠️' }
]

export type Category = 'all' | 'restaurant' | 'cafe' | 'hotel' | 'attraction' | 'shopping' | 'museum'

interface ExploreMapState {
    searchQuery: string
    activeCategory: Category
    selectedPOI: POI | null
    showDangerZones: boolean

    // Actions
    setSearchQuery: (query: string) => void
    setCategory: (category: Category) => void
    selectPOI: (poi: POI | null) => void
    toggleDangerZones: (show: boolean) => void

    // Selectors
    getFilteredPOIs: () => POI[]
    getSafetyZones: () => SafetyZone[]
}

export const useExploreMapStore = create<ExploreMapState>((set, get) => ({
    searchQuery: '',
    activeCategory: 'all',
    selectedPOI: null,
    showDangerZones: false,

    setSearchQuery: (query) => set({ searchQuery: query }),
    setCategory: (category) => set({ activeCategory: category }),
    selectPOI: (poi) => set({ selectedPOI: poi }),
    toggleDangerZones: (show) => set({ showDangerZones: show }),

    getFilteredPOIs: () => {
        const { searchQuery, activeCategory } = get()
        return MOCK_POIS.filter(poi => {
            const matchesCategory = activeCategory === 'all' || poi.category === activeCategory
            const matchesSearch = poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                poi.category.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesCategory && matchesSearch
        })
    },

    getSafetyZones: () => {
        const { showDangerZones } = get()
        if (showDangerZones) return MOCK_SAFETY
        // Filter out danger zones if toggle is off
        return MOCK_SAFETY.filter(z => z.type !== 'danger')
    }
}))

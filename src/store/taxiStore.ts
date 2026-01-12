import { create } from 'zustand'
import { TaxiRide, TaxiStatus } from '@/types/taxi'
import { TaxiScenario } from '@/mocks/taxi/scenarios'

interface TaxiStore {
    ride: TaxiRide | null
    scenario: TaxiScenario | null
    history: TaxiRide[]

    searchOrigin: { lat: number; lng: number; name: string } | null
    searchDestination: { lat: number; lng: number; name: string } | null

    // Actions
    setRide: (ride: TaxiRide | null) => void
    setStatus: (status: TaxiStatus) => void
    setScenario: (scenario: TaxiScenario) => void
    updateRideProgress: (data: Partial<TaxiRide>) => void
    addToHistory: (ride: TaxiRide) => void
    setSearchOrigin: (origin: { lat: number; lng: number; name: string } | null) => void
    setSearchDestination: (destination: { lat: number; lng: number; name: string } | null) => void
    reset: () => void
}

export const useTaxiStore = create<TaxiStore>((set) => ({
    ride: null,
    scenario: null,
    history: [],
    searchOrigin: { name: 'Gobi Hotel (Current)', lat: 47.9186, lng: 106.9170 }, // Default
    searchDestination: null,

    setRide: (ride) => set({ ride }),

    setStatus: (status) =>
        set((state) => ({
            ride: state.ride ? { ...state.ride, status } : null,
        })),

    setScenario: (scenario) => set({ scenario }),

    updateRideProgress: (data) =>
        set((state) => ({
            ride: state.ride ? { ...state.ride, ...data } : null,
        })),

    addToHistory: (ride) => set((state) => ({ history: [ride, ...state.history] })),

    setSearchOrigin: (searchOrigin) => set({ searchOrigin }),
    setSearchDestination: (searchDestination) => set({ searchDestination }),

    reset: () => set({ ride: null, scenario: null, searchDestination: null }),
}))

import { create } from 'zustand'
import { TaxiRide, TaxiStatus } from '@/types/taxi'
import { TaxiScenario } from '@/mocks/taxi/scenarios'

interface TaxiStore {
    ride: TaxiRide | null
    scenario: TaxiScenario | null

    // Actions
    setRide: (ride: TaxiRide | null) => void
    setStatus: (status: TaxiStatus) => void
    setScenario: (scenario: TaxiScenario) => void
    updateRideProgress: (data: Partial<TaxiRide>) => void
    reset: () => void
}

export const useTaxiStore = create<TaxiStore>((set) => ({
    ride: null,
    scenario: null,

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

    reset: () => set({ ride: null, scenario: null }),
}))

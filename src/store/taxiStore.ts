import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type RideStatus = 'IDLE' | 'REQUESTED' | 'DRIVER_FOUND' | 'DRIVER_ARRIVING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

interface Driver {
    name: string
    photo: string
    car: string
    plate: string
    rating: number
    eta: number
}

interface RideState {
    status: RideStatus
    origin: string
    destination: string
    vehicleType: 'standard' | 'comfort'
    driver: Driver | null
    fare: number
    distance: number
    duration: number
    history: any[]
}

interface TaxiActions {
    setStatus: (status: RideStatus) => void
    setRideInfo: (info: Partial<RideState>) => void
    resetRide: () => void
    addHistory: (ride: any) => void
}

export const useTaxiStore = create<RideState & TaxiActions>()(
    persist(
        (set) => ({
            status: 'IDLE',
            origin: '',
            destination: '',
            vehicleType: 'standard',
            driver: null,
            fare: 0,
            distance: 0,
            duration: 0,
            history: [],

            setStatus: (status) => set({ status }),
            setRideInfo: (info) => set((state) => ({ ...state, ...info })),
            resetRide: () => set({
                status: 'IDLE',
                origin: '',
                destination: '',
                driver: null,
                fare: 0,
                distance: 0,
                duration: 0
            }),
            addHistory: (ride) => set((state) => ({ history: [ride, ...state.history] }))
        }),
        {
            name: 'taxi-storage',
        }
    )
)

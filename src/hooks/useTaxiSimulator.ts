import { useEffect, useRef } from 'react'
import { useTaxiStore } from '@/store/taxiStore'
import { log } from '@/utils/mockUtils'
import { mockDriver } from '@/mocks/taxi/taxi.mock'

export const useTaxiSimulator = () => {
    const { ride, setStatus, updateRideProgress } = useTaxiStore()
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const rideRef = useRef(ride)
    rideRef.current = ride

    // State Transition Logic
    useEffect(() => {
        if (!ride) return

        let timeout: NodeJS.Timeout

        log('TAXI_SIMULATOR', `Current Status: ${ride.status}`)

        if (ride.status === 'SEARCHING') {
            // Simulate finding a driver
            timeout = setTimeout(() => {
                updateRideProgress({
                    status: 'MATCHED',
                    driver: mockDriver,
                    estimatedFare: 15500
                })
            }, 3000)
        } else if (ride.status === 'MATCHED') {
            timeout = setTimeout(() => {
                setStatus('DRIVER_ARRIVING')
            }, 2000)
        } else if (ride.status === 'DRIVER_ARRIVING') {
            timeout = setTimeout(() => {
                setStatus('IN_RIDE')
            }, 2500)
        } else if (ride.status === 'IN_RIDE') {
            // Start ride simulation
            intervalRef.current = setInterval(() => {
                const currentRide = rideRef.current
                if (!currentRide) return

                updateRideProgress({
                    distanceKm: Number((currentRide.distanceKm + 0.1).toFixed(2)),
                    durationMin: currentRide.durationMin + 1,
                    currentFare: Math.floor(currentRide.currentFare + 150),
                })
            }, 1000)

            // Auto complete after 8 seconds (mock ride)
            timeout = setTimeout(() => {
                if (intervalRef.current) clearInterval(intervalRef.current)
                setStatus('COMPLETED')
            }, 8000)
        }

        return () => {
            if (timeout) clearTimeout(timeout)
            if (intervalRef.current && ride.status !== 'IN_RIDE') {
                clearInterval(intervalRef.current)
            }
        }
    }, [ride?.status])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])
}

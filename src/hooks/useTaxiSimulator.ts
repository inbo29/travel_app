import { useRef, useEffect } from 'react'
import { useTaxiStore } from '@/store/taxiStore'
import { log } from '@/utils/mockUtils'
import { mockDriver } from '@/mocks/taxi/taxi.mock'
import { fetchRoute } from '@/services/map.service'
import { calculateDistance } from '@/utils/mapUtils'

export const useTaxiSimulator = () => {
    // Use granular selectors to avoid unnecessary re-renders
    const status = useTaxiStore(s => s.ride?.status)
    const ride = useTaxiStore(s => s.ride)
    const updateRideProgress = useTaxiStore(s => s.updateRideProgress)
    const setStatus = useTaxiStore(s => s.setStatus)

    // Refs to hold mutable state for intervals without triggering re-renders
    const rideRef = useRef(ride)
    rideRef.current = ride

    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Cleanup helper
    const clearSimulator = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    // Effect: Status Change Handler
    useEffect(() => {
        if (!status) return

        log('TAXI_SIMULATOR', `Status Changed: ${status}`)

        // Always clear previous intervals on status change
        clearSimulator()

        let timeout: NodeJS.Timeout

        if (status === 'SEARCHING') {
            // Find a driver after 3s
            timeout = setTimeout(() => {
                // Ensure we are still searching
                if (rideRef.current?.status !== 'SEARCHING') return

                const origin = rideRef.current?.origin
                if (!origin) return

                const mockDriverLoc = { lat: origin.lat + 0.005, lng: origin.lng + 0.005 }
                updateRideProgress({
                    status: 'MATCHED',
                    driver: mockDriver,
                    estimatedFare: 15500,
                    driverLocation: mockDriverLoc
                })
            }, 3000)
        }
        else if (status === 'MATCH_ACCEPTED') {
            // Transition to Arriving after 1s
            timeout = setTimeout(() => {
                setStatus('DRIVER_ARRIVING')
            }, 1000)
        }
        else if (status === 'DRIVER_ARRIVING') {
            startDriverArrivingSimulation()
        }
        else if (status === 'IN_RIDE') {
            startRideSimulation()
        }

        return () => {
            if (timeout) clearTimeout(timeout)
            clearSimulator()
        }
    }, [status]) // Only re-run when status changes

    // Simulation: Driver Arriving
    const startDriverArrivingSimulation = () => {
        const currentRide = rideRef.current
        if (!currentRide || !currentRide.driverLocation || !currentRide.origin) return

        // Calculate route if missing
        if (!currentRide.routePath) {
            fetchRoute(currentRide.driverLocation, currentRide.origin).then(route => {
                updateRideProgress({ routePath: route, routeIndex: 0 })
            })
        }

        intervalRef.current = setInterval(() => {
            const rideState = rideRef.current
            if (!rideState || !rideState.routePath) return

            const speed = 5
            const nextIndex = (rideState.routeIndex || 0) + speed

            if (nextIndex >= rideState.routePath.length) {
                // Arrived
                clearSimulator()
                updateRideProgress({
                    status: 'IN_RIDE', // Must be confirmed by user? Or auto? Logic says auto-switch for simpler flow here implies 'Arrived' -> 'In Ride' or 'Arrived' -> 'Waiting' etc.
                    // User request implies seamless flow. Let's assume auto-switch to IN_RIDE for simulator simplicity
                    // BUT normally driver waits. Let's stick to previous logic: clear route, set IN_RIDE.
                    routePath: undefined,
                    routeIndex: 0,
                    currentLocation: rideState.routePath[rideState.routePath.length - 1]
                })
            } else {
                updateRideProgress({
                    driverLocation: rideState.routePath[nextIndex],
                    routeIndex: nextIndex
                })
            }
        }, 1000)
    }

    // Simulation: In Ride
    const startRideSimulation = () => {
        const currentRide = rideRef.current
        if (!currentRide || !currentRide.destination) return

        // Calculate route if missing
        if (!currentRide.routePath) {
            fetchRoute(currentRide.origin, currentRide.destination).then(route => {
                updateRideProgress({ routePath: route, routeIndex: 0 })
            })
        }

        intervalRef.current = setInterval(() => {
            const rideState = rideRef.current
            if (!rideState || !rideState.routePath) return

            const speed = 5 // Speed multiplier
            const nextIndex = (rideState.routeIndex || 0) + speed
            const isFinished = nextIndex >= rideState.routePath.length

            // Clamp index
            const safeIndex = Math.min(nextIndex, rideState.routePath.length - 1)
            const newPos = rideState.routePath[safeIndex]

            // Calculate distance/fare
            const segmentDist = calculateDistance(rideState.currentLocation || rideState.origin, newPos) || 0
            const newTotalDist = (rideState.distanceKm * 1000 + segmentDist) / 1000

            // Pricing logic
            const baseFare = 1500
            const addedFare = (newTotalDist * 1000) * 1
            const newFare = Math.floor(baseFare + addedFare)

            updateRideProgress({
                currentLocation: newPos,
                routeIndex: safeIndex,
                distanceKm: newTotalDist,
                currentFare: newFare,
                durationMin: rideState.durationMin + (1 / 60) * speed
            })

            if (isFinished) {
                clearSimulator()
                setStatus('COMPLETED')
            }
        }, 1000)
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => clearSimulator()
    }, [])
}

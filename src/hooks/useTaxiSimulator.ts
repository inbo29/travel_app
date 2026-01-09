import { useRef, useEffect } from 'react'
import { useTaxiStore } from '@/store/taxiStore'
import { log } from '@/utils/mockUtils'
import { mockDriver } from '@/mocks/taxi/taxi.mock'
import { fetchRoute } from '@/services/map.service'
import { calculateDistance } from '@/utils/mapUtils'

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
                const mockDriverLoc = { lat: ride.origin.lat + 0.005, lng: ride.origin.lng + 0.005 }
                updateRideProgress({
                    status: 'MATCHED',
                    driver: mockDriver,
                    estimatedFare: 15500,
                    driverLocation: mockDriverLoc
                })
            }, 3000)
        } else if (ride.status === 'MATCH_ACCEPTED') {
            timeout = setTimeout(() => {
                setStatus('DRIVER_ARRIVING')
            }, 1000)
        } else if (ride.status === 'DRIVER_ARRIVING') {
            // Simulate driver getting closer to user (Pickup)
            if (!ride.routePath) {
                fetchRoute(ride.driverLocation!, ride.origin).then(route => {
                    updateRideProgress({ routePath: route, routeIndex: 0 })
                })
            }

            intervalRef.current = setInterval(() => {
                const currentRide = rideRef.current
                if (!currentRide || !currentRide.routePath) return

                const currentIndex = currentRide.routeIndex || 0
                const speed = 10 // Arriving driver is faster for demo
                const nextIndex = Math.min(currentIndex + speed, currentRide.routePath.length - 1)
                const newPos = currentRide.routePath[nextIndex]
                const arrivedAtPickup = nextIndex >= currentRide.routePath.length - 1

                updateRideProgress({
                    driverLocation: newPos,
                    routeIndex: nextIndex
                })

                if (arrivedAtPickup) {
                    if (intervalRef.current) clearInterval(intervalRef.current)
                    // Clear intermediate route and start actual ride
                    updateRideProgress({
                        status: 'IN_RIDE',
                        routePath: undefined,
                        routeIndex: 0,
                        currentLocation: newPos
                    })
                }
            }, 1000)
        } else if (ride.status === 'IN_RIDE') {
            // Fetch real route if not present
            if (!ride.routePath) {
                fetchRoute(ride.origin, ride.destination!).then(route => {
                    updateRideProgress({ routePath: route, routeIndex: 0 })
                })
            }

            // Start simulation along the route
            intervalRef.current = setInterval(() => {
                const currentRide = rideRef.current
                if (!currentRide) return

                // If path is ready, move along it
                if (currentRide.routePath && currentRide.routePath.length > 0) {
                    const currentIndex = currentRide.routeIndex || 0
                    // Move faster than 1 point per tick if needed, or skip points.
                    // Let's assume 1 point per tick is okay for OSRM simplified geometry.
                    // If OSRM returns too many points, we might want to skip some.
                    // But for smooth animation, 1 point is good if we run interval fast.
                    // User said: setInterval 1000ms. OSRM points might be close.
                    // Let's increment by 3 points to simulate speed.

                    const speedMultiplier = 5
                    const nextIndex = Math.min(currentIndex + speedMultiplier, currentRide.routePath.length - 1)

                    const newPos = currentRide.routePath[nextIndex]
                    const isFinished = nextIndex >= currentRide.routePath.length - 1

                    // Calculate realistic distance segment
                    const segmentDist = calculateDistance(currentRide.currentLocation || currentRide.origin, newPos) || 0
                    const newTotalDist = (currentRide.distanceKm * 1000 + segmentDist) / 1000

                    // Realistic Pricing: 1500 Base + 1000/km (1 MNT per meter)
                    const baseFare = 1500
                    const addedFare = (newTotalDist * 1000) * 1
                    const newFare = Math.floor(baseFare + addedFare)

                    updateRideProgress({
                        currentLocation: newPos,
                        routeIndex: nextIndex,
                        distanceKm: newTotalDist,
                        currentFare: newFare,
                        durationMin: currentRide.durationMin + (1 / 60) * speedMultiplier
                    })

                    if (isFinished) {
                        // setStatus('COMPLETED') // Let user finish manually or show arrival modal
                        // But for now, we just stop the movement. 
                        // The UI should show "Arrived" and a [Complete] button or automatically trigger something.
                        // Based on request: "COMPLETED -> Custom Modal -> Payment"
                        // So we should transition to 'COMPLETED' here? 
                        // The request says: "Open Modal ('RIDE_COMPLETED')". 
                        // But we can keep setStatus('COMPLETED') and let the UI handle the modal open.

                        setStatus('COMPLETED')
                        if (intervalRef.current) clearInterval(intervalRef.current)
                    }
                }
            }, 1000)

            // Fallback timeout just in case
            timeout = setTimeout(() => {
                if (intervalRef.current) clearInterval(intervalRef.current)
                setStatus('COMPLETED')
            }, 120000) // Increase timeout to 120s for real route
        }

        return () => {
            if (timeout) clearTimeout(timeout)
            if (intervalRef.current) {
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

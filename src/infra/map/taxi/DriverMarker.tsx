import { Marker } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useState } from 'react'

// Driver car icon
const driverIcon = L.divIcon({
    className: 'driver-marker',
    html: `<div style="font-size: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4)); transform: rotate(-45deg);">🚗</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
})

interface DriverMarkerProps {
    lat: number
    lng: number
    rotation?: number // Heading in degrees
    animate?: boolean
}

export function DriverMarker({ lat, lng, rotation = 0, animate = true }: DriverMarkerProps) {
    const [position, setPosition] = useState({ lat, lng })

    useEffect(() => {
        if (!animate) {
            setPosition({ lat, lng })
            return
        }

        // Smooth animation to new position
        const startLat = position.lat
        const startLng = position.lng
        const duration = 1000
        const startTime = Date.now()

        const animatePosition = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic

            setPosition({
                lat: startLat + (lat - startLat) * eased,
                lng: startLng + (lng - startLng) * eased,
            })

            if (progress < 1) {
                requestAnimationFrame(animatePosition)
            }
        }

        requestAnimationFrame(animatePosition)
    }, [lat, lng])

    return (
        <Marker
            position={[position.lat, position.lng]}
            icon={driverIcon}
        />
    )
}

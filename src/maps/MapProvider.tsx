import React, { createContext, useContext, useState } from 'react'
import { MapState, LatLng } from './types'

type MapContextType = {
    state: MapState
    setOrigin: (p: LatLng) => void
    setDestination: (p: LatLng) => void
    setDriverPosition: (p: LatLng) => void
    setRoute: (r: LatLng[]) => void
    setCenter: (p: LatLng) => void
    setZoom: (z: number) => void
}

const MapContext = createContext<MapContextType | null>(null)

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<MapState>({
        center: { lat: 47.9186, lng: 106.9170 }, // Ulaanbaatar
        zoom: 13,
    })

    return (
        <MapContext.Provider
            value={{
                state,
                setOrigin: (origin) => setState(s => ({ ...s, origin })),
                setDestination: (destination) => setState(s => ({ ...s, destination })),
                setDriverPosition: (driverPosition) => setState(s => ({ ...s, driverPosition })),
                setRoute: (route) => setState(s => ({ ...s, route })),
                setCenter: (center) => setState(s => ({ ...s, center })),
                setZoom: (zoom) => setState(s => ({ ...s, zoom })),
            }}
        >
            {children}
        </MapContext.Provider>
    )
}

export const useMap = () => {
    const ctx = useContext(MapContext)
    if (!ctx) throw new Error('useMap must be used within MapProvider')
    return ctx
}

export type TaxiStatus =
    | 'IDLE'
    | 'SEARCHING'
    | 'MATCHED'
    | 'DRIVER_ARRIVING'
    | 'IN_RIDE'
    | 'COMPLETED'
    | 'CANCELLED'

export interface LatLng {
    lat: number
    lng: number
}

export interface Driver {
    id: string
    name: string
    rating: number
    carModel: string
    plateNumber: string
    avatar: string
    phoneNumber: string
}

export interface TaxiRide {
    id: string
    userId: string
    status: TaxiStatus
    origin: LatLng
    destination?: LatLng
    driver?: Driver
    // Trip details
    distanceKm: number
    durationMin: number
    currentFare: number
    estimatedFare: number
    startTime?: number
    endTime?: number
}

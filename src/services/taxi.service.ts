import { ENV } from '@/config/env'
import { baseRideMock, mockDriver } from '@/mocks/taxi/taxi.mock'
import { TaxiRide, LatLng } from '@/types/taxi'
import { delay, log } from '@/utils/mockUtils'

export const requestTaxi = async (origin: LatLng, destination: LatLng): Promise<TaxiRide> => {
    if (ENV.USE_MOCK) {
        log('TAXI_SERVICE', 'Requesting taxi...', { origin, destination })
        await delay(800)
        return {
            ...baseRideMock,
            origin,
            destination,
            status: 'SEARCHING',
            startTime: Date.now(),
        }
    }
    throw new Error('Real API not implemented')
}

export const matchDriver = async (currentRide: TaxiRide): Promise<TaxiRide> => {
    if (ENV.USE_MOCK) {
        log('TAXI_SERVICE', 'Driver found!')
        await delay(1200)
        return {
            ...currentRide,
            status: 'MATCHED',
            driver: mockDriver,
        }
    }
    throw new Error('Real API not implemented')
}

export const cancelRide = async (rideId: string): Promise<void> => {
    if (ENV.USE_MOCK) {
        log('TAXI_SERVICE', `Cancelling ride ${rideId}`)
        await delay(500)
        return
    }
}

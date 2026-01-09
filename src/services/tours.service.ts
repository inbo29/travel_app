import { ENV } from '@/config/env'
import { mockTours, TOUR_SCENARIOS, TourScenario } from '@/mocks/tours/tours.mock'
import { Tour } from '@/types/tour'
import { delay, log } from '@/utils/mockUtils'

export const getTours = async (): Promise<Tour[]> => {
    if (ENV.USE_MOCK) {
        log('TOURS_SERVICE', 'Fetching tours from mock...')
        await delay(500) // Simulate network delay

        // Force scenario logic if needed
        if (ENV.FORCE_SCENARIO === TOUR_SCENARIOS.FREE) {
            return mockTours.filter(t => t.price === 0)
        }

        return mockTours
    }

    // Actual API call would go here
    // const response = await api.get('/tours')
    // return response.data
    return []
}

export const getTourById = async (id: string): Promise<Tour | undefined> => {
    if (ENV.USE_MOCK) {
        log('TOURS_SERVICE', `Fetching tour detail for id: ${id}`)
        await delay(300)
        return mockTours.find(t => t.id === id)
    }
    return undefined
}

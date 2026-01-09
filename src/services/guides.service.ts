import { ENV } from '@/config/env'
import { mockGuides, GUIDE_SCENARIOS } from '@/mocks/guides/guides.mock'
import { Guide } from '@/types/guide'
import { delay, log } from '@/utils/mockUtils'

export const getGuides = async (): Promise<Guide[]> => {
    if (ENV.USE_MOCK) {
        log('GUIDES_SERVICE', 'Fetching guides from mock...')
        await delay(600)

        if (ENV.FORCE_SCENARIO === GUIDE_SCENARIOS.NEW) {
            return mockGuides.filter(g => g.rating === 0)
        }

        return mockGuides
    }
    return []
}

export const getGuideById = async (id: string): Promise<Guide | undefined> => {
    if (ENV.USE_MOCK) {
        log('GUIDES_SERVICE', `Fetching guide detail for id: ${id}`)
        await delay(300)
        return mockGuides.find(g => g.id === id)
    }
    return undefined
}

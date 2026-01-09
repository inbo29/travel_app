import { ENV } from '@/config/env'
import { marketRatesMock } from '@/mocks/market/market.mock'
import { delay } from '@/utils/mockUtils'
import { MarketRatesResponse } from '@/types/market'

export const getMarketRates = async (): Promise<MarketRatesResponse> => {
    if (ENV.USE_MOCK) {
        await delay(600) // Simulate network delay
        return marketRatesMock
    }
    // Future API call
    throw new Error('Real API not implemented')
}

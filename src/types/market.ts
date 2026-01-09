export type MarketCategory = 'transport' | 'food' | 'accommodation' | 'dailyGoods'

export interface MarketPrice {
    min: number
    max: number
    currency: 'MNT'
}

export interface MarketItem {
    id: string
    category: MarketCategory
    name: string
    priceRange: MarketPrice
    unit?: string // e.g. "per km", "per night", "per meal"
    lastUpdated: string // ISO date
    note?: string
}

export interface MarketRatesResponse {
    items: MarketItem[]
    meta: {
        source: string
        updatedAt: string
        location: string
    }
}

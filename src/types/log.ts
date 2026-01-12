export type LogType = 'taxi' | 'ticket' | 'payment' | 'place' | 'note'

export interface TimelineItem {
    id: string
    type: LogType
    source: 'auto' | 'user'
    timestamp: number
    title: string
    description?: string
    amount?: number
    currency?: string
    location?: { lat: number; lng: number; name: string }
    photos?: string[]
    metadata?: any
}

export interface DayLog {
    date: string // YYYY-MM-DD
    items: TimelineItem[]
}

export interface Journey {
    id: string
    title: string
    status: 'active' | 'completed' | 'planned'
    startDate: number
    endDate?: number
    coverImage: string
    origin?: { lat: number; lng: number; name: string }
    destination?: { lat: number; lng: number; name: string }
    totalDistance: number
    totalSpend: number
    days: DayLog[]
}

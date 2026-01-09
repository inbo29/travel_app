export interface Seat {
    id: string
    row: string
    col: string // 'A', 'B' etc
    number: number
    status: 'AVAILABLE' | 'OCCUPIED' | 'SELECTED'
    priceDetail?: number // Some seats might be more expensive
}

export interface DayAvailability {
    date: string
    status: 'AVAILABLE' | 'SOLD_OUT' | 'LIMITED'
    seatsLeft: number
    priceMultiplier: number // 1.0 = base, 1.2 = peak
}

export interface TicketAvailability {
    id: string
    dates: DayAvailability[]
    seats?: Seat[] // If seatMap is true
    allowRoundTrip: boolean
    durations?: { label: string; priceMultiplier: number }[] // For museums (1 day, 3 day)
}

// Helper to generate simplistic seats
const generateSeats = (rows: number, cols: number): Seat[] => {
    const seats: Seat[] = []
    const colLabels = ['A', 'B', 'C', 'D']
    for (let r = 1; r <= rows; r++) {
        for (let c = 0; c < cols; c++) {
            seats.push({
                id: `${r}-${colLabels[c]}`,
                row: r.toString(),
                col: colLabels[c],
                number: parseInt(`${r}${c}`), // simplistic unique num
                status: Math.random() > 0.7 ? 'OCCUPIED' : 'AVAILABLE'
            })
        }
    }
    return seats
}

export const AVAILABILITY_MOCK: Record<string, TicketAvailability> = {
    'event-001': { // Concert (Specific Date)
        id: 'event-001',
        dates: [
            { date: '2024-10-12', status: 'AVAILABLE', seatsLeft: 120, priceMultiplier: 1.0 }
        ],
        seats: generateSeats(10, 4),
        allowRoundTrip: false
    },
    'bus-001': { // Bus (Daily)
        id: 'bus-001',
        dates: Array.from({ length: 30 }).map((_, i) => ({
            date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
            status: Math.random() > 0.8 ? 'SOLD_OUT' : 'AVAILABLE',
            seatsLeft: Math.floor(Math.random() * 20),
            priceMultiplier: i % 7 > 4 ? 1.2 : 1.0 // Weekend surcharge
        })),
        seats: generateSeats(8, 4),
        allowRoundTrip: true
    },
    'museum-001': { // Museum (Period)
        id: 'museum-001',
        dates: Array.from({ length: 30 }).map((_, i) => ({
            date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
            status: 'AVAILABLE',
            seatsLeft: 999,
            priceMultiplier: 1.0
        })),
        allowRoundTrip: false,
        durations: [
            { label: '1 Day Pass', priceMultiplier: 1 },
            { label: '3 Day Pass', priceMultiplier: 1.8 } // Discounted
        ]
    }
}

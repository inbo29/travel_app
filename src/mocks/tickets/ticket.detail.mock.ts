export interface TicketDetailItem {
    id: string
    description: string
    included: string[]
    excluded: string[]
    schedule: { time: string; title: string }[]
    images: string[]
    seatMap: boolean
    highlights: string[]
    terms: string
}

export const TICKET_DETAILS: Record<string, TicketDetailItem> = {
    'event-001': {
        id: 'event-001',
        description: 'Experience the magic of music in the heart of the Redwood National Park. This annual festival brings together top indie and folk artists for a weekend of harmony with nature.',
        included: ['Festival Entry', 'Camping Spot', 'Welcome Drink', 'Shuttle from Parking'],
        excluded: ['Food & Beverages', 'Tent Rental', 'Merchandise'],
        schedule: [
            { time: '14:00', title: 'Gates Open' },
            { time: '16:00', title: 'Opening Act: The Whispers' },
            { time: '18:00', title: 'Main Support: Green Valley' },
            { time: '20:00', title: 'Headliner: Echoes of Nature' },
            { time: '23:00', title: 'Campfire Jam Session' }
        ],
        images: ['nature/nt1.png', 'nature/nt2.png'],
        seatMap: true,
        highlights: ['Open-air stage', 'Surrounded by giant redwoods', 'Eco-friendly event'],
        terms: 'Non-refundable within 48 hours. Rain or shine event.'
    },
    'bus-001': {
        id: 'bus-001',
        description: 'Comfortable intercity bus service from Ulaanbaatar to Darkhan. AC, reclining seats, and free Wi-Fi on board.',
        included: ['Seat', '1 Luggage (20kg)', 'Wi-Fi'],
        excluded: ['Meals', 'Hotel pickup'],
        schedule: [
            { time: '09:00', title: 'Departure from Dragon Terminal' },
            { time: '11:00', title: 'Rest Stop (Bornuur)' },
            { time: '13:00', title: 'Arrival at Darkhan Bus Station' }
        ],
        images: ['city/ct1.png'],
        seatMap: true,
        highlights: ['Fastest route', 'New fleet', 'Professional drivers'],
        terms: 'Show ticket 30 mins before departure.'
    },
    'museum-001': {
        id: 'museum-001',
        description: 'Explore the vast history of the Mongol Empire and its founder. The museum houses over 10,000 artifacts from the Bronze Age to the 20th century.',
        included: ['Museum Entry', 'Audio Guide (EN/KR/JP)', 'Locker Access'],
        excluded: ['Special Exhibitions', 'Guided Tour (Extra)', 'Photography Permit'],
        schedule: [
            { time: '10:00', title: 'Opening' },
            { time: '17:00', title: 'Last Admission' },
            { time: '18:00', title: 'Closing' }
        ],
        images: ['city/ct3.png', 'city/ct4.png'],
        seatMap: false,
        highlights: ['Golden Sutra', 'Imperial Seals', 'VR Experience'],
        terms: 'Valid for the selected date(s). Student ID required for discount.'
    }
}

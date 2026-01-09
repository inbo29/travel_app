export interface TicketListItem {
    id: string
    category: 'EVENT' | 'BUS' | 'TRAIN' | 'FLIGHT' | 'MUSEUM'
    title: string
    location: string
    priceFrom: number
    currency: string
    dateRange: string[] // '2024-10-12' or ['2024-10-01', '2024-10-30']
    searchable: string[]
    rating: number | null
    image: string
    trending: boolean
    tags: string[]
}

export const TICKET_LIST: TicketListItem[] = [
    // --- EVENTS ---
    {
        id: 'event-001',
        category: 'EVENT',
        title: 'Forest Music Festival 2024',
        location: 'Redwood National Park',
        priceFrom: 120,
        currency: 'USD',
        dateRange: ['2024-10-12'],
        searchable: ['music', 'festival', 'forest', 'concert', 'band'],
        rating: 4.8,
        image: '/img/nature/nt1.png',
        trending: true,
        tags: ['Music', 'Outdoor']
    },
    {
        id: 'event-002',
        category: 'EVENT',
        title: 'Summer Solstice Festival',
        location: 'Central Park, NY',
        priceFrom: 50,
        currency: 'USD',
        dateRange: ['2024-06-21'],
        searchable: ['summer', 'solstice', 'party', 'park', 'new york'],
        rating: 4.5,
        image: '/img/nature/nt2.png',
        trending: true,
        tags: ['Festival', 'Summer']
    },

    // --- BUS ---
    {
        id: 'bus-001',
        category: 'BUS',
        title: 'Ulaanbaatar → Darkhan',
        location: 'Dragon Terminal',
        priceFrom: 12,
        currency: 'USD',
        dateRange: ['DAILY'],
        searchable: ['bus', 'darkhan', 'transport', 'ulaanbaatar'],
        rating: 4.2,
        image: '/img/city/ct1.png',
        trending: false,
        tags: ['Intercity', 'Cheap']
    },
    {
        id: 'bus-002',
        category: 'BUS',
        title: 'Ulaanbaatar → Terelj National Park',
        location: 'Narantuul Market',
        priceFrom: 8,
        currency: 'USD',
        dateRange: ['DAILY'],
        searchable: ['bus', 'terelj', 'park', 'nature'],
        rating: 4.6,
        image: '/img/nature/nt3.png',
        trending: true,
        tags: ['Tourist', 'Nature']
    },

    // --- TRAIN ---
    {
        id: 'train-001',
        category: 'TRAIN',
        title: 'Trans-Siberian Express (UB-Irkutsk)',
        location: 'Main Railway Station',
        priceFrom: 150,
        currency: 'USD',
        dateRange: ['WEEKLY'],
        searchable: ['train', 'russia', 'baikal', 'irkutsk', 'siberia'],
        rating: 4.9,
        image: '/img/nature/nt4.png',
        trending: true,
        tags: ['International', 'Scenic']
    },
    {
        id: 'train-002',
        category: 'TRAIN',
        title: 'UB → Zamyn-Uud (Border)',
        location: 'Main Railway Station',
        priceFrom: 25,
        currency: 'USD',
        dateRange: ['DAILY'],
        searchable: ['train', 'china', 'border', 'zamyn-uud'],
        rating: 4.0,
        image: '/img/city/ct2.png',
        trending: false,
        tags: ['Border', 'Night Train']
    },

    // --- FLIGHT ---
    {
        id: 'flight-001',
        category: 'FLIGHT',
        title: 'Ulaanbaatar → Khovd',
        location: 'Chinggis Khaan Airport',
        priceFrom: 200,
        currency: 'USD',
        dateRange: ['DAILY'],
        searchable: ['flight', 'khovd', 'western', 'plane', 'miat', 'hunnu'],
        rating: 4.3,
        image: '/img/nature/nt5.png',
        trending: false,
        tags: ['Domestic', 'Fast']
    },

    // --- MUSEUM ---
    {
        id: 'museum-001',
        category: 'MUSEUM',
        title: 'Chinggis Khaan Museum',
        location: 'Sukhbaatar District',
        priceFrom: 15,
        currency: 'USD',
        dateRange: ['OPEN_YEAR_ROUND'],
        searchable: ['museum', 'history', 'chinggis', 'khan', 'culture'],
        rating: 4.9,
        image: '/img/city/ct3.png',
        trending: true,
        tags: ['History', 'Must See']
    },
    {
        id: 'museum-002',
        category: 'MUSEUM',
        title: 'National Museum of Mongolia',
        location: 'Juulchin Street',
        priceFrom: 10,
        currency: 'USD',
        dateRange: ['OPEN_YEAR_ROUND'],
        searchable: ['museum', 'national', 'history', 'culture'],
        rating: 4.4,
        image: '/img/city/ct4.png',
        trending: false,
        tags: ['Culture', 'Classic']
    }
]

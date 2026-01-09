import { TICKET_LIST, TicketListItem } from '@/mocks/tickets/tickets.list.mock'
import { TICKET_DETAILS, TicketDetailItem } from '@/mocks/tickets/ticket.detail.mock'
import { AVAILABILITY_MOCK, TicketAvailability } from '@/mocks/tickets/availability.mock'
import { TICKET_RULES, TicketRule } from '@/mocks/tickets/rules'
import { TicketCategory } from '@/mocks/tickets/rules' // Import from rules if defined there

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const TicketService = {
    async list(query?: string, category?: string): Promise<TicketListItem[]> {
        await delay(300) // 300ms delay for realism

        let results = TICKET_LIST

        // Filter by Category
        if (category && category !== 'all') {
            results = results.filter(t => t.category.toLowerCase() === category.toLowerCase())
        }

        // Filter by Query (Debounce should be handled in UI)
        if (query) {
            const q = query.toLowerCase()
            results = results.filter(t =>
                t.title.toLowerCase().includes(q) ||
                t.location.toLowerCase().includes(q) ||
                t.searchable.some(k => k.includes(q))
            )
        }

        return results
    },

    async detail(id: string): Promise<TicketDetailItem | null> {
        await delay(500)
        return TICKET_DETAILS[id] || null
    },

    async availability(id: string): Promise<TicketAvailability | null> {
        await delay(400)
        return AVAILABILITY_MOCK[id] || null
    },

    // Helper: Get Rule for Category
    getRule(category: string): TicketRule {
        const cat = category.toUpperCase() as TicketCategory
        return TICKET_RULES[cat] || TICKET_RULES.EVENT // Default to EVENT
    }
}

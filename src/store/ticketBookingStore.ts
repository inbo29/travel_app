import { create } from 'zustand'
import { TicketCategory } from '@/mocks/tickets/rules'
// Adjust import path if needed based on where these types end up.
// For now I'll assume they are exported from mocks/tickets or I redefine simple ones.

interface BookingState {
    step: number
    ticketId: string | null
    category: TicketCategory | null

    // Selection
    selectedDate: string | null
    returnDate: string | null
    selectedSeats: string[] // Seat IDs
    passengers: number

    // Pricing
    basePrice: number
    totalPrice: number

    // Actions
    initBooking: (ticketId: string, category: TicketCategory, basePrice: number) => void
    setStep: (step: number) => void
    setDate: (date: string) => void
    setReturnDate: (date: string | null) => void
    toggleSeat: (seatId: string, price?: number) => void
    setPassengers: (count: number) => void
    reset: () => void
}

export const useTicketBookingStore = create<BookingState>((set, get) => ({
    step: 1,
    ticketId: null,
    category: null,
    selectedDate: null,
    returnDate: null,
    selectedSeats: [],
    passengers: 1,
    basePrice: 0,
    totalPrice: 0,

    initBooking: (ticketId, category, basePrice) => set({
        step: 1,
        ticketId,
        category,
        basePrice,
        totalPrice: basePrice, // Initial estimate
        selectedDate: null,
        returnDate: null,
        selectedSeats: [],
        passengers: 1
    }),

    setStep: (step) => set({ step }),

    setDate: (date) => set((state) => ({
        selectedDate: date,
        // Simple price recalc (could be more complex)
        totalPrice: state.basePrice * state.passengers
    })),

    setReturnDate: (date) => set((state) => ({
        returnDate: date,
        // If return date is set (and valid for category), maybe double price?
        // keeping it simple for now
        totalPrice: state.basePrice * state.passengers * (date ? 2 : 1)
    })),

    toggleSeat: (seatId, seatPrice) => set((state) => {
        const exists = state.selectedSeats.includes(seatId)
        const newSeats = exists
            ? state.selectedSeats.filter(id => id !== seatId)
            : [...state.selectedSeats, seatId]

        // Recalc price based on seats if seats are selected
        // If seatPrice is provided, ideally we track per-seat price.
        // For simplicity, we assume basePrice or we'd need a map of seat prices.
        // Let's assume price is just (Base * Count) for now unless specific logic.

        return {
            selectedSeats: newSeats,
            passengers: newSeats.length || 1, // Auto update passengers matches seats
            totalPrice: (seatPrice || state.basePrice) * newSeats.length
        }
    }),

    setPassengers: (count) => set((state) => ({
        passengers: count,
        totalPrice: state.basePrice * count
    })),

    reset: () => set({
        step: 1,
        ticketId: null,
        category: null,
        selectedDate: null,
        returnDate: null,
        selectedSeats: [],
        passengers: 1,
        totalPrice: 0
    })
}))

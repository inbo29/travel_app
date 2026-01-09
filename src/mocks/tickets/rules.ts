export type TicketCategory = 'EVENT' | 'BUS' | 'TRAIN' | 'FLIGHT' | 'MUSEUM'

export interface TicketRule {
    dateSelection: 'SINGLE' | 'RANGE' | 'PERIOD' // Range = Start/End dates (transport), Period = Validity (museum)
    seatSelection: boolean
    roundTrip: boolean
    passengerDetails: boolean
}

export const TICKET_RULES: Record<TicketCategory, TicketRule> = {
    EVENT: {
        dateSelection: 'SINGLE',
        seatSelection: true,
        roundTrip: false,
        passengerDetails: false // Usually just quantity
    },
    BUS: {
        dateSelection: 'RANGE',
        seatSelection: true,
        roundTrip: true,
        passengerDetails: true
    },
    TRAIN: {
        dateSelection: 'RANGE',
        seatSelection: true,
        roundTrip: true,
        passengerDetails: true
    },
    FLIGHT: {
        dateSelection: 'RANGE',
        seatSelection: true,
        roundTrip: true,
        passengerDetails: true
    },
    MUSEUM: {
        dateSelection: 'PERIOD',
        seatSelection: false,
        roundTrip: false,
        passengerDetails: false
    }
}

export type PaymentMethod =
    | 'PAYME'
    | 'CARD'
    | 'APPLE_PAY'
    | 'SAMSUNG_PAY'

export type PaymentContextState = {
    method: PaymentMethod
    total: number
}

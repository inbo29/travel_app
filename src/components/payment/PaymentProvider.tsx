import React, { createContext, useContext, useState } from 'react'
import { PaymentMethod } from './types'

type PaymentContextType = {
    method: PaymentMethod
    total: number
    setMethod: (m: PaymentMethod) => void
}

const PaymentContext = createContext<PaymentContextType | null>(null)

export const PaymentProvider = ({
    children,
    initialTotal,
}: {
    children: React.ReactNode
    initialTotal: number
}) => {
    const [method, setMethod] = useState<PaymentMethod>('PAYME')

    return (
        <PaymentContext.Provider
            value={{
                method,
                total: initialTotal,
                setMethod,
            }}
        >
            {children}
        </PaymentContext.Provider>
    )
}

export const usePayment = () => {
    const ctx = useContext(PaymentContext)
    if (!ctx) throw new Error('usePayment must be used within PaymentProvider')
    return ctx
}

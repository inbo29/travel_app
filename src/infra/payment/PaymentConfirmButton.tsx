import { usePayment } from './PaymentProvider'

interface Props {
    onClick: () => void
    label?: string
}

export const PaymentConfirmButton = ({ onClick, label }: Props) => {
    const { method } = usePayment()

    return (
        <button
            onClick={onClick}
            className="w-full py-6 bg-accent text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
            {label || `Complete Purchase (${method})`}
        </button>
    )
}

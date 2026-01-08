import { usePayment } from './PaymentProvider'
import { glassClasses } from '@/styles/glass'
import { PaymentMethod } from './types'

interface PaymentMethodConfig {
    readonly key: PaymentMethod
    readonly label: string
    readonly icon: string
    readonly recommended?: boolean
}

const METHODS: readonly PaymentMethodConfig[] = [
    { key: 'PAYME', label: 'PayMe', icon: '💳', recommended: true },
    { key: 'CARD', label: 'Credit / Debit Card', icon: '🏦' },
    { key: 'APPLE_PAY', label: 'Apple Pay', icon: '🍎' },
    { key: 'SAMSUNG_PAY', label: 'Samsung Pay', icon: '📱' },
]

export const PaymentMethodSelector = () => {
    const { method, setMethod } = usePayment()

    return (
        <div className="space-y-3">
            {METHODS.map(m => (
                <button
                    key={m.key}
                    onClick={() => setMethod(m.key)}
                    className={`
                        w-full p-5 rounded-3xl border-2 transition-all flex items-center justify-between
                        ${method === m.key
                            ? 'border-accent bg-accent/[0.03] shadow-lg scale-[1.02]'
                            : 'border-slate-100 dark:border-white/5 bg-white/50 dark:bg-white/5 opacity-60 hover:opacity-100'
                        }
                    `}
                >
                    <div className="flex items-center gap-4">
                        <span className="text-2xl">{m.icon}</span>
                        <div className="text-left">
                            <p className="font-black text-slate-900 dark:text-white">{m.label}</p>
                            {m.recommended && (
                                <span className="text-[10px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase">Recommended</span>
                            )}
                        </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === m.key ? 'border-accent' : 'border-slate-200 dark:border-white/20'}`}>
                        {method === m.key && <div className="w-3 h-3 bg-accent rounded-full" />}
                    </div>
                </button>
            ))}
        </div>
    )
}

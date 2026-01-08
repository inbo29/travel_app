import { useState } from 'react'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'

interface PaymentMethod {
    id: string
    name: string
    icon: string
    recommended?: boolean
}

interface PaymentProcessProps {
    amount: number
    title: string
    onComplete: (method: string) => void
    onCancel: () => void
    items?: { label: string, value: string }[]
}

const METHODS: PaymentMethod[] = [
    { id: 'payme', name: 'PayMe', icon: '💳', recommended: true },
    { id: 'card', name: 'Credit/Debit', icon: '🏦' },
    { id: 'apple', name: 'Apple Pay', icon: '🍎' },
    { id: 'samsung', name: 'Samsung Pay', icon: '📱' },
]

export default function PaymentProcess({ amount, title, onComplete, onCancel, items }: PaymentProcessProps) {
    const { t } = useI18n()
    const [selectedMethod, setSelectedMethod] = useState('payme')

    return (
        <div className="space-y-8">
            {/* Summary */}
            <div className={`${glassClasses} p-8 rounded-[2.5rem] bg-white dark:bg-bg-bg-dark/50 border-slate-200 dark:border-white/10 shadow-2xl`}>
                <div className="text-center space-y-2 mb-8">
                    <p className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em]">{title}</p>
                    <div className="text-6xl font-black text-accent">${amount}</div>
                </div>

                {items && (
                    <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-white/5">
                        {items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <span className="text-sm font-bold text-slate-500 dark:text-white/40">{item.label}</span>
                                <span className="text-sm font-black text-slate-900 dark:text-white">{item.value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Methods */}
            <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest pl-2">Select Payment</h3>
                <div className="grid grid-cols-1 gap-3">
                    {METHODS.map(method => (
                        <button
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`
                                p-5 rounded-3xl border-2 transition-all flex items-center justify-between
                                ${selectedMethod === method.id
                                    ? 'border-accent bg-accent/[0.03] shadow-lg scale-[1.02]'
                                    : 'border-slate-100 dark:border-white/5 bg-white/50 dark:bg-white/5 opacity-60 hover:opacity-100'
                                }
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">{method.icon}</span>
                                <div className="text-left">
                                    <p className="font-black text-slate-900 dark:text-white">{method.name}</p>
                                    {method.recommended && (
                                        <span className="text-[10px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase">Recommended</span>
                                    )}
                                </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? 'border-accent' : 'border-slate-200 dark:border-white/20'}`}>
                                {selectedMethod === method.id && <div className="w-3 h-3 bg-accent rounded-full" />}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4">
                <button
                    onClick={() => onComplete(selectedMethod)}
                    className="w-full py-6 bg-accent text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    Confirm & Pay
                </button>
                <button
                    onClick={onCancel}
                    className="w-full text-slate-400 dark:text-white/30 text-sm font-bold uppercase tracking-widest"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

import { usePayment } from './PaymentProvider'

export const PaymentSummary = () => {
    const { total } = usePayment()

    return (
        <div className="flex justify-between items-end p-8 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
            <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</p>
                <div className="text-4xl font-black text-accent">${total.toFixed(2)}</div>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Safe Checkout</p>
                <div className="text-sm font-bold text-slate-900 dark:text-white">SSL Encrypted</div>
            </div>
        </div>
    )
}

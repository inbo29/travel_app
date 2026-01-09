import { glassClasses } from '@/styles/glass'

interface TaxiSafetyModalProps {
    isOpen: boolean
    onClose: () => void
}

export function TaxiSafetyModal({ isOpen, onClose }: TaxiSafetyModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 pointer-events-auto">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className={`${glassClasses} bg-white dark:bg-bg-dark border-red-500/30 w-full max-w-md p-8 rounded-[3rem] text-center space-y-6 relative border-2`}>
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <span className="text-4xl">🚨</span>
                </div>

                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Safety Center</h3>
                    <p className="text-slate-500 dark:text-white/60">Help request has been sent to the safety center.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="py-4 rounded-2xl bg-red-500 text-white font-black hover:bg-red-600 transition-all">
                        Call 102
                    </button>
                    <button onClick={onClose} className="py-4 rounded-2xl bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-white/20 transition-all">
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

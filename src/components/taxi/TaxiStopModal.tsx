import { glassClasses } from '@/styles/glass'
import { TaxiRide } from '@/types/taxi'

interface TaxiStopModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    ride: TaxiRide
}

export function TaxiStopModal({ isOpen, onClose, onConfirm, ride }: TaxiStopModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 pointer-events-auto">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className={`${glassClasses} w-full max-w-md p-8 rounded-[3rem] text-center space-y-6 relative border-2 border-slate-200 dark:border-white/10`}>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Stop Ride?</h3>

                <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Fare</p>
                    <p className="text-4xl font-black text-accent">${ride.currentFare.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">Stopping now will complete the ride with this fare.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button onClick={onClose} className="py-4 rounded-2xl bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-white/20 transition-all">
                        Continue
                    </button>
                    <button onClick={onConfirm} className="py-4 rounded-2xl bg-slate-900 text-white font-black hover:bg-slate-800 transition-all">
                        Stop Ride
                    </button>
                </div>
            </div>
        </div>
    )
}

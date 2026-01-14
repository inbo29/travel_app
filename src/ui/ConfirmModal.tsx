import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/hooks/useI18n'

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    titleKey: string
    messageKey: string
    confirmTextKey?: string
    cancelTextKey?: string
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    titleKey,
    messageKey,
    confirmTextKey = 'common.confirm',
    cancelTextKey = 'common.cancel'
}: ConfirmModalProps) {
    const { t } = useI18n()

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🔒</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            {t(titleKey)}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300">
                            {t(messageKey)}
                        </p>
                    </div>

                    <div className="flex border-t border-slate-100 dark:border-slate-700">
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                            {t(cancelTextKey)}
                        </button>
                        <div className="w-[1px] bg-slate-100 dark:bg-slate-700" />
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-4 text-accent font-bold hover:bg-accent/5 transition-colors"
                        >
                            {t(confirmTextKey)}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

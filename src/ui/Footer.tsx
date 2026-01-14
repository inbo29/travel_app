import { useI18n } from '@/hooks/useI18n'
import { ThemeToggle } from './ThemeToggle'

export default function Footer() {
    const { t } = useI18n()

    return (
        <footer className="bg-slate-50 dark:bg-black/90 text-slate-500 dark:text-slate-400 py-12 md:py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Moril</h2>
                        <p className="max-w-xs leading-relaxed">
                            {t('footer.description')}
                        </p>
                        <div className="flex gap-3 mt-6">
                            {[1, 2].map((i) => (
                                <button key={i} className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                                    {i === 1 ? (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.15L15.71 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase text-sm tracking-wider">
                            {t('footer.company')}
                        </h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-accent transition-colors">{t('footer.terms')}</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">{t('footer.privacy')}</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">{t('footer.support')}</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase text-sm tracking-wider">
                            {t('footer.contact')}
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <span className="text-accent">✉</span> info@moril.com
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-accent">🌐</span> www.moril.com
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-accent">📍</span> Ulaanbaatar, Mongolia
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Me Tech Studio. All rights reserved.
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{t('footer.theme')}</span>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </footer>
    )
}

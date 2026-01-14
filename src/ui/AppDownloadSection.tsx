import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import { glassClasses } from '@/styles/glass'

export default function AppDownloadSection() {
    const { t } = useI18n()
    const navigate = useNavigate()

    return (
        <section className="px-6 py-6 max-w-7xl mx-auto">
            <div className={`relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-white/10 shadow-2xl`}>
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-20 p-8 md:p-16">
                    {/* Content */}
                    <div className="flex-1 text-center md:text-left space-y-6">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                            <span className="text-accent font-bold text-sm tracking-wider uppercase">Travel OS 1.0</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            {t('appPopup.title')}
                        </h2>

                        <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
                            {t('appPopup.tagline')}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
                            {/* QR Code (Hidden on mobile) */}
                            {/* <div className="hidden md:block p-3 bg-white rounded-2xl shadow-lg shrink-0">
                                <div className="w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-20 h-20 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M4 4h6v6H4V4zm2 2v2h2V6H6zm-2 8h6v6H4v-6zm2 2v2h2v-2H6zM14 4h6v6h-6V4zm2 2v2h2V6h-2zm-2 8h2v2h2v-2h2v6h-2v-2h-2v2h-2v-6zm2 2h2v2h-2v-2z" />
                                    </svg>
                                </div>
                            </div> */}

                            {/* Buttons */}
                            <div className="flex flex-col gap-3 w-full sm:w-auto">
                                <button className="flex items-center gap-3 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm transition-all text-left group w-full sm:w-48">
                                    <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                    </svg>
                                    <div>
                                        <div className="text-[10px] text-white/60 font-medium">Download on the</div>
                                        <div className="text-sm font-bold text-white leading-none">App Store</div>
                                    </div>
                                </button>

                                <button className="flex items-center gap-3 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm transition-all text-left group w-full sm:w-48">
                                    <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                    </svg>
                                    <div>
                                        <div className="text-[10px] text-white/60 font-medium">GET IT ON</div>
                                        <div className="text-sm font-bold text-white leading-none">Google Play</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Visual (Mock Phone UI) */}
                    <div className="flex-1 hidden md:flex items-center justify-center relative">
                        <div className="relative z-10 w-[280px] h-[560px] bg-black rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden rotate-[-5deg] hover:rotate-0 transition-all duration-500">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-20"></div>
                            {/* Screen */}
                            <div className="w-full h-full bg-slate-900 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-950">
                                    {/* Mock Content */}
                                    <div className="p-6 pt-16 space-y-4 opacity-80">
                                        <div className="w-12 h-12 rounded-full bg-accent mb-6"></div>
                                        <div className="h-4 w-3/4 bg-white/20 rounded-full"></div>
                                        <div className="h-4 w-1/2 bg-white/20 rounded-full"></div>

                                        <div className="grid grid-cols-2 gap-3 pt-4">
                                            <div className="aspect-square rounded-2xl bg-white/10"></div>
                                            <div className="aspect-square rounded-2xl bg-white/10"></div>
                                            <div className="aspect-square rounded-2xl bg-white/10"></div>
                                            <div className="aspect-square rounded-2xl bg-white/10"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Shadow/Reflection */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[20px] bg-black/50 blur-xl rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    )
}

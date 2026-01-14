import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import Footer from '@/ui/Footer'

// Quick Access Items for horizontal scroll bar (NOL style)
const QUICK_CATEGORIES = [
    { key: 'taxi', icon: '🚕', path: '/taxi' },
    { key: 'tickets', icon: '🎫', path: '/tickets' },
    { key: 'accommodation', icon: '🏨', path: '/accommodation/hotel' },
    { key: 'travel', icon: '✈️', path: '/guides/tours' },
    { key: 'guide', icon: '🧭', path: '/guides' },
    { key: 'translate', icon: '🌐', path: '/translate' },
    { key: 'market', icon: '📊', path: '/market-rates' },
    { key: 'travelLog', icon: '📔', path: '/travel-log' },
    { key: 'insurance', icon: '🛡️', path: '/insurance/domestic' },
    { key: 'localMart', icon: '🛍️', path: '/local-mart' },
]

// Quick Action Buttons (below categories)
const QUICK_ACTIONS = [
    { key: 'benefits', icon: '🎁', label: 'home.quickActions.benefits' },
    { key: 'coupon', icon: '🎟️', label: 'home.quickActions.coupon' },
    { key: 'events', icon: '🎉', label: 'home.quickActions.events' },
]

// Mock Banner Data
const DESTINATION_BANNERS = [
    { id: 1, title: 'home.banners.destination1', subtitle: 'home.banners.destinationSub1', color: 'from-blue-500 to-indigo-600', image: '/nature/nt2.png' },
    { id: 2, title: 'home.banners.destination2', subtitle: 'home.banners.destinationSub2', color: 'from-emerald-500 to-teal-600', image: '/nature/nt3.png' },
    { id: 3, title: 'home.banners.destination3', subtitle: 'home.banners.destinationSub3', color: 'from-purple-500 to-pink-500', image: '/city/ct1.png' },
]

const EVENT_BANNERS = [
    { id: 1, title: 'home.banners.event1', badge: '🎉 HOT', color: 'bg-gradient-to-r from-orange-400 to-red-500' },
    { id: 2, title: 'home.banners.event2', badge: '⏰ D-7', color: 'bg-gradient-to-r from-violet-500 to-purple-600' },
    { id: 3, title: 'home.banners.event3', badge: '🌟 NEW', color: 'bg-gradient-to-r from-cyan-400 to-blue-500' },
]

// Mock Package Data  
const DOMESTIC_PACKAGES = [
    { id: 1, rank: 1, title: 'Gobi Desert Adventure', price: 450, discount: 20, image: `${import.meta.env.BASE_URL}nature/nt2.png` },
    { id: 2, rank: 2, title: 'Terelj National Park', price: 280, discount: 15, image: `${import.meta.env.BASE_URL}nature/nt3.png` },
    { id: 3, rank: 3, title: 'Khuvsgul Lake Tour', price: 520, discount: 10, image: `${import.meta.env.BASE_URL}city/ct1.png` },
    { id: 4, rank: 4, title: 'Hustai Wild Horses', price: 180, discount: 25, image: `${import.meta.env.BASE_URL}nature/nt2.png` },
    { id: 5, rank: 5, title: 'Orkhon Valley', price: 380, discount: 12, image: `${import.meta.env.BASE_URL}nature/nt3.png` },
]

const INTERNATIONAL_PACKAGES = [
    { id: 1, rank: 1, title: 'Jeju Island, Korea', price: 890, discount: 18, image: `${import.meta.env.BASE_URL}city/ct1.png` },
    { id: 2, rank: 2, title: 'Bali Adventure', price: 1200, discount: 22, image: `${import.meta.env.BASE_URL}nature/nt3.png` },
    { id: 3, rank: 3, title: 'Tokyo Express', price: 980, discount: 15, image: `${import.meta.env.BASE_URL}nature/nt2.png` },
    { id: 4, rank: 4, title: 'Bangkok Street Food', price: 650, discount: 20, image: `${import.meta.env.BASE_URL}city/ct1.png` },
    { id: 5, rank: 5, title: 'Singapore City', price: 780, discount: 10, image: `${import.meta.env.BASE_URL}nature/nt3.png` },
]

// Discount Products
const DISCOUNT_PRODUCTS = [
    { id: 1, title: 'home.products.hotel', discount: 80, badge: 'SALE', path: '/accommodation/hotel' },
    { id: 2, title: 'home.products.tour', discount: 50, badge: 'HOT', path: '/guides/tours' },
    { id: 3, title: 'home.products.ticket', discount: 40, badge: 'LIMITED', path: '/tickets' },
    { id: 4, title: 'home.products.activity', discount: 30, badge: 'NEW', path: '/travel/activity' },
]

// Ticket Deals
const TICKET_DEALS = [
    { id: 1, title: 'Opera House Concert', category: 'Concert', price: 45, originalPrice: 80, image: `${import.meta.env.BASE_URL}nature/nt2.png` },
    { id: 2, title: 'National Museum', category: 'Museum', price: 12, originalPrice: 20, image: `${import.meta.env.BASE_URL}city/ct1.png` },
    { id: 3, title: 'Ballet Performance', category: 'Performance', price: 65, originalPrice: 100, image: `${import.meta.env.BASE_URL}nature/nt3.png` },
]

// Souvenirs
const SOUVENIRS = [
    { id: 1, title: '몽골 전통 공예품', price: 25, shipping: true, image: `${import.meta.env.BASE_URL}nature/nt2.png` },
    { id: 2, title: '캐시미어 스카프', price: 89, shipping: true, image: `${import.meta.env.BASE_URL}nature/nt3.png` },
    { id: 3, title: '몽골 초콜릿 세트', price: 15, shipping: true, image: `${import.meta.env.BASE_URL}city/ct1.png` },
]

export default function HomeMain() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const [currentDestBanner, setCurrentDestBanner] = useState(0)

    // Banner auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDestBanner(prev => (prev + 1) % DESTINATION_BANNERS.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 z-[-1] bg-bg-light dark:bg-bg-dark overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white/0 to-emerald-50/50 dark:from-indigo-950/30 dark:to-emerald-950/30" />
            </div>

            <div className="relative z-10 pt-4">
                {/* ========== 1. HERO SECTION ========== */}
                <section className="px-6 py-12 max-w-7xl mx-auto">
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                            {t('home.heroTitle')}
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">
                                Moril
                            </span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-white/60 max-w-xl mx-auto">
                            {t('home.heroSubtitle')}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                            <button
                                onClick={() => navigate('/guides/tours')}
                                className="px-8 py-4 bg-accent text-white font-bold rounded-2xl hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98] transition-all duration-300"
                            >
                                {t('home.start')}
                            </button>
                            <button
                                onClick={() => navigate('/map')}
                                className={`${glassClasses} px-8 py-4 font-bold rounded-2xl hover:bg-black/5 dark:hover:bg-white/10`}
                            >
                                {t('home.explore')}
                            </button>
                        </div>
                    </div>
                </section>

                {/* ========== 2. QUICK CATEGORY BAR (NOL Style) ========== */}
                <section className="px-4 py-6 border-y border-slate-100 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                            {/* Category Menu Button */}
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('openCategoryMenu'))}
                                className="flex-shrink-0 w-14 h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            {/* Category Icons */}
                            {QUICK_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.key}
                                    onClick={() => navigate(cat.path)}
                                    className="flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-w-[72px]"
                                >
                                    <span className="text-2xl">{cat.icon}</span>
                                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                        {t(`category.${cat.key}.title`)}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex items-center gap-3 mt-4 overflow-x-auto no-scrollbar">
                            {QUICK_ACTIONS.map((action) => (
                                <button
                                    key={action.key}
                                    className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-accent hover:bg-accent/5 transition-colors"
                                >
                                    <span>{action.icon}</span>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                                        {t(action.label)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== 3. DESTINATION BANNERS ========== */}
                <section className="px-6 py-8 max-w-7xl mx-auto">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                        {t('home.banners.destinationTitle')}
                    </h2>
                    <div className="relative overflow-hidden rounded-3xl h-[200px] md:h-[250px]">
                        {DESTINATION_BANNERS.map((banner, idx) => (
                            <div
                                key={banner.id}
                                className={`absolute inset-0 transition-all duration-700 ${idx === currentDestBanner ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
                            >
                                <div className={`h-full w-full bg-gradient-to-r ${banner.color} p-8 flex flex-col justify-end relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="relative z-10">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                            {t(banner.title)}
                                        </h3>
                                        <p className="text-white/80 text-sm md:text-base">
                                            {t(banner.subtitle)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                            {DESTINATION_BANNERS.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentDestBanner(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentDestBanner ? 'bg-white w-6' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== 4. EVENT BANNERS ========== */}
                <section className="px-6 py-6 max-w-7xl mx-auto">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                        {t('home.banners.eventTitle')}
                    </h2>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        {EVENT_BANNERS.map((event) => (
                            <div
                                key={event.id}
                                className={`flex-shrink-0 w-[280px] h-[120px] ${event.color} rounded-2xl p-5 relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform`}
                            >
                                <span className="absolute top-3 right-3 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-bold">
                                    {event.badge}
                                </span>
                                <div className="h-full flex flex-col justify-end">
                                    <h4 className="text-white font-bold text-lg">{t(event.title)}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ========== 5. DISCOUNT PRODUCTS ========== */}
                <section className="px-6 py-6 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {t('home.banners.discountTitle')}
                        </h2>
                        <button className="text-sm font-semibold text-accent hover:underline">
                            {t('sections.viewAll')}
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {DISCOUNT_PRODUCTS.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => navigate(product.path)}
                                className={`${glassClasses} p-4 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform group`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                                        {product.badge}
                                    </span>
                                    <span className="text-accent font-bold">~{product.discount}%</span>
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                                    {t(product.title)}
                                </h4>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ========== 6. TICKET DEALS ========== */}
                <section className="px-6 py-6 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {t('home.banners.ticketTitle')}
                        </h2>
                        <button
                            onClick={() => navigate('/tickets')}
                            className="text-sm font-semibold text-accent hover:underline"
                        >
                            {t('sections.viewAll')}
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        {TICKET_DEALS.map((ticket) => (
                            <div
                                key={ticket.id}
                                onClick={() => navigate('/tickets')}
                                className={`${glassClasses} flex-shrink-0 w-[200px] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform`}
                            >
                                <div className="h-[100px] relative">
                                    <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
                                    <span className="absolute top-2 left-2 px-2 py-1 bg-accent text-white text-xs font-bold rounded-lg">
                                        {ticket.category}
                                    </span>
                                </div>
                                <div className="p-3">
                                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1 line-clamp-1">
                                        {ticket.title}
                                    </h4>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-accent font-bold">${ticket.price}</span>
                                        <span className="text-xs text-slate-400 line-through">${ticket.originalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ========== 7. DOMESTIC PACKAGES - TOP 5 ========== */}
                <section className="px-6 py-6 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {t('home.packages.domestic')}
                        </h2>
                        <button className="text-sm font-semibold text-accent hover:underline">
                            {t('sections.viewAll')}
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        {DOMESTIC_PACKAGES.map((pkg) => (
                            <div
                                key={pkg.id}
                                onClick={() => navigate('/guides/tours')}
                                className={`${glassClasses} flex-shrink-0 w-[180px] md:w-[200px] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform group`}
                            >
                                <div className="relative h-[120px] overflow-hidden">
                                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                                        {pkg.rank}
                                    </div>
                                    {pkg.discount > 0 && (
                                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-red-500 text-white text-xs font-bold">
                                            {pkg.discount}%
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1 mb-1">
                                        {pkg.title}
                                    </h4>
                                    <span className="text-accent font-bold text-sm">${pkg.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ========== 8. INTERNATIONAL PACKAGES - TOP 5 ========== */}
                <section className="px-6 py-6 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {t('home.packages.international')}
                        </h2>
                        <button className="text-sm font-semibold text-accent hover:underline">
                            {t('sections.viewAll')}
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        {INTERNATIONAL_PACKAGES.map((pkg) => (
                            <div
                                key={pkg.id}
                                onClick={() => navigate('/guides/tours')}
                                className={`${glassClasses} flex-shrink-0 w-[180px] md:w-[200px] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform group`}
                            >
                                <div className="relative h-[120px] overflow-hidden">
                                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                                        {pkg.rank}
                                    </div>
                                    {pkg.discount > 0 && (
                                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-red-500 text-white text-xs font-bold">
                                            {pkg.discount}%
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1 mb-1">
                                        {pkg.title}
                                    </h4>
                                    <span className="text-accent font-bold text-sm">${pkg.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ========== 9. SOUVENIRS ========== */}
                <section className="px-6 py-6 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {t('home.banners.souvenirTitle')}
                        </h2>
                        <button
                            onClick={() => navigate('/local-mart')}
                            className="text-sm font-semibold text-accent hover:underline"
                        >
                            {t('sections.viewAll')}
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        {SOUVENIRS.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => navigate('/local-mart')}
                                className={`${glassClasses} flex-shrink-0 w-[160px] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform`}
                            >
                                <div className="h-[100px] relative">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    {item.shipping && (
                                        <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-lg">
                                            🚚 배송가능
                                        </span>
                                    )}
                                </div>
                                <div className="p-3">
                                    <h4 className="font-medium text-slate-900 dark:text-white text-sm line-clamp-1 mb-1">
                                        {item.title}
                                    </h4>
                                    <span className="text-accent font-bold text-sm">${item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ========== 10. INSURANCE RECOMMENDATION ========== */}
                <section className="px-6 py-6 max-w-7xl mx-auto">
                    <div
                        onClick={() => navigate('/insurance/domestic')}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 cursor-pointer hover:scale-[1.01] transition-transform"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-white/70 text-sm">{t('home.banners.insuranceTag')}</span>
                                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                                    {t('home.banners.insuranceTitle')}
                                </h3>
                                <p className="text-white/80 text-sm mt-2 max-w-md">
                                    {t('home.banners.insuranceSubtitle')}
                                </p>
                            </div>
                            <div className="text-6xl opacity-80">🛡️</div>
                        </div>
                    </div>
                </section>

                {/* ========== 11. EDITOR'S PICK ========== */}
                <section className="px-6 py-6 max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('sections.editorsPick')}</h2>
                            <p className="text-slate-500 dark:text-white/50 text-sm mt-1">{t('home.editorPickSub')}</p>
                        </div>
                        <button className="text-accent font-bold text-sm hover:underline">
                            {t('sections.viewAll')}
                        </button>
                    </div>

                    <div className={`${glassClasses} rounded-[2rem] overflow-hidden group border-white/20 dark:border-white/5 shadow-xl relative h-[280px] md:h-[350px]`}>
                        <img
                            src={`${import.meta.env.BASE_URL}nature/nt2.png`}
                            alt="Editor's Pick"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <span className="inline-block px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-xs font-bold text-white uppercase tracking-widest mb-3">
                                {t('mock.highlyRecommended')}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                                {t('mock.trekTitle')}
                            </h3>
                            <button
                                onClick={() => navigate('/guides')}
                                className="bg-accent text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-accent/20"
                            >
                                {t('mock.bookNow')} — $450
                            </button>
                        </div>
                    </div>
                </section>

                {/* Bottom Padding for BottomNav */}
                <div className="h-28" />

                {/* ========== FOOTER ========== */}
                <Footer />
            </div>
        </div>
    )
}

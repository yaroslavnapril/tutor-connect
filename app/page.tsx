'use client'

import { useState } from 'react'

const TUTORS = [
  {
    id: '1',
    name: 'Анна Сергеевна',
    subject: 'Математика',
    rating: 4.9,
    reviews: 127,
    experience: 5,
    city: 'Москва',
    price: 1500,
    bio: 'Готовлю к ЕГЭ и ОГЭ. Индивидуальный подход, разбираю каждую ошибку до полного понимания.',
    tags: ['ЕГЭ', 'ОГЭ', 'Алгебра'],
    emoji: '🔢',
    badge: 'Топ-репетитор'
  },
  {
    id: '2',
    name: 'Иван Петров',
    subject: 'Английский',
    rating: 4.8,
    reviews: 89,
    experience: 3,
    city: 'Online',
    price: 1200,
    bio: 'Разговорный английский и подготовка к IELTS. Жил в Лондоне 2 года, знаю все «подводные камни» экзамена.',
    tags: ['IELTS', 'Разговорный', 'Дети'],
    emoji: '🇬🇧',
    badge: 'Проверен'
  },
  {
    id: '3',
    name: 'Мария Кузнецова',
    subject: 'Физика',
    rating: 5.0,
    reviews: 56,
    experience: 7,
    city: 'Санкт-Петербург',
    price: 1800,
    bio: 'Физика с нуля до олимпиад. Помогаю понять логику, а не зазубрить формулы.',
    tags: ['Олимпиады', 'ЕГЭ', 'Механика'],
    emoji: '⚛️',
    badge: 'Эксперт'
  }
]

const PRODUCTS = [
  { title: '50 типовых задач ЕГЭ по математике', price: 499, sales: 234, author: 'Анна С.' },
  { title: 'Чек-лист по английской грамматике', price: 299, sales: 189, author: 'Иван П.' },
  { title: 'Программа подготовки к олимпиаде по физике', price: 799, sales: 67, author: 'Мария К.' }
]

export default function Home() {
  const [lang, setLang] = useState<'ru'|'en'>('ru')

  const t = {
    ru: {
      navFind: 'Найти репетитора',
      navMarket: 'Маркетплейс',
      navHow: 'Как это работает',
      ctaTutor: 'Стать репетитором',
      heroTitle: 'Репетиторы без переплат',
      heroSubtitle: 'Комиссия 8% — в 2 раза меньше, чем на «Репетит». Находи проверенных преподавателей, покупай методички и зарабатывай на своих наработках.',
      heroCta1: 'Найти репетитора',
      heroCta2: 'Стать репетитором',
      heroSocial: 'Присоединились 500+ репетиторов',
      stat1: 'репетиторов уже с нами',
      stat2: 'комиссия платформы',
      stat3: 'проведённых занятий',
      howTitle: 'Как это работает',
      step1Title: 'Выбери репетитора',
      step1Desc: 'Фильтруй по предмету, цене, опыту и формату. Читай отзывы реальных учеников.',
      step2Title: 'Запишись на занятие',
      step2Desc: 'Договорись о времени напрямую или через платформу. Первое занятие со скидкой.',
      step3Title: 'Плати справедливо',
      step3Desc: 'Мы удерживаем всего 8%. Остальное сразу уходит репетитору. Без скрытых платежей.',
      searchTitle: 'Найди своего идеального репетитора',
      searchPlaceholder: 'Какой предмет нужен?',
      searchBtn: 'Найти',
      popular: 'Популярное:',
      tutorsTitle: 'Популярные репетиторы',
      tutorsSubtitle: 'Проверенные преподаватели с реальными отзывами',
      viewAll: 'Смотреть всех →',
      perHour: '₽/час',
      reviews: 'отзывов',
      exp: 'лет опыта',
      marketplaceTitle: 'Маркетплейс наработок',
      marketplaceSubtitle: 'Покупай готовые методички или продавай свои',
      marketplaceCta: 'Все материалы →',
      ctaTitle: 'Зарабатывай больше на своих знаниях',
      ctaText: 'Регистрируйся как репетитор, выкладывай методички и получай доход с каждой продажи. Комиссия платформы — минимальная.',
      ctaBtn: 'Начать бесплатно',
      footerBrand: 'Tutor Connect',
      footerTagline: 'Честная платформа для репетиторов и учеников',
      footerCol1: 'Платформа',
      footerCol1Links: ['О нас', 'Как это работает', 'Цены', 'Блог'],
      footerCol2: 'Репетиторам',
      footerCol2Links: ['Стать репетитором', 'Маркетплейс', 'Курсы', 'FAQ'],
      footerCol3: 'Ученикам',
      footerCol3Links: ['Найти репетитора', 'Предметы', 'Отзывы', 'Помощь'],
      footerCopy: '© 2026 Tutor Connect. Все права защищены.'
    },
    en: {
      navFind: 'Find a tutor',
      navMarket: 'Marketplace',
      navHow: 'How it works',
      ctaTutor: 'Become a tutor',
      heroTitle: 'Tutors without overpayment',
      heroSubtitle: '8% commission — 2x less than competitors. Find verified teachers, buy study guides, and monetize your own materials.',
      heroCta1: 'Find a tutor',
      heroCta2: 'Become a tutor',
      heroSocial: '500+ tutors already joined',
      stat1: 'tutors on board',
      stat2: 'platform commission',
      stat3: 'lessons completed',
      howTitle: 'How it works',
      step1Title: 'Choose a tutor',
      step1Desc: 'Filter by subject, price, experience and format. Read real student reviews.',
      step2Title: 'Book a lesson',
      step2Desc: 'Schedule directly or through the platform. First lesson with a discount.',
      step3Title: 'Pay fairly',
      step3Desc: 'We keep only 8%. The rest goes straight to the tutor. No hidden fees.',
      searchTitle: 'Find your perfect tutor',
      searchPlaceholder: 'What subject do you need?',
      searchBtn: 'Search',
      popular: 'Popular:',
      tutorsTitle: 'Popular tutors',
      tutorsSubtitle: 'Verified teachers with real reviews',
      viewAll: 'View all →',
      perHour: '₽/hour',
      reviews: 'reviews',
      exp: 'years exp',
      marketplaceTitle: 'Study materials marketplace',
      marketplaceSubtitle: 'Buy ready-made guides or sell your own',
      marketplaceCta: 'All materials →',
      ctaTitle: 'Earn more from your knowledge',
      ctaText: 'Register as a tutor, upload study guides and earn from every sale. Platform commission is minimal.',
      ctaBtn: 'Start for free',
      footerBrand: 'Tutor Connect',
      footerTagline: 'Fair platform for tutors and students',
      footerCol1: 'Platform',
      footerCol1Links: ['About', 'How it works', 'Pricing', 'Blog'],
      footerCol2: 'For tutors',
      footerCol2Links: ['Become a tutor', 'Marketplace', 'Courses', 'FAQ'],
      footerCol3: 'For students',
      footerCol3Links: ['Find a tutor', 'Subjects', 'Reviews', 'Help'],
      footerCopy: '© 2026 Tutor Connect. All rights reserved.'
    }
  }

  const l = t[lang]

  return (
    <main className="min-h-screen bg-[#F5F3EF] text-[#1A1A1A]">
      {/* Header */}
      <header className="bg-[#2D5A45] text-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tight">Tutor Connect</span>
            <nav className="hidden md:flex gap-6 text-sm text-white/80">
              <a href="#" className="hover:text-white transition">{l.navFind}</a>
              <a href="#" className="hover:text-white transition">{l.navMarket}</a>
              <a href="#" className="hover:text-white transition">{l.navHow}</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-white/20 rounded-full p-1">
              <button onClick={() => setLang('ru')} className={`px-3 py-1 rounded-full text-xs font-bold transition ${lang==='ru'?'bg-white text-[#2D5A45]':'text-white/80'}`}>RU</button>
              <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-xs font-bold transition ${lang==='en'?'bg-white text-[#2D5A45]':'text-white/80'}`}>EN</button>
            </div>
            <button className="hidden sm:block px-5 py-2 bg-white text-[#2D5A45] rounded-full font-semibold text-sm hover:bg-gray-100 transition">
              {l.ctaTutor}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-12 px-5 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {l.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
            {l.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="px-8 py-4 bg-[#C4705A] text-white rounded-2xl font-semibold text-lg hover:bg-[#b35d48] transition shadow-lg">
              {l.heroCta1}
            </button>
            <button className="px-8 py-4 bg-white text-[#2D5A45] rounded-2xl font-semibold text-lg border-2 border-[#2D5A45] hover:bg-[#2D5A45] hover:text-white transition">
              {l.heroCta2}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['👩‍🏫','👨‍🏫','👩‍🔬','👨‍💻'].map((e,i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-[#E8E4DE] flex items-center justify-center text-sm border-2 border-white">{e}</div>
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">{l.heroSocial}</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-3 gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#2D5A45]">500+</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">{l.stat1}</div>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-2xl sm:text-3xl font-bold text-[#C4705A]">8%</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">{l.stat2}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#2D5A45]">10K+</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">{l.stat3}</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-5 max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">{l.howTitle}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🔍', title: l.step1Title, desc: l.step1Desc },
            { icon: '📅', title: l.step2Title, desc: l.step2Desc },
            { icon: '💳', title: l.step3Title, desc: l.step3Desc }
          ].map((step, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-md transition">
              <div className="w-14 h-14 bg-[#F0EDE8] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                {step.icon}
              </div>
              <div className="text-sm font-bold text-[#C4705A] mb-2">{lang==='ru'?'Шаг':'Step'} {i+1}</div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search */}
      <section className="px-5 max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6">{l.searchTitle}</h2>
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200 max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              placeholder={l.searchPlaceholder} 
              className="flex-1 px-5 py-4 rounded-xl bg-gray-50 outline-none text-base"
            />
            <button className="px-8 py-4 bg-[#C4705A] text-white rounded-xl font-semibold hover:bg-[#b35d48] transition">
              {l.searchBtn}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 items-center">
          <span className="text-sm text-gray-500 mr-1">{l.popular}</span>
          {['Математика', 'Английский', 'Физика', 'Русский', 'Программирование'].map(s => (
            <span key={s} className="px-4 py-1.5 bg-white rounded-full border text-sm hover:border-[#2D5A45] hover:text-[#2D5A45] cursor-pointer transition">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Tutors */}
      <section className="px-5 max-w-6xl mx-auto mb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">{l.tutorsTitle}</h2>
            <p className="text-gray-500">{l.tutorsSubtitle}</p>
          </div>
          <a href="#" className="hidden sm:block text-[#2D5A45] font-semibold hover:underline">{l.viewAll}</a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TUTORS.map((tutor) => (
            <div key={tutor.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition group">
              <div className="relative h-48 bg-gradient-to-br from-[#E8E4DE] to-[#D4CFC7] flex items-center justify-center">
                <span className="text-6xl transition-transform group-hover:scale-110 duration-300">{tutor.emoji}</span>
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#2D5A45] text-white text-xs font-semibold rounded-full">
                  {tutor.badge}
                </span>
                <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-[#1A1A1A] text-xs font-semibold rounded-full">
                  ⭐ {tutor.rating}
                </span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold">{tutor.name}</h3>
                </div>
                <p className="text-gray-400 text-xs mb-3">{tutor.city} • {tutor.experience} {l.exp} • {tutor.reviews} {l.reviews}</p>
                <p className="text-gray-600 text-sm mb-4">{tutor.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutor.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[#F0EDE8] text-[#2D5A45] rounded-full text-xs font-medium">{tag}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xl font-bold">{tutor.price} <span className="text-gray-400 text-sm font-normal">{l.perHour}</span></span>
                  <button className="text-[#2D5A45] font-semibold text-sm hover:text-[#C4705A] transition">{l.viewAll}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <a href="#" className="text-[#2D5A45] font-semibold">{l.viewAll}</a>
        </div>
      </section>

      {/* Marketplace preview */}
      <section className="px-5 max-w-6xl mx-auto mb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">{l.marketplaceTitle}</h2>
            <p className="text-gray-500">{l.marketplaceSubtitle}</p>
          </div>
          <a href="#" className="hidden sm:block text-[#2D5A45] font-semibold hover:underline">{l.marketplaceCta}</a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition cursor-pointer">
              <div className="w-10 h-10 bg-[#F0EDE8] rounded-xl flex items-center justify-center text-xl mb-3">📄</div>
              <h4 className="font-bold mb-1 leading-snug">{p.title}</h4>
              <p className="text-xs text-gray-400 mb-3">Автор: {p.author}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-[#C4705A]">{p.price} ₽</span>
                <span className="text-xs text-gray-400">{p.sales} {lang==='ru'?'продаж':'sales'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 max-w-6xl mx-auto mb-20">
        <div className="bg-[#2D5A45] rounded-3xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{l.ctaTitle}</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">{l.ctaText}</p>
          <button className="px-8 py-4 bg-white text-[#2D5A45] rounded-2xl font-bold text-lg hover:bg-gray-100 transition">
            {l.ctaBtn}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-gray-400 py-12 px-5">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <p className="text-white font-bold text-lg mb-2">{l.footerBrand}</p>
            <p className="text-sm">{l.footerTagline}</p>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">{l.footerCol1}</p>
            <ul className="space-y-2 text-sm">
              {l.footerCol1Links.map(link => <li key={link}><a href="#" className="hover:text-white transition">{link}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">{l.footerCol2}</p>
            <ul className="space-y-2 text-sm">
              {l.footerCol2Links.map(link => <li key={link}><a href="#" className="hover:text-white transition">{link}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">{l.footerCol3}</p>
            <ul className="space-y-2 text-sm">
              {l.footerCol3Links.map(link => <li key={link}><a href="#" className="hover:text-white transition">{link}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 border-t border-gray-800 text-center text-sm">
          {l.footerCopy}
        </div>
      </footer>
    </main>
  )
}

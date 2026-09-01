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
    bio: 'Готовлю к ЕГЭ и ОГЭ. Разбираю каждую ошибку до полного понимания.',
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
    bio: 'Разговорный английский и IELTS. Жил в Лондоне, знаю все нюансы экзамена.',
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
    bio: 'Физика с нуля до олимпиад. Помогаю понять логику, а не зубрить формулы.',
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

const REVIEWS = [
  { name: 'Кирилл', text: 'Нашёл репетитора по математике за 10 минут. Цена оказалась ниже, чем на других сайтах, потому что комиссия маленькая.', role: 'Ученик' },
  { name: 'Анна С.', text: 'Ушла с «Репетит» сюда. Комиссия 10% — почти вдвое меньше. За месяц заработала на 8 тыс. больше.', role: 'Репетитор' },
  { name: 'Елена', text: 'Купила методичку по английскому за 299 ₽ — лучше, чем платить за отдельное занятие по грамматике.', role: 'Ученик' }
]

export default function Home() {
  const [lang, setLang] = useState<'ru'|'en'>('ru')
  const [howTab, setHowTab] = useState<'student'|'tutor'>('student')

  const t = {
    ru: {
      navFind: 'Найти репетитора',
      navMarket: 'Маркетплейс',
      navHow: 'Как это работает',
      navBecome: 'Стать репетитором',
      heroTitle: 'Учись. Преподавай. Развивайся.',
      heroSubtitle: 'Платформа, где ученики находят лучших репетиторов, а репетиторы — зарабатывают больше и свободнее.',
      ctaFind: 'Найти репетитора',
      ctaBecome: 'Стать репетитором',
      heroSocial: 'Присоединились 500+ репетиторов и 2000+ учеников',
      stat1: 'репетиторов',
      stat2: 'комиссия платформы',
      stat3: 'учеников',
      forStudents: 'Для учеников',
      forTutors: 'Для репетиторов',
      stF1Title: 'Доступные цены',
      stF1Desc: 'Комиссия всего 10% — репетиторы не завышают цены, чтобы компенсировать процент платформе.',
      stF2Title: 'Проверенные преподаватели',
      stF2Desc: 'Каждый репетитор проходит проверку. Читай отзывы, смотри рейтинг и выбирай с уверенностью.',
      stF3Title: 'Всё для учёбы в одном месте',
      stF3Desc: 'Занятия + готовые методички, чек-листы и программы. Готовься эффективнее.',
      tuF1Title: 'Комиссия 10%',
      tuF1Desc: 'В 2 раза меньше, чем на крупных платформах. Зарабатывай больше на каждом занятии.',
      tuF2Title: 'Пассивный доход',
      tuF2Desc: 'Выкладывай свои методички, чек-листы и программы. Получай деньги, пока спишь.',
      tuF3Title: 'Полная свобода',
      tuF3Desc: 'Сам назначаешь цену, сам выбираешь график. Никаких обязательных часов и планов.',
      howTitle: 'Как это работает',
      howStudent: 'Я ученик',
      howTutor: 'Я репетитор',
      stStep1: 'Выбери репетитора',
      stStep1Desc: 'Фильтруй по предмету, цене, городу или формату. Читай отзывы реальных учеников.',
      stStep2: 'Запишись на занятие',
      stStep2Desc: 'Напиши репетитору напрямую или запишись через платформу. Первое занятие со скидкой.',
      stStep3: 'Плати справедливо',
      stStep3Desc: 'Оплата через платформу с защитой сделки. Комиссия всего 10%.',
      tuStep1: 'Создай профиль',
      tuStep1Desc: 'Расскажи о себе, своём опыте и предметах. Укажи цену и формат занятий.',
      tuStep2: 'Получай заявки',
      tuStep2Desc: 'Ученики находят тебя через поиск и отправляют запросы. Отвечай в удобное время.',
      tuStep3: 'Зарабатывай больше',
      tuStep3Desc: 'Проводи занятия и продавай свои материалы. Деньги приходят сразу после занятия.',
      tutorsTitle: 'Популярные репетиторы',
      tutorsSubtitle: 'Проверенные преподаватели с реальными отзывами',
      viewAll: 'Смотреть всех →',
      perHour: '₽/час',
      reviews: 'отзывов',
      exp: 'лет опыта',
      marketplaceTitle: 'Маркетплейс наработок',
      marketplaceSubtitle: 'Готовые материалы для подготовки от лучших репетиторов',
      marketplaceCta: 'Все материалы →',
      reviewsTitle: 'Что говорят о нас',
      ctaStudentTitle: 'Начни учиться эффективнее',
      ctaStudentText: 'Найди репетитора по нужному предмету за 5 минут. Проверенные преподаватели, честные цены, защита сделки.',
      ctaStudentBtn: 'Найти репетитора',
      ctaTutorTitle: 'Зарабатывай на своих знаниях',
      ctaTutorText: 'Регистрируйся бесплатно, устанавливай свою цену и получай доход с занятий и продаж материалов.',
      ctaTutorBtn: 'Стать репетитором',
      footerBrand: 'Tutor Connect',
      footerTagline: 'Платформа для учеников и репетиторов с комиссией 10%',
      footerCol1: 'Ученикам',
      footerCol1Links: ['Найти репетитора', 'Маркетплейс', 'Как это работает', 'Помощь'],
      footerCol2: 'Репетиторам',
      footerCol2Links: ['Стать репетитором', 'Калькулятор дохода', 'Мои материалы', 'FAQ'],
      footerCol3: 'О платформе',
      footerCol3Links: ['О нас', 'Блог', 'Цены', 'Контакты'],
      footerCopy: '© 2026 Tutor Connect. Все права защищены.'
    },
    en: {
      navFind: 'Find a tutor',
      navMarket: 'Marketplace',
      navHow: 'How it works',
      navBecome: 'Become a tutor',
      heroTitle: 'Learn. Teach. Grow.',
      heroSubtitle: 'A platform where students find the best tutors, and tutors earn more with freedom.',
      ctaFind: 'Find a tutor',
      ctaBecome: 'Become a tutor',
      heroSocial: '500+ tutors and 2000+ students already joined',
      stat1: 'tutors',
      stat2: 'platform fee',
      stat3: 'students',
      forStudents: 'For students',
      forTutors: 'For tutors',
      stF1Title: 'Fair prices',
      stF1Desc: 'Only 10% commission — tutors don\'t inflate prices to cover platform fees.',
      stF2Title: 'Verified teachers',
      stF2Desc: 'Every tutor is vetted. Read reviews, check ratings, and choose with confidence.',
      stF3Title: 'Everything in one place',
      stF3Desc: 'Lessons + study guides, checklists, and programs. Prepare more efficiently.',
      tuF1Title: '10% commission',
      tuF1Desc: '2x lower than major platforms. Earn more on every lesson.',
      tuF2Title: 'Passive income',
      tuF2Desc: 'Upload your guides and checklists. Earn money while you sleep.',
      tuF3Title: 'Total freedom',
      tuF3Desc: 'Set your own price and schedule. No mandatory hours or quotas.',
      howTitle: 'How it works',
      howStudent: 'I\'m a student',
      howTutor: 'I\'m a tutor',
      stStep1: 'Choose a tutor',
      stStep1Desc: 'Filter by subject, price, city or format. Read real student reviews.',
      stStep2: 'Book a lesson',
      stStep2Desc: 'Message directly or book through the platform. First lesson with a discount.',
      stStep3: 'Pay fairly',
      stStep3Desc: 'Secure payment through the platform. Only 10% commission.',
      tuStep1: 'Create a profile',
      tuStep1Desc: 'Tell about yourself, your experience and subjects. Set your price and format.',
      tuStep2: 'Get requests',
      tuStep2Desc: 'Students find you through search and send requests. Reply when convenient.',
      tuStep3: 'Earn more',
      tuStep3Desc: 'Teach lessons and sell your materials. Money arrives right after the lesson.',
      tutorsTitle: 'Popular tutors',
      tutorsSubtitle: 'Verified teachers with real reviews',
      viewAll: 'View all →',
      perHour: '₽/hour',
      reviews: 'reviews',
      exp: 'years exp',
      marketplaceTitle: 'Study materials marketplace',
      marketplaceSubtitle: 'Ready-made materials from top tutors',
      marketplaceCta: 'All materials →',
      reviewsTitle: 'What people say',
      ctaStudentTitle: 'Start learning smarter',
      ctaStudentText: 'Find a tutor for any subject in 5 minutes. Verified teachers, fair prices, secure deals.',
      ctaStudentBtn: 'Find a tutor',
      ctaTutorTitle: 'Monetize your knowledge',
      ctaTutorText: 'Register for free, set your own price and earn from lessons and material sales.',
      ctaTutorBtn: 'Become a tutor',
      footerBrand: 'Tutor Connect',
      footerTagline: 'Platform for students and tutors with 10% commission',
      footerCol1: 'For students',
      footerCol1Links: ['Find a tutor', 'Marketplace', 'How it works', 'Help'],
      footerCol2: 'For tutors',
      footerCol2Links: ['Become a tutor', 'Income calculator', 'My materials', 'FAQ'],
      footerCol3: 'About',
      footerCol3Links: ['About us', 'Blog', 'Pricing', 'Contacts'],
      footerCopy: '© 2026 Tutor Connect. All rights reserved.'
    }
  }

  const l = t[lang]

  const studentSteps = [
    { icon: '🔍', title: l.stStep1, desc: l.stStep1Desc },
    { icon: '📅', title: l.stStep2, desc: l.stStep2Desc },
    { icon: '💳', title: l.stStep3, desc: l.stStep3Desc }
  ]

  const tutorSteps = [
    { icon: '📝', title: l.tuStep1, desc: l.tuStep1Desc },
    { icon: '🔔', title: l.tuStep2, desc: l.tuStep2Desc },
    { icon: '💰', title: l.tuStep3, desc: l.tuStep3Desc }
  ]

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
              {l.navBecome}
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
              {l.ctaFind}
            </button>
            <button className="px-8 py-4 bg-white text-[#2D5A45] rounded-2xl font-semibold text-lg border-2 border-[#2D5A45] hover:bg-[#2D5A45] hover:text-white transition">
              {l.ctaBecome}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['👩‍🏫','👨‍🏫','👩‍🔬','👨‍💻','👩‍🎓'].map((e,i) => (
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
            <div className="text-2xl sm:text-3xl font-bold text-[#C4705A]">10%</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">{l.stat2}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#2D5A45]">2000+</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">{l.stat3}</div>
          </div>
        </div>
      </section>

      {/* For Students */}
      <section className="px-5 max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 text-[#2D5A45]">{l.forStudents}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-[#F0EDE8] rounded-xl flex items-center justify-center text-2xl mb-4">💰</div>
            <h3 className="font-bold text-lg mb-2">{l.stF1Title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{l.stF1Desc}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-[#F0EDE8] rounded-xl flex items-center justify-center text-2xl mb-4">✅</div>
            <h3 className="font-bold text-lg mb-2">{l.stF2Title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{l.stF2Desc}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-[#F0EDE8] rounded-xl flex items-center justify-center text-2xl mb-4">📚</div>
            <h3 className="font-bold text-lg mb-2">{l.stF3Title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{l.stF3Desc}</p>
          </div>
        </div>
      </section>

      {/* For Tutors */}
      <section className="px-5 max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 text-[#2D5A45]">{l.forTutors}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-[#F0EDE8] rounded-xl flex items-center justify-center text-2xl mb-4">📉</div>
            <h3 className="font-bold text-lg mb-2">{l.tuF1Title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{l.tuF1Desc}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-[#F0EDE8] rounded-xl flex items-center justify-center text-2xl mb-4">📄</div>
            <h3 className="font-bold text-lg mb-2">{l.tuF2Title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{l.tuF2Desc}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-[#F0EDE8] rounded-xl flex items-center justify-center text-2xl mb-4">🗓️</div>
            <h3 className="font-bold text-lg mb-2">{l.tuF3Title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{l.tuF3Desc}</p>
          </div>
        </div>
      </section>

      {/* How it works with tabs */}
      <section className="px-5 max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">{l.howTitle}</h2>
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 border border-gray-200 inline-flex">
            <button 
              onClick={() => setHowTab('student')} 
              className={`px-6 py-2 rounded-full text-sm font-bold transition ${howTab==='student'?'bg-[#2D5A45] text-white':'text-gray-600 hover:text-[#2D5A45]'}`}
            >
              {l.howStudent}
            </button>
            <button 
              onClick={() => setHowTab('tutor')} 
              className={`px-6 py-2 rounded-full text-sm font-bold transition ${howTab==='tutor'?'bg-[#2D5A45] text-white':'text-gray-600 hover:text-[#2D5A45]'}`}
            >
              {l.howTutor}
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {(howTab === 'student' ? studentSteps : tutorSteps).map((step, i) => (
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

      {/* Popular tutors */}
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
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#2D5A45] text-white text-xs font-semibold rounded-full">{tutor.badge}</span>
                <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-[#1A1A1A] text-xs font-semibold rounded-full">⭐ {tutor.rating}</span>
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
      </section>

      {/* Marketplace */}
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
              <p className="text-xs text-gray-400 mb-3">{lang==='ru'?'Автор':'Author'}: {p.author}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-[#C4705A]">{p.price} ₽</span>
                <span className="text-xs text-gray-400">{p.sales} {lang==='ru'?'продаж':'sales'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-5 max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">{l.reviewsTitle}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E8E4DE] flex items-center justify-center text-lg">💬</div>
                <div>
                  <p className="font-bold text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">«{r.text}»</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dual CTA */}
      <section className="px-5 max-w-6xl mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#2D5A45] rounded-3xl p-8 sm:p-10 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">{l.ctaStudentTitle}</h3>
            <p className="text-white/80 mb-6 leading-relaxed">{l.ctaStudentText}</p>
            <button className="px-8 py-3 bg-white text-[#2D5A45] rounded-2xl font-bold hover:bg-gray-100 transition">
              {l.ctaStudentBtn}
            </button>
          </div>
          <div className="bg-[#1A1A1A] rounded-3xl p-8 sm:p-10 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">{l.ctaTutorTitle}</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">{l.ctaTutorText}</p>
            <button className="px-8 py-3 bg-[#C4705A] text-white rounded-2xl font-bold hover:bg-[#b35d48] transition">
              {l.ctaTutorBtn}
            </button>
          </div>
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

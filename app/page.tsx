'use client'

import { useState } from 'react'

const TUTORS = [
  {
    id: '1',
    name: 'Анна Сергеевна',
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
  { name: 'Кирилл', text: 'Нашёл репетитора по математике за 10 минут. Цена ниже, чем на других сайтах, потому что комиссия маленькая.', role: 'Ученик' },
  { name: 'Анна С.', text: 'Ушла с «Репетит» сюда. Комиссия 10% — почти вдвое меньше. За месяц заработала на 8 тыс. больше.', role: 'Репетитор' },
  { name: 'Елена', text: 'Купила методичку по английскому за 299 ₽ — лучше, чем платить за отдельное занятие по грамматике.', role: 'Ученик' }
]

export default function Home() {
  const [lang, setLang] = useState<'ru'|'en'>('ru')
  const [howTab, setHowTab] = useState<'student'|'tutor'>('student')

  const t = {
    ru: {
      navFind: 'Найти репетитора', navMarket: 'Маркетплейс', navHow: 'Как это работает', navBecome: 'Стать репетитором',
      heroTitle: 'Учись. Преподавай. Развивайся.',
      heroSubtitle: 'Платформа, где ученики находят лучших репетиторов, а репетиторы — зарабатывают больше и свободнее.',
      ctaFind: 'Найти репетитора', ctaBecome: 'Стать репетитором',
      heroSocial: 'Присоединились 500+ репетиторов и 2000+ учеников',
      stat1: 'репетиторов', stat2: 'комиссия', stat3: 'учеников',
      forStudents: 'Для учеников', forTutors: 'Для репетиторов',
      stF1: 'Доступные цены', stF1d: 'Комиссия всего 10% — репетиторы не завышают цены, чтобы компенсировать процент платформе.',
      stF2: 'Проверенные преподаватели', stF2d: 'Каждый репетитор проходит проверку. Читай отзывы, смотри рейтинг и выбирай с уверенностью.',
      stF3: 'Всё для учёбы в одном месте', stF3d: 'Занятия + готовые методички, чек-листы и программы. Готовься эффективнее.',
      tuF1: 'Комиссия 10%', tuF1d: 'В 2 раза меньше, чем на крупных платформах. Зарабатывай больше на каждом занятии.',
      tuF2: 'Пассивный доход', tuF2d: 'Выкладывай свои методички, чек-листы и программы. Получай деньги, пока спишь.',
      tuF3: 'Полная свобода', tuF3d: 'Сам назначаешь цену, сам выбираешь график. Никаких обязательных часов.',
      howTitle: 'Как это работает', howStudent: 'Я ученик', howTutor: 'Я репетитор',
      stS1: 'Выбери репетитора', stS1d: 'Фильтруй по предмету, цене, городу или формату. Читай отзывы реальных учеников.',
      stS2: 'Запишись на занятие', stS2d: 'Напиши репетитору напрямую или запишись через платформу. Первое занятие со скидкой.',
      stS3: 'Плати справедливо', stS3d: 'Оплата через платформу с защитой сделки. Комиссия всего 10%.',
      tuS1: 'Создай профиль', tuS1d: 'Расскажи о себе, своём опыте и предметах. Укажи цену и формат занятий.',
      tuS2: 'Получай заявки', tuS2d: 'Ученики находят тебя через поиск и отправляют запросы. Отвечай в удобное время.',
      tuS3: 'Зарабатывай больше', tuS3d: 'Проводи занятия и продавай свои материалы. Деньги приходят сразу после занятия.',
      tutorsTitle: 'Популярные репетиторы', tutorsSub: 'Проверенные преподаватели с реальными отзывами',
      viewAll: 'Смотреть всех →', perHour: '₽/час', reviews: 'отзывов', exp: 'лет опыта',
      marketTitle: 'Маркетплейс наработок', marketSub: 'Готовые материалы для подготовки от лучших репетиторов', marketCta: 'Все материалы →',
      revTitle: 'Что говорят о нас',
      ctaStTitle: 'Начни учиться эффективнее', ctaStText: 'Найди репетитора по нужному предмету за 5 минут. Проверенные преподаватели, честные цены, защита сделки.', ctaStBtn: 'Найти репетитора',
      ctaTuTitle: 'Зарабатывай на своих знаниях', ctaTuText: 'Регистрируйся бесплатно, устанавливай свою цену и получай доход с занятий и продаж материалов.', ctaTuBtn: 'Стать репетитором',
      footerBrand: 'Tutor Connect', footerTag: 'Платформа для учеников и репетиторов с комиссией 10%',
      fc1: 'Ученикам', fc1l: ['Найти репетитора','Маркетплейс','Как это работает','Помощь'],
      fc2: 'Репетиторам', fc2l: ['Стать репетитором','Калькулятор дохода','Мои материалы','FAQ'],
      fc3: 'О платформе', fc3l: ['О нас','Блог','Цены','Контакты'],
      copy: '© 2026 Tutor Connect. Все права защищены.'
    },
    en: {
      navFind: 'Find a tutor', navMarket: 'Marketplace', navHow: 'How it works', navBecome: 'Become a tutor',
      heroTitle: 'Learn. Teach. Grow.',
      heroSubtitle: 'A platform where students find the best tutors, and tutors earn more with freedom.',
      ctaFind: 'Find a tutor', ctaBecome: 'Become a tutor',
      heroSocial: '500+ tutors and 2000+ students already joined',
      stat1: 'tutors', stat2: 'commission', stat3: 'students',
      forStudents: 'For students', forTutors: 'For tutors',
      stF1: 'Fair prices', stF1d: 'Only 10% commission — tutors don\'t inflate prices to cover platform fees.',
      stF2: 'Verified teachers', stF2d: 'Every tutor is vetted. Read reviews, check ratings, and choose with confidence.',
      stF3: 'Everything in one place', stF3d: 'Lessons + study guides, checklists, and programs. Prepare more efficiently.',
      tuF1: '10% commission', tuF1d: '2x lower than major platforms. Earn more on every lesson.',
      tuF2: 'Passive income', tuF2d: 'Upload your guides and checklists. Earn money while you sleep.',
      tuF3: 'Total freedom', tuF3d: 'Set your own price and schedule. No mandatory hours or quotas.',
      howTitle: 'How it works', howStudent: 'I\'m a student', howTutor: 'I\'m a tutor',
      stS1: 'Choose a tutor', stS1d: 'Filter by subject, price, city or format. Read real student reviews.',
      stS2: 'Book a lesson', stS2d: 'Message directly or book through the platform. First lesson with a discount.',
      stS3: 'Pay fairly', stS3d: 'Secure payment through the platform. Only 10% commission.',
      tuS1: 'Create a profile', tuS1d: 'Tell about yourself, your experience and subjects. Set your price and format.',
      tuS2: 'Get requests', tuS2d: 'Students find you through search and send requests. Reply when convenient.',
      tuS3: 'Earn more', tuS3d: 'Teach lessons and sell your materials. Money arrives right after the lesson.',
      tutorsTitle: 'Popular tutors', tutorsSub: 'Verified teachers with real reviews',
      viewAll: 'View all →', perHour: '₽/hour', reviews: 'reviews', exp: 'years exp',
      marketTitle: 'Study materials', marketSub: 'Ready-made materials from top tutors', marketCta: 'All materials →',
      revTitle: 'What people say',
      ctaStTitle: 'Start learning smarter', ctaStText: 'Find a tutor for any subject in 5 minutes. Verified teachers, fair prices, secure deals.', ctaStBtn: 'Find a tutor',
      ctaTuTitle: 'Monetize your knowledge', ctaTuText: 'Register for free, set your own price and earn from lessons and material sales.', ctaTuBtn: 'Become a tutor',
      footerBrand: 'Tutor Connect', footerTag: 'Platform for students and tutors with 10% commission',
      fc1: 'For students', fc1l: ['Find a tutor','Marketplace','How it works','Help'],
      fc2: 'For tutors', fc2l: ['Become a tutor','Income calculator','My materials','FAQ'],
      fc3: 'About', fc3l: ['About us','Blog','Pricing','Contacts'],
      copy: '© 2026 Tutor Connect. All rights reserved.'
    }
  }

  const l = t[lang]
  const steps = howTab === 'student' 
    ? [{i:'🔍',t:l.stS1,d:l.stS1d},{i:'📅',t:l.stS2,d:l.stS2d},{i:'💳',t:l.stS3,d:l.stS3d}]
    : [{i:'📝',t:l.tuS1,d:l.tuS1d},{i:'🔔',t:l.tuS2,d:l.tuS2d},{i:'💰',t:l.tuS3,d:l.tuS3d}]

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#F5F3EF; color:#1A1A1A; line-height:1.5; }
        .tc-container { max-width:1100px; margin:0 auto; padding:0 20px; }
        .tc-header { background:#2D5A45; color:white; position:sticky; top:0; z-index:50; box-shadow:0 1px 3px rgba(0,0,0,0.1); }
        .tc-header-inner { display:flex; justify-content:space-between; align-items:center; padding:16px 20px; max-width:1100px; margin:0 auto; }
        .tc-logo { font-size:20px; font-weight:800; letter-spacing:-0.5px; }
        .tc-nav { display:none; gap:24px; font-size:14px; color:rgba(255,255,255,0.8); }
        .tc-nav a { color:inherit; text-decoration:none; transition:0.2s; }
        .tc-nav a:hover { color:white; }
        .tc-lang { display:flex; gap:4px; background:rgba(255,255,255,0.2); border-radius:999px; padding:4px; }
        .tc-lang button { padding:4px 12px; border-radius:999px; border:none; font-size:12px; font-weight:700; cursor:pointer; transition:0.2s; background:transparent; color:rgba(255,255,255,0.8); }
        .tc-lang button.active { background:white; color:#2D5A45; }
        .tc-btn-header { display:none; padding:8px 20px; background:white; color:#2D5A45; border-radius:999px; border:none; font-weight:600; font-size:14px; cursor:pointer; }
        .tc-hero { padding:64px 20px 48px; max-width:1100px; margin:0 auto; }
        .tc-hero h1 { font-size:clamp(36px,6vw,64px); font-weight:800; line-height:1.1; margin-bottom:24px; }
        .tc-hero p { font-size:clamp(16px,2.5vw,20px); color:#555; margin-bottom:32px; max-width:600px; line-height:1.6; }
        .tc-hero-btns { display:flex; flex-direction:column; gap:12px; margin-bottom:24px; }
        .tc-btn-primary { padding:16px 32px; background:#C4705A; color:white; border-radius:16px; border:none; font-weight:700; font-size:16px; cursor:pointer; transition:0.2s; }
        .tc-btn-primary:hover { background:#b35d48; }
        .tc-btn-secondary { padding:16px 32px; background:white; color:#2D5A45; border-radius:16px; border:2px solid #2D5A45; font-weight:700; font-size:16px; cursor:pointer; transition:0.2s; }
        .tc-btn-secondary:hover { background:#2D5A45; color:white; }
        .tc-avatars { display:flex; align-items:center; gap:12px; }
        .tc-avatar-stack { display:flex; }
        .tc-avatar-stack span { width:32px; height:32px; border-radius:50%; background:#E8E4DE; display:flex; align-items:center; justify-content:center; font-size:14px; border:2px solid white; margin-left:-8px; }
        .tc-avatar-stack span:first-child { margin-left:0; }
        .tc-avatars p { font-size:14px; color:#666; font-weight:500; }
        .tc-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; max-width:1100px; margin:0 auto 64px; padding:0 20px; }
        .tc-stat { background:white; border-radius:16px; padding:24px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.05); border:1px solid #eee; }
        .tc-stat-num { font-size:clamp(24px,4vw,36px); font-weight:800; }
        .tc-stat-num.green { color:#2D5A45; }
        .tc-stat-num.orange { color:#C4705A; }
        .tc-stat-label { font-size:13px; color:#888; margin-top:4px; }
        .tc-section-title { font-size:22px; font-weight:700; margin-bottom:20px; color:#2D5A45; }
        .tc-section { max-width:1100px; margin:0 auto 48px; padding:0 20px; }
        .tc-cards { display:grid; grid-template-columns:1fr; gap:16px; }
        .tc-card { background:white; border-radius:16px; padding:24px; border:1px solid #eee; transition:0.2s; }
        .tc-card:hover { box-shadow:0 4px 12px rgba(0,0,0,0.08); }
        .tc-card-icon { width:48px; height:48px; background:#F0EDE8; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:16px; }
        .tc-card h3 { font-size:18px; font-weight:700; margin-bottom:8px; }
        .tc-card p { font-size:14px; color:#666; line-height:1.6; }
        .tc-tabs { display:flex; justify-content:center; margin-bottom:32px; }
        .tc-tabs-inner { background:white; border-radius:999px; padding:4px; border:1px solid #ddd; display:flex; }
        .tc-tab { padding:10px 24px; border-radius:999px; border:none; font-size:14px; font-weight:700; cursor:pointer; transition:0.2s; background:transparent; color:#666; }
        .tc-tab.active { background:#2D5A45; color:white; }
        .tc-steps { display:grid; grid-template-columns:1fr; gap:16px; }
        .tc-step { background:white; border-radius:16px; padding:32px 24px; text-align:center; border:1px solid #eee; }
        .tc-step-icon { width:56px; height:56px; background:#F0EDE8; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:24px; margin:0 auto 16px; }
        .tc-step-badge { font-size:12px; font-weight:700; color:#C4705A; margin-bottom:8px; }
        .tc-step h4 { font-size:18px; font-weight:700; margin-bottom:8px; }
        .tc-step p { font-size:14px; color:#666; line-height:1.6; }
        .tc-tutor-card { background:white; border-radius:24px; overflow:hidden; border:1px solid #eee; transition:0.2s; }
        .tc-tutor-card:hover { box-shadow:0 8px 24px rgba(0,0,0,0.1); }
        .tc-tutor-img { position:relative; height:200px; background:linear-gradient(135deg,#E8E4DE,#D4CFC7); display:flex; align-items:center; justify-content:center; }
        .tc-tutor-img span.emoji { font-size:64px; transition:0.3s; }
        .tc-tutor-card:hover .tc-tutor-img span.emoji { transform:scale(1.1); }
        .tc-badge { position:absolute; top:16px; left:16px; padding:6px 14px; background:#2D5A45; color:white; font-size:12px; font-weight:700; border-radius:999px; }
        .tc-rating { position:absolute; top:16px; right:16px; padding:6px 14px; background:rgba(255,255,255,0.9); color:#1A1A1A; font-size:12px; font-weight:700; border-radius:999px; }
        .tc-tutor-body { padding:24px; }
        .tc-tutor-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px; }
        .tc-tutor-header h3 { font-size:18px; font-weight:700; }
        .tc-tutor-meta { font-size:13px; color:#999; margin-bottom:12px; }
        .tc-tutor-bio { font-size:14px; color:#555; margin-bottom:16px; line-height:1.5; }
        .tc-tags { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px; }
        .tc-tag { padding:4px 12px; background:#F0EDE8; color:#2D5A45; border-radius:999px; font-size:13px; font-weight:500; }
        .tc-tutor-footer { display:flex; justify-content:space-between; align-items:center; padding-top:16px; border-top:1px solid #eee; }
        .tc-price { font-size:22px; font-weight:800; }
        .tc-price span { font-size:14px; color:#999; font-weight:400; }
        .tc-link { color:#2D5A45; font-weight:600; font-size:14px; text-decoration:none; }
        .tc-link:hover { color:#C4705A; }
        .tc-product { background:white; border-radius:16px; padding:20px; border:1px solid #eee; cursor:pointer; transition:0.2s; }
        .tc-product:hover { box-shadow:0 4px 12px rgba(0,0,0,0.08); }
        .tc-product-icon { width:40px; height:40px; background:#F0EDE8; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; margin-bottom:12px; }
        .tc-product h4 { font-size:15px; font-weight:700; margin-bottom:4px; line-height:1.4; }
        .tc-product-author { font-size:12px; color:#999; margin-bottom:12px; }
        .tc-product-footer { display:flex; justify-content:space-between; align-items:center; }
        .tc-product-price { font-size:18px; font-weight:800; color:#C4705A; }
        .tc-product-sales { font-size:12px; color:#999; }
        .tc-review { background:white; border-radius:16px; padding:24px; border:1px solid #eee; }
        .tc-review-header { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
        .tc-review-avatar { width:40px; height:40px; border-radius:50%; background:#E8E4DE; display:flex; align-items:center; justify-content:center; font-size:16px; }
        .tc-review-name { font-weight:700; font-size:14px; }
        .tc-review-role { font-size:12px; color:#999; }
        .tc-review-text { font-size:14px; color:#555; line-height:1.6; }
        .tc-cta-grid { display:grid; grid-template-columns:1fr; gap:16px; }
        .tc-cta-box { border-radius:24px; padding:40px 32px; text-align:center; color:white; }
        .tc-cta-box.green { background:#2D5A45; }
        .tc-cta-box.dark { background:#1A1A1A; }
        .tc-cta-box h3 { font-size:24px; font-weight:700; margin-bottom:12px; }
        .tc-cta-box p { opacity:0.8; margin-bottom:24px; line-height:1.6; font-size:15px; }
        .tc-cta-box button { padding:14px 28px; border-radius:14px; border:none; font-weight:700; font-size:15px; cursor:pointer; transition:0.2s; }
        .tc-footer { background:#1A1A1A; color:#999; padding:48px 20px 24px; }
        .tc-footer-inner { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr; gap:32px; }
        .tc-footer-brand { color:white; font-weight:700; font-size:18px; margin-bottom:6px; }
        .tc-footer-tag { font-size:14px; color:#888; }
        .tc-footer-col h4 { color:white; font-size:14px; font-weight:600; margin-bottom:16px; }
        .tc-footer-col ul { list-style:none; }
        .tc-footer-col li { margin-bottom:10px; }
        .tc-footer-col a { color:#999; text-decoration:none; font-size:14px; transition:0.2s; }
        .tc-footer-col a:hover { color:white; }
        .tc-footer-copy { text-align:center; padding-top:32px; margin-top:32px; border-top:1px solid #333; font-size:13px; color:#666; }
        .tc-section-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:24px; }
        .tc-section-header h2 { font-size:28px; font-weight:700; }
        .tc-section-header p { color:#888; font-size:15px; margin-top:4px; }
        .tc-market-header { margin-bottom:24px; }
        .tc-market-header h2 { font-size:28px; font-weight:700; }
        .tc-market-header p { color:#888; font-size:15px; margin-top:4px; }
        @media(min-width:640px){
          .tc-hero-btns { flex-direction:row; }
          .tc-cards { grid-template-columns:repeat(3,1fr); }
          .tc-steps { grid-template-columns:repeat(3,1fr); }
          .tc-tutor-grid { grid-template-columns:repeat(2,1fr); }
          .tc-product-grid { grid-template-columns:repeat(3,1fr); }
          .tc-review-grid { grid-template-columns:repeat(3,1fr); }
          .tc-cta-grid { grid-template-columns:repeat(2,1fr); }
          .tc-footer-inner { grid-template-columns:repeat(2,1fr); }
          .tc-nav { display:flex; }
          .tc-btn-header { display:block; }
        }
        @media(min-width:1024px){
          .tc-tutor-grid { grid-template-columns:repeat(3,1fr); }
          .tc-footer-inner { grid-template-columns:repeat(4,1fr); }
        }
      `}} />
      
      <header className="tc-header">
        <div className="tc-header-inner">
          <div style={{display:'flex',alignItems:'center',gap:32}}>
            <span className="tc-logo">Tutor Connect</span>
            <nav className="tc-nav">
              <a href="#">{l.navFind}</a>
              <a href="#">{l.navMarket}</a>
              <a href="#">{l.navHow}</a>
            </nav>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div className="tc-lang">
              <button className={lang==='ru'?'active':''} onClick={()=>setLang('ru')}>RU</button>
              <button className={lang==='en'?'active':''} onClick={()=>setLang('en')}>EN</button>
            </div>
            <button className="tc-btn-header">{l.navBecome}</button>
          </div>
        </div>
      </header>

      <section className="tc-hero">
        <h1>{l.heroTitle}</h1>
        <p>{l.heroSubtitle}</p>
        <div className="tc-hero-btns">
          <button className="tc-btn-primary">{l.ctaFind}</button>
          <button className="tc-btn-secondary">{l.ctaBecome}</button>
        </div>
        <div className="tc-avatars">
          <div className="tc-avatar-stack">
            {['👩‍🏫','👨‍🏫','👩‍🔬','👨‍💻','👩‍🎓'].map((e,i)=>(
              <span key={i}>{e}</span>
            ))}
          </div>
          <p>{l.heroSocial}</p>
        </div>
      </section>

      <section className="tc-stats">
        <div className="tc-stat">
          <div className="tc-stat-num green">500+</div>
          <div className="tc-stat-label">{l.stat1}</div>
        </div>
        <div className="tc-stat">
          <div className="tc-stat-num orange">10%</div>
          <div className="tc-stat-label">{l.stat2}</div>
        </div>
        <div className="tc-stat">
          <div className="tc-stat-num green">2000+</div>
          <div className="tc-stat-label">{l.stat3}</div>
        </div>
      </section>

      <section className="tc-section">
        <h2 className="tc-section-title">{l.forStudents}</h2>
        <div className="tc-cards">
          <div className="tc-card">
            <div className="tc-card-icon">💰</div>
            <h3>{l.stF1}</h3>
            <p>{l.stF1d}</p>
          </div>
          <div className="tc-card">
            <div className="tc-card-icon">✅</div>
            <h3>{l.stF2}</h3>
            <p>{l.stF2d}</p>
          </div>
          <div className="tc-card">
            <div className="tc-card-icon">📚</div>
            <h3>{l.stF3}</h3>
            <p>{l.stF3d}</p>
          </div>
        </div>
      </section>

      <section className="tc-section">
        <h2 className="tc-section-title">{l.forTutors}</h2>
        <div className="tc-cards">
          <div className="tc-card">
            <div className="tc-card-icon">📉</div>
            <h3>{l.tuF1}</h3>
            <p>{l.tuF1d}</p>
          </div>
          <div className="tc-card">
            <div className="tc-card-icon">📄</div>
            <h3>{l.tuF2}</h3>
            <p>{l.tuF2d}</p>
          </div>
          <div className="tc-card">
            <div className="tc-card-icon">🗓️</div>
            <h3>{l.tuF3}</h3>
            <p>{l.tuF3d}</p>
          </div>
        </div>
      </section>

      <section className="tc-section">
        <h2 style={{fontSize:28,fontWeight:700,textAlign:'center',marginBottom:32}}>{l.howTitle}</h2>
        <div className="tc-tabs">
          <div className="tc-tabs-inner">
            <button className={`tc-tab ${howTab==='student'?'active':''}`} onClick={()=>setHowTab('student')}>{l.howStudent}</button>
            <button className={`tc-tab ${howTab==='tutor'?'active':''}`} onClick={()=>setHowTab('tutor')}>{l.howTutor}</button>
          </div>
        </div>
        <div className="tc-steps">
          {steps.map((s,i)=>(
            <div key={i} className="tc-step">
              <div className="tc-step-icon">{s.i}</div>
              <div className="tc-step-badge">{lang==='ru'?'Шаг':'Step'} {i+1}</div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tc-section">
        <div className="tc-section-header">
          <div>
            <h2>{l.tutorsTitle}</h2>
            <p>{l.tutorsSub}</p>
          </div>
          <a href="#" className="tc-link" style={{display:'none'}}>{l.viewAll}</a>
        </div>
        <div className="tc-tutor-grid" style={{display:'grid',gap:20}}>
          {TUTORS.map(t=>(
            <div key={t.id} className="tc-tutor-card">
              <div className="tc-tutor-img">
                <span className="emoji">{t.emoji}</span>
                <span className="tc-badge">{t.badge}</span>
                <span className="tc-rating">⭐ {t.rating}</span>
              </div>
              <div className="tc-tutor-body">
                <div className="tc-tutor-header">
                  <h3>{t.name}</h3>
                </div>
                <div className="tc-tutor-meta">{t.city} • {t.experience} {l.exp} • {t.reviews} {l.reviews}</div>
                <div className="tc-tutor-bio">{t.bio}</div>
                <div className="tc-tags">
                  {t.tags.map(tag=><span key={tag} className="tc-tag">{tag}</span>)}
                </div>
                <div className="tc-tutor-footer">
                  <span className="tc-price">{t.price} <span>{l.perHour}</span></span>
                  <a href="#" className="tc-link">{l.viewAll}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tc-section">
        <div className="tc-market-header">
          <h2>{l.marketTitle}</h2>
          <p>{l.marketSub}</p>
        </div>
        <div className="tc-product-grid" style={{display:'grid',gap:16}}>
          {PRODUCTS.map((p,i)=>(
            <div key={i} className="tc-product">
              <div className="tc-product-icon">📄</div>
              <h4>{p.title}</h4>
              <div className="tc-product-author">{lang==='ru'?'Автор':'Author'}: {p.author}</div>
              <div className="tc-product-footer">
                <span className="tc-product-price">{p.price} ₽</span>
                <span className="tc-product-sales">{p.sales} {lang==='ru'?'продаж':'sales'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tc-section">
        <h2 style={{fontSize:28,fontWeight:700,textAlign:'center',marginBottom:32}}>{l.revTitle}</h2>
        <div className="tc-review-grid" style={{display:'grid',gap:16}}>
          {REVIEWS.map((r,i)=>(
            <div key={i} className="tc-review">
              <div className="tc-review-header">
                <div className="tc-review-avatar">💬</div>
                <div>
                  <div className="tc-review-name">{r.name}</div>
                  <div className="tc-review-role">{r.role}</div>
                </div>
              </div>
              <div className="tc-review-text">«{r.text}»</div>
            </div>
          ))}
        </div>
      </section>

      <section className="tc-section">
        <div className="tc-cta-grid">
          <div className="tc-cta-box green">
            <h3>{l.ctaStTitle}</h3>
            <p>{l.ctaStText}</p>
            <button style={{background:'white',color:'#2D5A45'}}>{l.ctaStBtn}</button>
          </div>
          <div className="tc-cta-box dark">
            <h3>{l.ctaTuTitle}</h3>
            <p>{l.ctaTuText}</p>
            <button style={{background:'#C4705A',color:'white'}}>{l.ctaTuBtn}</button>
          </div>
        </div>
      </section>

      <footer className="tc-footer">
        <div className="tc-footer-inner">
          <div>
            <div className="tc-footer-brand">{l.footerBrand}</div>
            <div className="tc-footer-tag">{l.footerTag}</div>
          </div>
          <div className="tc-footer-col">
            <h4>{l.fc1}</h4>
            <ul>{l.fc1l.map(link=><li key={link}><a href="#">{link}</a></li>)}</ul>
          </div>
          <div className="tc-footer-col">
            <h4>{l.fc2}</h4>
            <ul>{l.fc2l.map(link=><li key={link}><a href="#">{link}</a></li>)}</ul>
          </div>
          <div className="tc-footer-col">
            <h4>{l.fc3}</h4>
            <ul>{l.fc3l.map(link=><li key={link}><a href="#">{link}</a></li>)}</ul>
          </div>
        </div>
        <div className="tc-footer-copy">{l.copy}</div>
      </footer>
    </>
  )
}

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

const ALL_TUTORS = [
  {
    id: '1',
    name: 'Анна Сергеевна',
    rating: 4.9,
    reviews: 127,
    experience: 5,
    city: 'Москва',
    price: 1500,
    subjects: ['Математика', 'ЕГЭ', 'ОГЭ'],
    format: 'online',
    emoji: '🔢',
    badge: 'Топ-репетитор',
    description: 'Готовлю к ЕГЭ и ОГЭ. Разбираю каждую ошибку до полного понимания.'
  },
  {
    id: '2',
    name: 'Иван Петров',
    rating: 4.8,
    reviews: 89,
    experience: 3,
    city: 'Online',
    price: 1200,
    subjects: ['Английский', 'IELTS'],
    format: 'online',
    emoji: '🇬🇧',
    badge: 'Проверен',
    description: 'Разговорный английский и IELTS. Жил в Лондоне, знаю все нюансы экзамена.'
  },
  {
    id: '3',
    name: 'Мария Кузнецова',
    rating: 5.0,
    reviews: 56,
    experience: 7,
    city: 'Санкт-Петербург',
    price: 1800,
    subjects: ['Физика', 'Олимпиады'],
    format: 'offline',
    emoji: '⚛️',
    badge: 'Эксперт',
    description: 'Физика с нуля до олимпиад. Помогаю понять логику, а не зубрить формулы.'
  },
  {
    id: '4',
    name: 'Дмитрий Соколов',
    rating: 4.7,
    reviews: 42,
    experience: 4,
    city: 'Москва',
    price: 1300,
    subjects: ['История', 'Обществознание', 'ЕГЭ'],
    format: 'both',
    emoji: '🏛️',
    badge: 'Проверен',
    description: 'ЕГЭ по истории и обществознанию. Работаю по собственным методичкам.'
  },
  {
    id: '5',
    name: 'Елена Васильева',
    rating: 4.9,
    reviews: 203,
    experience: 10,
    city: 'Online',
    price: 2000,
    subjects: ['Русский язык', 'Литература', 'ЕГЭ'],
    format: 'online',
    emoji: '📖',
    badge: 'Топ-репетитор',
    description: 'Сочинения, анализ текстов, подготовка к ЕГЭ. 95% учеников на 80+ баллов.'
  },
  {
    id: '6',
    name: 'Алексей Морозов',
    rating: 4.6,
    reviews: 31,
    experience: 2,
    city: 'Казань',
    price: 900,
    subjects: ['Информатика', 'Программирование'],
    format: 'online',
    emoji: '💻',
    badge: 'Новый',
    description: 'Python, подготовка к олимпиадам по информатике. Доступно и с нуля.'
  }
]

const SUBJECTS = ['Все', 'Математика', 'Английский', 'Физика', 'Русский язык', 'История', 'Информатика', 'Литература']
const CITIES = ['Все', 'Москва', 'Санкт-Петербург', 'Казань', 'Online']
const FORMATS = [
  { key: 'all', label: 'Все' },
  { key: 'online', label: 'Онлайн' },
  { key: 'offline', label: 'Офлайн' },
  { key: 'both', label: 'Оба' }
]

export default function FindTutorPage() {
  const [search, setSearch] = useState('')
  const [subject, setSubject] = useState('Все')
  const [city, setCity] = useState('Все')
  const [format, setFormat] = useState('all')
  const [maxPrice, setMaxPrice] = useState(5000)
  const [sort, setSort] = useState<'rating' | 'price' | 'experience'>('rating')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let res = ALL_TUTORS.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()))
      const matchesSubject = subject === 'Все' || t.subjects.includes(subject)
      const matchesCity = city === 'Все' || t.city === city
      const matchesFormat = format === 'all' || t.format === format || t.format === 'both'
      const matchesPrice = t.price <= maxPrice
      return matchesSearch && matchesSubject && matchesCity && matchesFormat && matchesPrice
    })

    res.sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'price') return a.price - b.price
      if (sort === 'experience') return b.experience - a.experience
      return 0
    })

    return res
  }, [search, subject, city, format, maxPrice, sort])

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .ft-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .ft-container { max-width:1100px; margin:0 auto; padding:24px 20px; }
        .ft-title { font-size:28px; font-weight:800; margin-bottom:20px; color:#1A1A1A; }
        .ft-search { width:100%; padding:14px 18px; border-radius:14px; border:1px solid #ddd; background:white; font-size:15px; outline:none; margin-bottom:16px; }
        .ft-search:focus { border-color:#2D5A45; }
        .ft-filters { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:20px; align-items:center; }
        .ft-chip { padding:8px 16px; border-radius:999px; border:1px solid #ddd; background:white; font-size:13px; font-weight:600; cursor:pointer; transition:0.15s; color:#555; }
        .ft-chip:hover { border-color:#2D5A45; color:#2D5A45; }
        .ft-chip.active { background:#2D5A45; color:white; border-color:#2D5A45; }
        .ft-select { padding:8px 14px; border-radius:999px; border:1px solid #ddd; background:white; font-size:13px; font-weight:600; color:#555; outline:none; cursor:pointer; }
        .ft-range-wrap { display:flex; align-items:center; gap:8px; font-size:13px; color:#666; }
        .ft-range { width:120px; accent-color:#2D5A45; }
        .ft-sort { margin-left:auto; display:flex; align-items:center; gap:6px; font-size:13px; color:#666; }
        .ft-grid { display:grid; grid-template-columns:1fr; gap:20px; }
        .ft-card { background:white; border-radius:20px; overflow:hidden; border:1px solid #eee; transition:0.2s; }
        .ft-card:hover { box-shadow:0 8px 24px rgba(0,0,0,0.08); }
        .ft-img { position:relative; height:160px; background:linear-gradient(135deg,#E8E4DE,#D4CFC7); display:flex; align-items:center; justify-content:center; }
        .ft-img .emoji { font-size:56px; transition:0.3s; }
        .ft-card:hover .ft-img .emoji { transform:scale(1.1); }
        .ft-badge { position:absolute; top:12px; left:12px; padding:5px 12px; background:#2D5A45; color:white; font-size:11px; font-weight:700; border-radius:999px; }
        .ft-rating { position:absolute; top:12px; right:12px; padding:5px 12px; background:rgba(255,255,255,0.95); color:#1A1A1A; font-size:12px; font-weight:700; border-radius:999px; display:flex; align-items:center; gap:4px; }
        .ft-body { padding:20px; }
        .ft-name { font-size:17px; font-weight:700; margin-bottom:4px; }
        .ft-meta { font-size:12px; color:#999; margin-bottom:10px; }
        .ft-desc { font-size:13px; color:#555; line-height:1.5; margin-bottom:12px; }
        .ft-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px; }
        .ft-tag { padding:3px 10px; background:#F0EDE8; color:#2D5A45; border-radius:999px; font-size:12px; font-weight:500; }
        .ft-footer { display:flex; align-items:center; justify-content:space-between; padding-top:14px; border-top:1px solid #f0f0f0; }
        .ft-price { font-size:20px; font-weight:800; color:#1A1A1A; }
        .ft-price span { font-size:13px; color:#999; font-weight:400; }
        .ft-btn { padding:10px 20px; background:#C4705A; color:white; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; transition:0.2s; }
        .ft-btn:hover { background:#b35d48; }
        .ft-empty { text-align:center; padding:60px 20px; color:#888; }
        .ft-empty h3 { font-size:20px; font-weight:700; color:#1A1A1A; margin-bottom:8px; }
        .ft-mobile-toggle { display:none; width:100%; padding:12px; background:white; border:1px solid #ddd; border-radius:12px; font-weight:700; color:#2D5A45; margin-bottom:12px; cursor:pointer; }
        @media(min-width:640px){
          .ft-grid { grid-template-columns:repeat(2,1fr); }
          .ft-mobile-toggle { display:none !important; }
        }
        @media(min-width:1024px){
          .ft-grid { grid-template-columns:repeat(3,1fr); }
        }
        @media(max-width:639px){
          .ft-filters { display:${showFilters ? 'flex' : 'none'}; }
          .ft-mobile-toggle { display:block; }
        }
      `}} />

      <div className="ft-page">
        <div className="ft-container">
          <h1 className="ft-title">Найти репетитора</h1>

          {/* Поиск */}
          <input
            className="ft-search"
            placeholder="Поиск по имени или предмету..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {/* Мобильная кнопка фильтров */}
          <button className="ft-mobile-toggle" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
          </button>

          {/* Фильтры */}
          <div className="ft-filters">
            {SUBJECTS.map(s => (
              <button
                key={s}
                className={`ft-chip ${subject === s ? 'active' : ''}`}
                onClick={() => setSubject(s)}
              >{s}</button>
            ))}

            <select className="ft-select" value={city} onChange={e => setCity(e.target.value)}>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select className="ft-select" value={format} onChange={e => setFormat(e.target.value)}>
              {FORMATS.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
            </select>

            <div className="ft-range-wrap">
              <span>До {maxPrice} ₽</span>
              <input
                type="range"
                min={500}
                max={5000}
                step={100}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="ft-range"
              />
            </div>

            <div className="ft-sort">
              <span>Сортировать:</span>
              <select className="ft-select" value={sort} onChange={e => setSort(e.target.value as any)}>
                <option value="rating">По рейтингу</option>
                <option value="price">По цене</option>
                <option value="experience">По опыту</option>
              </select>
            </div>
          </div>

          {/* Результаты */}
          {filtered.length === 0 ? (
            <div className="ft-empty">
              <h3>Ничего не найдено</h3>
              <p>Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          ) : (
            <div className="ft-grid">
              {filtered.map(tutor => (
                <div key={tutor.id} className="ft-card">
                  <div className="ft-img">
                    <span className="emoji">{tutor.emoji}</span>
                    <span className="ft-badge">{tutor.badge}</span>
                    <span className="ft-rating">⭐ {tutor.rating}</span>
                  </div>
                  <div className="ft-body">
                    <div className="ft-name">{tutor.name}</div>
                    <div className="ft-meta">{tutor.city} • {tutor.experience} лет опыта • {tutor.reviews} отзывов</div>
                    <div className="ft-desc">{tutor.description}</div>
                    <div className="ft-tags">
                      {tutor.subjects.map(sub => (
                        <span key={sub} className="ft-tag">{sub}</span>
                      ))}
                    </div>
                    <div className="ft-footer">
                      <span className="ft-price">{tutor.price} <span>₽/час</span></span>
                      <button className="ft-btn">Записаться</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

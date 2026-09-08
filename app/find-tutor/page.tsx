'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

import { TUTORS as ALL_TUTORS } from '../data/tutors'


// Быстрые чипы — самые частые предметы
const QUICK_SUBJECTS = ['Все', 'Математика', 'Английский', 'Физика', 'Русский язык', 'История', 'Информатика', 'Литература']

// Полный список предметов для раскрывающегося списка на кнопке «Все»
const FULL_SUBJECTS = [
  'Английский', 'Астрономия', 'Биология', 'Дошкольники', 'Информатика',
  'Испанский', 'История', 'Итальянский', 'Китайский', 'Литература',
  'Логопед', 'Математика', 'Музыка', 'Начальная школа', 'Немецкий',
  'Обществознание', 'Русский как иностранный', 'Русский язык', 'Физика',
  'Французский', 'Химия', 'Экономика'
]

// Список городов по алфавиту (крупные и популярные города РФ + Онлайн)
const CITIES = [
  'Все',
  'Абакан', 'Альметьевск', 'Ангарск', 'Архангельск', 'Астрахань',
  'Балаково', 'Балашиха', 'Барнаул', 'Белгород', 'Березники', 'Бийск', 'Благовещенск', 'Братск', 'Брянск',
  'Великий Новгород', 'Владивосток', 'Владикавказ', 'Владимир', 'Волгоград', 'Волгодонск', 'Волжский', 'Вологда', 'Воронеж',
  'Грозный',
  'Дзержинск',
  'Екатеринбург',
  'Железногорск',
  'Златоуст',
  'Иваново', 'Ижевск', 'Иркутск',
  'Йошкар-Ола',
  'Казань', 'Калининград', 'Калуга', 'Кемерово', 'Киров', 'Ковров', 'Кострома', 'Краснодар', 'Красноярск', 'Курган', 'Курск',
  'Липецк',
  'Магнитогорск', 'Майкоп', 'Махачкала', 'Миасс', 'Москва', 'Мурманск',
  'Набережные Челны', 'Нальчик', 'Нижневартовск', 'Нижний Новгород', 'Нижний Тагил', 'Новокузнецк', 'Новороссийск', 'Новосибирск', 'Новочеркасск', 'Норильск',
  'Обнинск', 'Омск', 'Онлайн', 'Орёл', 'Оренбург', 'Орск',
  'Пенза', 'Пермь', 'Петрозаводск', 'Петропавловск-Камчатский', 'Подольск', 'Псков', 'Пятигорск',
  'Ростов-на-Дону', 'Рязань',
  'Самара', 'Санкт-Петербург', 'Саранск', 'Саратов', 'Севастополь', 'Северодвинск', 'Симферополь', 'Смоленск', 'Сочи', 'Ставрополь', 'Старый Оскол', 'Стерлитамак', 'Сургут', 'Сыктывкар',
  'Таганрог', 'Тамбов', 'Тверь', 'Тольятти', 'Томск', 'Тула', 'Тюмень',
  'Улан-Удэ', 'Ульяновск', 'Уфа',
  'Хабаровск', 'Химки',
  'Чебоксары', 'Челябинск', 'Череповец', 'Черкесск', 'Чита',
  'Элиста',
  'Южно-Сахалинск',
  'Якутск', 'Ярославль'
]

const FORMATS = [
  { key: 'all', label: 'Все' },
  { key: 'student', label: 'У ученика' },
  { key: 'tutor', label: 'У учителя' },
  { key: 'online', label: 'Онлайн' }
]

export default function FindTutorPage() {
  const [search, setSearch] = useState('')
  const [subject, setSubject] = useState('Все')
  const [subjectMenuOpen, setSubjectMenuOpen] = useState(false)
  const [city, setCity] = useState('Все')
  const [format, setFormat] = useState('all')
  const [maxPrice, setMaxPrice] = useState(10000)
  const [sort, setSort] = useState<'rating' | 'price' | 'experience'>('rating')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let res = ALL_TUTORS.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()))
      const matchesSubject = subject === 'Все' || t.subjects.includes(subject)
      const matchesCity = city === 'Все' || t.city === city
      const matchesFormat = format === 'all' || t.formats.includes(format)
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
        .ft-filters { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:12px; align-items:center; }
        .ft-chip { padding:8px 16px; border-radius:999px; border:1px solid #ddd; background:white; font-size:13px; font-weight:600; cursor:pointer; transition:0.15s; color:#555; }
        .ft-chip:hover { border-color:#2D5A45; color:#2D5A45; }
        .ft-chip.active { background:#2D5A45; color:white; border-color:#2D5A45; }
        .ft-select { padding:10px 16px; border-radius:999px; border:1px solid #ddd; background:white; font-size:13px; font-weight:600; color:#555; outline:none; cursor:pointer; }
        .ft-select:focus { border-color:#2D5A45; }
        .ft-subject-menu-wrap { position:relative; display:inline-block; }
        .ft-subject-menu { margin-top:8px; margin-bottom:12px; width:100%; max-width:320px; }
        .ft-range-wrap { display:flex; align-items:center; gap:8px; font-size:13px; color:#666; }
        .ft-range { width:120px; accent-color:#2D5A45; }
        .ft-sort { margin-left:auto; display:flex; align-items:center; gap:6px; font-size:13px; color:#666; }
        .ft-grid { display:grid; grid-template-columns:1fr; gap:20px; }
        .ft-card { background:white; border-radius:20px; overflow:hidden; border:1px solid #eee; transition:0.2s; min-width:0; }
.ft-card:hover { box-shadow:0 8px 24px rgba(0,0,0,0.08); }
.ft-banner { position:relative; height:76px; background:linear-gradient(135deg,#E8E4DE,#D4CFC7); }
.ft-badge { position:absolute; top:12px; left:12px; padding:5px 12px; background:#2D5A45; color:white; font-size:11px; font-weight:700; border-radius:999px; }
.ft-rating { position:absolute; top:12px; right:12px; padding:5px 12px; background:rgba(255,255,255,0.95); color:#1A1A1A; font-size:12px; font-weight:700; border-radius:999px; display:flex; align-items:center; gap:4px; }
.ft-avatar-wrap { display:flex; justify-content:center; margin-top:-44px; }
.ft-avatar { width:88px; height:88px; border-radius:50%; overflow:hidden; border:4px solid white; box-shadow:0 2px 10px rgba(0,0,0,0.1); background:#eee; transition:0.3s; }
.ft-card:hover .ft-avatar { transform:scale(1.05); }
.ft-avatar img { width:100%; height:100%; object-fit:cover; object-position:center 22%; display:block; }
.ft-body { padding:12px 20px 20px; text-align:center; }
.ft-name { font-size:17px; font-weight:700; margin-bottom:4px; }
.ft-meta { font-size:12px; color:#999; margin-bottom:10px; }
.ft-desc { font-size:13px; color:#555; line-height:1.5; margin-bottom:12px; text-align:left; }
        .ft-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px; }
.ft-tags { justify-content:center; }
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
          .ft-grid { grid-template-columns:repeat(2, minmax(0,1fr)); }
          .ft-mobile-toggle { display:none !important; }
        }
        @media(min-width:1024px){
          .ft-grid { grid-template-columns:repeat(3, minmax(0,1fr)); }
        }
        @media(max-width:639px){
          .ft-filters-wrap { display:${showFilters ? 'block' : 'none'}; }
          .ft-mobile-toggle { display:block; }
        }
      `}} />

      <div className="ft-page">
        <div className="ft-container">
          <h1 className="ft-title">Найти репетитора</h1>

          <input
            className="ft-search"
            placeholder="Поиск по имени или предмету..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <button className="ft-mobile-toggle" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
          </button>

          <div className="ft-filters-wrap">
            <div className="ft-filters">
              {QUICK_SUBJECTS.map(s => (
                <div key={s} className="ft-subject-menu-wrap">
                  <button
                    className={`ft-chip ${subject === s ? 'active' : ''}`}
                    onClick={() => {
                      if (s === 'Все') {
                        setSubjectMenuOpen(!subjectMenuOpen)
                        setSubject('Все')
                      } else {
                        setSubject(s)
                        setSubjectMenuOpen(false)
                      }
                    }}
                  >{s}{s === 'Все' ? (subjectMenuOpen ? ' ▲' : ' ▾') : ''}</button>
                </div>
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
                  max={10000}
                  step={250}
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

            {subjectMenuOpen && (
              <select
                className="ft-select ft-subject-menu"
                value={subject}
                onChange={e => {
                  setSubject(e.target.value)
                  setSubjectMenuOpen(false)
                }}
              >
                <option value="Все">Все предметы</option>
                {FULL_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="ft-empty">
              <h3>Ничего не найдено</h3>
              <p>Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          ) : (
            <div className="ft-grid">
              {filtered.map(tutor => (
  <Link key={tutor.id} href={`/tutors/${tutor.id}`} className="ft-card" style={{textDecoration:'none',color:'inherit',display:'block'}}>
    <div className="ft-img">
      <img src={tutor.photo} alt={tutor.name} />
      <span className="ft-badge">{tutor.badge}</span>
      <span className="ft-rating">⭐ {tutor.rating}</span>
    </div>
    <div className="ft-body">
      <div className="ft-name">{tutor.name}</div>
      <div className="ft-meta">{tutor.city} • {tutor.experience} лет опыта • {tutor.reviews} отзывов</div>
      <div className="ft-desc">{tutor.bio}</div>
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
  </Link>
))}

            </div>
          )}
        </div>
      </div>
    </>
  )
}

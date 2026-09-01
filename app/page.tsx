'use client'

import { useEffect, useState } from 'react'

const MOCK_TUTORS = [
  {
    profile_id: '1',
    rating: 4.9,
    experience_years: 5,
    bio: 'Готовлю к ЕГЭ и ОГЭ по математике. Индивидуальный подход к каждому ученику.',
    price_per_hour: 1500,
    profiles: { full_name: 'Анна Сергеевна', city: 'Москва', avatar_url: null },
    tutor_subjects: [{ subjects: { name: 'Математика' } }, { subjects: { name: 'ЕГЭ' } }]
  },
  {
    profile_id: '2',
    rating: 4.8,
    experience_years: 3,
    bio: 'Английский для детей и взрослых. Разговорная практика и подготовка к экзаменам.',
    price_per_hour: 1200,
    profiles: { full_name: 'Иван Петров', city: 'Online', avatar_url: null },
    tutor_subjects: [{ subjects: { name: 'Английский' } }, { subjects: { name: 'IELTS' } }]
  },
  {
    profile_id: '3',
    rating: 5.0,
    experience_years: 7,
    bio: 'Физика с нуля до олимпиад. Помогаю понять, а не зазубрить.',
    price_per_hour: 1800,
    profiles: { full_name: 'Мария Кузнецова', city: 'Санкт-Петербург', avatar_url: null },
    tutor_subjects: [{ subjects: { name: 'Физика' } }, { subjects: { name: 'Олимпиады' } }]
  }
]

export default function Home() {
  const [tutors, setTutors] = useState<any[]>([])
  const [lang, setLang] = useState<'ru'|'en'>('ru')
  const [loading, setLoading] = useState(true)

  const t = {
    ru: {
      logo: 'Tutor Connect',
      cta: 'Стать репетитором',
      subtitle: 'Найдите своего идеального учителя',
      title: 'Репетиторы, которые делают прогресс возможным.',
      searchPlaceholder: 'Поиск по предмету, цели или репетитору',
      searchBtn: 'Найти',
      tutorsCount: 'репетиторов готовы помочь. Комиссия всего 8%.',
      allSubjects: 'Все предметы',
      anyPrice: 'Любая цена',
      anyRating: 'Любой рейтинг',
      whyUs: 'Почему именно мы',
      commission: 'Комиссия 8%',
      directPay: 'Прямая оплата',
      marketplace: 'Маркетплейс материалов',
      startHere: 'Начните здесь',
      meetPeople: 'Люди, у которых стоит учиться.',
      browseAll: 'Смотреть всех репетиторов',
      available: 'Доступен',
      perHour: '₽/час',
      viewProfile: 'Профиль →',
      noTutors: 'Пока нет репетиторов',
      beFirst: 'Будьте первым!',
      footerBrand: 'Tutor Connect',
      footerTag: 'Честная платформа • Комиссия 8%'
    },
    en: {
      logo: 'Tutor Connect',
      cta: 'Become a tutor',
      subtitle: 'Find your perfect teacher',
      title: 'Tutors who make progress feel possible.',
      searchPlaceholder: 'Search a subject, goal, or tutor',
      searchBtn: 'Search',
      tutorsCount: 'tutors ready to help. Only 8% commission.',
      allSubjects: 'All subjects',
      anyPrice: 'Any price',
      anyRating: 'Any rating',
      whyUs: 'Why choose us',
      commission: '8% commission',
      directPay: 'Direct payment',
      marketplace: 'Materials marketplace',
      startHere: 'A good place to begin',
      meetPeople: 'Meet a few people worth learning from.',
      browseAll: 'Browse all tutors',
      available: 'Available',
      perHour: '₽/hour',
      viewProfile: 'View profile →',
      noTutors: 'No tutors yet',
      beFirst: 'Be the first!',
      footerBrand: 'Tutor Connect',
      footerTag: 'Fair platform • 8% commission'
    }
  }

  const l = t[lang]

  useEffect(() => {
    const timer = setTimeout(() => {
      setTutors(MOCK_TUTORS)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#F5F3EF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: 40, height: 40, border: '4px solid #2D5A45', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#2D5A45', fontSize: 14, fontWeight: 500 }}>Загрузка...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: '#F5F3EF', color: '#1A1A1A' }}>
      <header style={{ background: '#2D5A45', color: 'white', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: '-0.5px' }}>{l.logo}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: 4 }}>
              <button onClick={() => setLang('ru')} style={{ padding: '4px 12px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 'bold', cursor: 'pointer', background: lang==='ru'?'white':'transparent', color: lang==='ru'?'#2D5A45':'rgba(255,255,255,0.8)' }}>RU</button>
              <button onClick={() => setLang('en')} style={{ padding: '4px 12px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 'bold', cursor: 'pointer', background: lang==='en'?'white':'transparent', color: lang==='en'?'#2D5A45':'rgba(255,255,255,0.8)' }}>EN</button>
            </div>
            <button style={{ padding: '8px 20px', background: 'white', color: '#2D5A45', borderRadius: 999, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>{l.cta}</button>
          </div>
        </div>
      </header>

      <section style={{ padding: '64px 20px 48px', maxWidth: 1024, margin: '0 auto' }}>
        <p style={{ color: '#C4705A', fontWeight: 600, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{l.subtitle}</p>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 'bold', lineHeight: 1.15, marginBottom: 24, maxWidth: 640 }}>{l.title}</h1>
        <p style={{ color: '#666', fontSize: 18, marginBottom: 32 }}>{tutors.length} {l.tutorsCount}</p>

        <div style={{ background: 'white', borderRadius: 16, padding: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e5e5e5', maxWidth: 640 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input placeholder={l.searchPlaceholder} style={{ flex: 1, padding: '12px 16px', borderRadius: 12, border: 'none', background: '#f9f9f9', outline: 'none', fontSize: 16 }} />
            <button style={{ padding: '12px 32px', background: '#C4705A', color: 'white', borderRadius: 12, border: 'none', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>{l.searchBtn}</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
          <span style={{ padding: '8px 16px', background: 'white', borderRadius: 999, border: '1px solid #e5e5e5', fontSize: 14 }}>{l.allSubjects} ▼</span>
          <span style={{ padding: '8px 16px', background: 'white', borderRadius: 999, border: '1px solid #e5e5e5', fontSize: 14 }}>{l.anyPrice} ▼</span>
          <span style={{ padding: '8px 16px', background: 'white', borderRadius: 999, border: '1px solid #e5e5e5', fontSize: 14 }}>{l.anyRating} ▼</span>
        </div>
      </section>

      <section style={{ padding: '0 20px', maxWidth: 1024, margin: '0 auto', marginBottom: 48 }}>
        <p style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{l.whyUs}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 32px', fontSize: 14, color: '#555' }}>
          <span>✓ {l.commission}</span>
          <span>✓ {l.directPay}</span>
          <span>✓ {l.marketplace}</span>
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: 1024, margin: '0 auto' }}>
        <p style={{ color: '#C4705A', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{l.startHere}</p>
        <h2 style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 32 }}>{l.meetPeople}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {tutors.map((tutor) => (
            <div key={tutor.profile_id} style={{ background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
              <div style={{ position: 'relative', height: 224, background: 'linear-gradient(135deg, #E8E4DE, #D4CFC7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 64 }}>👤</span>
                <span style={{ position: 'absolute', top: 16, left: 16, padding: '4px 12px', background: '#2D5A45', color: 'white', fontSize: 12, fontWeight: 600, borderRadius: 999 }}>{l.available}</span>
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 'bold' }}>{tutor.profiles?.full_name || 'Tutor'}</h3>
                  <span style={{ color: '#C4705A', fontWeight: 'bold' }}>⭐ {tutor.rating}</span>
                </div>
                <p style={{ color: '#888', fontSize: 14, marginBottom: 12 }}>{tutor.profiles?.city || 'Online'} • {tutor.experience_years} {lang==='ru'?'лет опыта':'years exp'}</p>
                <p style={{ color: '#666', marginBottom: 16, fontSize: 14, lineHeight: 1.5 }}>{tutor.bio || ''}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                  {tutor.tutor_subjects?.map((ts: any, i: number) => (
                    <span key={i} style={{ padding: '4px 12px', background: '#F0EDE8', color: '#2D5A45', borderRadius: 999, fontSize: 14 }}>{ts.subjects?.name}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #eee' }}>
                  <span style={{ fontSize: 24, fontWeight: 'bold' }}>{tutor.price_per_hour} <span style={{ color: '#bbb', fontSize: 14, fontWeight: 'normal' }}>{l.perHour}</span></span>
                  <button style={{ color: '#2D5A45', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>{l.viewProfile}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: '#1A1A1A', color: '#999', padding: '48px 20px', textAlign: 'center' }}>
        <p style={{ color: 'white', fontWeight: 600, marginBottom: 4 }}>{l.footerBrand}</p>
        <p style={{ fontSize: 14 }}>{l.footerTag}</p>
      </footer>
    </main>
  )
}

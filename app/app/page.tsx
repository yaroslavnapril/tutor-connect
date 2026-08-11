'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qhdupmlofuqdrywlandd.supabase.co',
  'sb_publishable_2RSH-Db4GEEN9K6W32b4gA_kEdRakFe'
)

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
    async function load() {
      const { data } = await supabase
        .from('tutors')
        .select('*, profiles(full_name, city, avatar_url), tutor_subjects(subjects(name))')
        .eq('is_verified', true)
        .order('rating', { ascending: false })
        .limit(10)
      setTutors(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#2D5A45] border-t-transparent rounded-full animate-spin"/>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#F5F3EF] text-[#1A1A1A]">
      <header className="bg-[#2D5A45] text-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 py-4 flex justify-between items-center">
          <span className="text-xl font-bold tracking-tight">{l.logo}</span>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-white/20 rounded-full p-1">
              <button onClick={() => setLang('ru')} className={`px-3 py-1 rounded-full text-xs font-bold ${lang==='ru'?'bg-white text-[#2D5A45]':'text-white/80'}`}>RU</button>
              <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-xs font-bold ${lang==='en'?'bg-white text-[#2D5A45]':'text-white/80'}`}>EN</button>
            </div>
            <button className="px-5 py-2 bg-white text-[#2D5A45] rounded-full font-semibold text-sm">{l.cta}</button>
          </div>
        </div>
      </header>

      <section className="pt-16 pb-12 px-5 max-w-5xl mx-auto">
        <p className="text-[#C4705A] font-semibold text-sm tracking-widest uppercase mb-4">{l.subtitle}</p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 max-w-2xl">{l.title}</h1>
        <p className="text-gray-600 text-lg mb-8">{tutors.length} {l.tutorsCount}</p>

        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200 max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-2">
            <input placeholder={l.searchPlaceholder} className="flex-1 px-4 py-3 rounded-xl bg-gray-50 outline-none"/>
            <button className="px-8 py-3 bg-[#C4705A] text-white rounded-xl font-semibold">{l.searchBtn}</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <span className="px-4 py-2 bg-white rounded-full border text-sm">{l.allSubjects} ▼</span>
          <span className="px-4 py-2 bg-white rounded-full border text-sm">{l.anyPrice} ▼</span>
          <span className="px-4 py-2 bg-white rounded-full border text-sm">{l.anyRating} ▼</span>
        </div>
      </section>

      <section className="px-5 max-w-5xl mx-auto mb-12">
        <p className="text-gray-500 text-sm font-semibold tracking-widest uppercase mb-4">{l.whyUs}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
          <span>✓ {l.commission}</span>
          <span>✓ {l.directPay}</span>
          <span>✓ {l.marketplace}</span>
        </div>
      </section>

      <section className="px-5 max-w-5xl mx-auto pb-20">
        <p className="text-[#C4705A] text-sm font-semibold tracking-widest uppercase mb-4">{l.startHere}</p>
        <h2 className="text-3xl font-bold mb-8">{l.meetPeople}</h2>

        {tutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutors.map((tutor) => (
              <div key={tutor.profile_id} className="bg-white rounded-3xl overflow-hidden shadow-sm border hover:shadow-md transition">
                <div className="relative h-56 bg-gradient-to-br from-[#E8E4DE] to-[#D4CFC7] flex items-center justify-center">
                  <span className="text-6xl">👤</span>
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#2D5A45] text-white text-xs font-semibold rounded-full">{l.available}</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{tutor.profiles?.full_name || 'Tutor'}</h3>
                    <span className="text-[#C4705A] font-bold">⭐ {tutor.rating}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">{tutor.profiles?.city || 'Online'} • {tutor.experience_years} {lang==='ru'?'лет опыта':'years exp'}</p>
                  <p className="text-gray-600 mb-4 text-sm">{tutor.bio || ''}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutor.tutor_subjects?.map((ts: any, i: number) => (
                      <span key={i} className="px-3 py-1 bg-[#F0EDE8] text-[#2D5A45] rounded-full text-sm">{ts.subjects?.name}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-2xl font-bold">{tutor.price_per_hour} <span className="text-gray-400 text-sm font-normal">{l.perHour}</span></span>
                    <button className="text-[#2D5A45] font-semibold">{l.viewProfile}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border">
            <div className="text-5xl mb-4">👋</div>
            <h3 className="text-xl font-bold mb-2">{l.noTutors}</h3>
            <button className="px-8 py-3 bg-[#2D5A45] text-white rounded-full font-semibold">{l.beFirst}</button>
          </div>
        )}
      </section>

      <footer className="bg-[#1A1A1A] text-gray-400 py-12 text-center">
        <p className="text-white font-semibold mb-1">{l.footerBrand}</p>
        <p className="text-sm">{l.footerTag}</p>
      </footer>
    </main>
  )
}

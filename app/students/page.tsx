'use client'

import { useState, useEffect } from 'react'
import { Booking } from '../data/bookings'
import { CURRENT_TUTOR_ID } from '../data/currentUser'
import { loadAllBookings } from '../data/bookingHelpers'

interface StudentSummary {
  name: string
  lessonsCount: number
  totalEarned: number
  lastDate: string
  subjects: string[]
}

export default function StudentsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setBookings(loadAllBookings())
  }, [])

  if (!mounted) return null

  const mine = bookings.filter(b => b.tutorId === CURRENT_TUTOR_ID && (b.status === 'confirmed' || b.status === 'completed'))

  const map: Record<string, StudentSummary> = {}
  mine.forEach(b => {
    if (!map[b.studentName]) {
      map[b.studentName] = { name: b.studentName, lessonsCount: 0, totalEarned: 0, lastDate: b.date, subjects: [] }
    }
    const s = map[b.studentName]
    s.lessonsCount += 1
    s.totalEarned += b.price
    if (b.date > s.lastDate) s.lastDate = b.date
    if (!s.subjects.includes(b.subject)) s.subjects.push(b.subject)
  })

  const students = Object.values(map).sort((a, b) => b.lastDate.localeCompare(a.lastDate))

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .st-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .st-container { max-width:700px; margin:0 auto; padding:24px 20px; }
        .st-title { font-size:28px; font-weight:800; margin-bottom:6px; color:#1A1A1A; }
        .st-subtitle { font-size:15px; color:#888; margin-bottom:24px; }
        .st-list { display:flex; flex-direction:column; gap:14px; }
        .st-card { background:white; border-radius:18px; padding:20px; border:1px solid #eee; }
        .st-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
        .st-name { font-weight:700; font-size:16px; }
        .st-last { font-size:12px; color:#999; }
        .st-subjects { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; }
        .st-subject-tag { padding:4px 12px; background:#F0EDE8; color:#2D5A45; border-radius:999px; font-size:12px; font-weight:600; }
        .st-stats { display:flex; gap:20px; padding-top:14px; border-top:1px solid #f0f0f0; }
        .st-stat-label { font-size:11px; color:#999; margin-bottom:2px; }
        .st-stat-value { font-size:15px; font-weight:800; color:#1A1A1A; }
        .st-empty { text-align:center; padding:48px 20px; color:#999; background:white; border-radius:18px; border:1px dashed #ddd; }
      `}} />
      <div className="st-page">
        <div className="st-container">
          <h1 className="st-title">Ученики</h1>
          <p className="st-subtitle">Ученики, с которыми у вас есть занятия</p>

          {students.length === 0 ? (
            <div className="st-empty">Пока нет учеников с подтверждёнными занятиями</div>
          ) : (
            <div className="st-list">
              {students.map(s => (
                <div key={s.name} className="st-card">
                  <div className="st-top">
                    <div className="st-name">{s.name}</div>
                    <div className="st-last">Последнее: {formatDate(s.lastDate)}</div>
                  </div>
                  <div className="st-subjects">
                    {s.subjects.map(subj => <span key={subj} className="st-subject-tag">{subj}</span>)}
                  </div>
                  <div className="st-stats">
                    <div>
                      <div className="st-stat-label">Занятий</div>
                      <div className="st-stat-value">{s.lessonsCount}</div>
                    </div>
                    <div>
                      <div className="st-stat-label">Заработано</div>
                      <div className="st-stat-value">{s.totalEarned} ₽</div>
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

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Booking } from '../data/bookings'
import { CURRENT_STUDENT_NAME } from '../data/currentUser'
import { TUTORS } from '../data/tutors'
import { loadAllBookings } from '../data/bookingHelpers'

const STATUS_LABELS: Record<Booking['status'], string> = {
  pending: 'Ожидает подтверждения',
  confirmed: 'Подтверждено',
  completed: 'Завершено',
  cancelled: 'Отклонено'
}

export default function LessonsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setBookings(loadAllBookings())
  }, [])

  if (!mounted) return null

  const myBookings = bookings.filter(b => b.studentName === CURRENT_STUDENT_NAME)
  const today = new Date().toISOString().slice(0, 10)

  const upcoming = myBookings
    .filter(b => b.date >= today && b.status !== 'cancelled' && b.status !== 'completed')
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  const past = myBookings
    .filter(b => b.date < today || b.status === 'completed' || b.status === 'cancelled')
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))

  const shown = tab === 'upcoming' ? upcoming : past

  const tutorFor = (tutorId: string) => TUTORS.find(t => t.id === tutorId)

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .lp-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .lp-container { max-width:700px; margin:0 auto; padding:24px 20px; }
        .lp-title { font-size:28px; font-weight:800; margin-bottom:20px; color:#1A1A1A; }
        .lp-tabs { display:flex; gap:8px; margin-bottom:20px; }
        .lp-tab { flex:1; padding:12px; border-radius:12px; border:1px solid #ddd; background:white; font-size:14px; font-weight:700; cursor:pointer; color:#666; }
        .lp-tab.active { background:#2D5A45; color:white; border-color:#2D5A45; }
        .lp-list { display:flex; flex-direction:column; gap:14px; }
        .lp-card { background:white; border-radius:18px; padding:18px 20px; border:1px solid #eee; display:flex; gap:14px; align-items:center; text-decoration:none; color:inherit; }
        .lp-avatar { width:52px; height:52px; border-radius:50%; overflow:hidden; flex-shrink:0; background:#eee; }
        .lp-avatar img { width:100%; height:100%; object-fit:cover; object-position:center 22%; }
        .lp-info { flex:1; min-width:0; }
        .lp-name { font-weight:700; font-size:15px; margin-bottom:2px; }
        .lp-subject { font-size:13px; color:#888; margin-bottom:6px; }
        .lp-datetime { font-size:13px; color:#444; font-weight:600; }
        .lp-status { font-size:11px; font-weight:700; padding:4px 10px; border-radius:999px; white-space:nowrap; }
        .lp-status.pending { background:#FDF3E3; color:#B8860B; }
        .lp-status.confirmed { background:#E6F0EA; color:#2D5A45; }
        .lp-status.completed { background:#EFEFEF; color:#888; }
        .lp-status.cancelled { background:#F5E6E2; color:#C4705A; }
        .lp-empty { text-align:center; padding:48px 20px; color:#999; background:white; border-radius:18px; border:1px dashed #ddd; }
        .lp-empty a { color:#2D5A45; font-weight:600; }
      `}} />
      <div className="lp-page">
        <div className="lp-container">
          <h1 className="lp-title">Мои занятия</h1>

          <div className="lp-tabs">
            <button className={`lp-tab ${tab === 'upcoming' ? 'active' : ''}`} onClick={() => setTab('upcoming')}>Предстоящие</button>
            <button className={`lp-tab ${tab === 'past' ? 'active' : ''}`} onClick={() => setTab('past')}>Прошедшие</button>
          </div>

          {shown.length === 0 ? (
            <div className="lp-empty">
              {tab === 'upcoming' ? 'Пока нет предстоящих занятий.' : 'Пока нет прошедших занятий.'}<br />
              <Link href="/find-tutor">Найти репетитора →</Link>
            </div>
          ) : (
            <div className="lp-list">
              {shown.map(b => {
                const tutor = tutorFor(b.tutorId)
                return (
                  <Link key={b.id} href={`/tutors/${b.tutorId}`} className="lp-card">
                    <div className="lp-avatar">
                      {tutor && <img src={tutor.photo} alt={tutor.name} />}
                    </div>
                    <div className="lp-info">
                      <div className="lp-name">{tutor?.name || 'Репетитор'}</div>
                      <div className="lp-subject">{b.subject} • {b.duration} мин • {b.format === 'online' ? 'Онлайн' : 'Очно'}</div>
                      <div className="lp-datetime">{formatDate(b.date)}, {b.time}</div>
                    </div>
                    <span className={`lp-status ${b.status}`}>{STATUS_LABELS[b.status]}</span>
                  </Link>
                )
              })}
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

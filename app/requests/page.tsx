'use client'

import { useState, useEffect } from 'react'
import { BOOKINGS, Booking } from '../data/bookings'
import { CURRENT_TUTOR_ID } from '../data/currentUser'

export default function RequestsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [mounted, setMounted] = useState(false)

  const loadBookings = () => {
    const saved = localStorage.getItem('tc_bookings')
    const custom: Booking[] = saved ? JSON.parse(saved) : []
    const overridesSaved = localStorage.getItem('tc_booking_overrides')
    const overrides: Record<string, Booking['status']> = overridesSaved ? JSON.parse(overridesSaved) : {}

    const merged = [...custom, ...BOOKINGS].map(b =>
      overrides[b.id] ? { ...b, status: overrides[b.id] } : b
    )
    setBookings(merged)
  }

  useEffect(() => {
    setMounted(true)
    loadBookings()
  }, [])

  if (!mounted) return null

  const myPending = bookings
    .filter(b => b.tutorId === CURRENT_TUTOR_ID && b.status === 'pending')
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))

  const updateStatus = (id: string, status: Booking['status']) => {
    const saved = localStorage.getItem('tc_booking_overrides')
    const overrides: Record<string, Booking['status']> = saved ? JSON.parse(saved) : {}
    overrides[id] = status
    localStorage.setItem('tc_booking_overrides', JSON.stringify(overrides))
    loadBookings()
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .rq-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .rq-container { max-width:700px; margin:0 auto; padding:24px 20px; }
        .rq-title { font-size:28px; font-weight:800; margin-bottom:6px; color:#1A1A1A; }
        .rq-subtitle { font-size:15px; color:#888; margin-bottom:24px; }
        .rq-list { display:flex; flex-direction:column; gap:14px; }
        .rq-card { background:white; border-radius:18px; padding:20px; border:1px solid #eee; }
        .rq-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; }
        .rq-name { font-weight:700; font-size:16px; }
        .rq-subject { font-size:13px; color:#888; margin-top:2px; }
        .rq-price { font-size:16px; font-weight:800; color:#C4705A; }
        .rq-details { font-size:13px; color:#444; margin-bottom:16px; display:flex; gap:14px; flex-wrap:wrap; }
        .rq-actions { display:flex; gap:10px; }
        .rq-accept { flex:1; padding:12px; background:#2D5A45; color:white; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; }
        .rq-accept:hover { background:#244a38; }
        .rq-decline { flex:1; padding:12px; background:#F5E6E2; color:#C4705A; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; }
        .rq-decline:hover { background:#f0d8d2; }
        .rq-empty { text-align:center; padding:48px 20px; color:#999; background:white; border-radius:18px; border:1px dashed #ddd; }
      `}} />
      <div className="rq-page">
        <div className="rq-container">
          <h1 className="rq-title">Заявки</h1>
          <p className="rq-subtitle">Новые запросы от учеников на занятия</p>

          {myPending.length === 0 ? (
            <div className="rq-empty">Новых заявок пока нет</div>
          ) : (
            <div className="rq-list">
              {myPending.map(b => (
                <div key={b.id} className="rq-card">
                  <div className="rq-top">
                    <div>
                      <div className="rq-name">{b.studentName}</div>
                      <div className="rq-subject">{b.subject}</div>
                    </div>
                    <span className="rq-price">{b.price} ₽</span>
                  </div>
                  <div className="rq-details">
                    <span>📅 {formatDate(b.date)}</span>
                    <span>🕐 {b.time}</span>
                    <span>⏱ {b.duration} мин</span>
                    <span>{b.format === 'online' ? '💻 Онлайн' : '🏠 Очно'}</span>
                  </div>
                  <div className="rq-actions">
                    <button className="rq-accept" onClick={() => updateStatus(b.id, 'confirmed')}>Принять</button>
                    <button className="rq-decline" onClick={() => updateStatus(b.id, 'cancelled')}>Отклонить</button>
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

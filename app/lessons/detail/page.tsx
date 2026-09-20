'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Booking } from '../../data/bookings'
import { TUTORS } from '../../data/tutors'
import { loadAllBookings } from '../../data/bookingHelpers'

export default function LessonDetailPage() {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id')
    if (!id) { setNotFound(true); return }
    const all = loadAllBookings()
    const found = all.find(b => b.id === id)
    if (!found) { setNotFound(true); return }
    setBooking(found)
  }, [])

  if (notFound) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
        Занятие не найдено. <Link href="/lessons" style={{ color: '#2D5A45' }}>Вернуться к занятиям</Link>
      </div>
    )
  }
  if (!booking) return null

  const tutor = TUTORS.find(t => t.id === booking.tutorId)
  const today = new Date().toISOString().slice(0, 10)
  const isUpcoming = booking.date >= today && booking.status !== 'cancelled' && booking.status !== 'completed'

  const handleJoin = () => {
    setToast('Ссылка на занятие станет активна за 10 минут до начала')
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .ld-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .ld-container { max-width:600px; margin:0 auto; padding:24px 20px; }
        .ld-back { display:inline-flex; align-items:center; gap:6px; color:#2D5A45; text-decoration:none; font-weight:600; font-size:14px; margin-bottom:20px; }

        .ld-hero { background:#2D5A45; border-radius:20px; padding:24px; color:white; margin-bottom:16px; text-align:center; }
        .ld-hero-date { font-size:22px; font-weight:800; margin-bottom:4px; }
        .ld-hero-time { font-size:15px; opacity:0.85; }

        .ld-tutor-card { background:white; border-radius:20px; padding:18px 20px; border:1px solid #eee; display:flex; align-items:center; gap:14px; text-decoration:none; color:inherit; margin-bottom:16px; }
        .ld-tutor-avatar { width:52px; height:52px; border-radius:50%; overflow:hidden; flex-shrink:0; background:#eee; }
        .ld-tutor-avatar img { width:100%; height:100%; object-fit:cover; object-position:center 22%; }
        .ld-tutor-name { font-weight:700; font-size:16px; margin-bottom:2px; }
        .ld-tutor-link { font-size:13px; color:#2D5A45; font-weight:600; }

        .ld-section { background:white; border-radius:20px; padding:8px 20px; border:1px solid #eee; margin-bottom:16px; }
        .ld-section h2 { font-size:15px; font-weight:700; padding:14px 0 4px; color:#1A1A1A; }
        .ld-row { display:flex; align-items:center; gap:12px; padding:14px 0; border-top:1px solid #f2f0eb; }
        .ld-row-icon { width:36px; height:36px; border-radius:10px; background:#F0EDE8; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .ld-row-icon svg { width:18px; height:18px; color:#2D5A45; }
        .ld-row-label { font-size:12px; color:#999; margin-bottom:2px; }
        .ld-row-value { font-size:15px; font-weight:700; color:#1A1A1A; }

        .ld-homework-section { background:white; border-radius:20px; padding:22px; border:1px solid #eee; margin-bottom:16px; }
        .ld-homework-section h2 { font-size:15px; font-weight:700; margin-bottom:14px; color:#1A1A1A; }
        .ld-homework { font-size:14px; color:#444; line-height:1.7; }
        .ld-homework-empty { font-size:14px; color:#999; font-style:italic; }

        .ld-join-btn { width:100%; padding:16px; background:#2D5A45; color:white; border:none; border-radius:14px; font-size:16px; font-weight:700; cursor:pointer; }
        .ld-join-btn:hover { background:#244a38; }

        .ld-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#1A1A1A; color:white; padding:14px 22px; border-radius:14px; font-size:14px; font-weight:600; box-shadow:0 6px 20px rgba(0,0,0,0.25); z-index:200; max-width:90%; text-align:center; }
      `}} />
      <div className="ld-page">
        <div className="ld-container">
          <Link href="/lessons" className="ld-back">← Назад к занятиям</Link>

          <div className="ld-hero">
            <div className="ld-hero-date">{formatDate(booking.date)}</div>
            <div className="ld-hero-time">{booking.time} · {booking.duration} мин</div>
          </div>

          {tutor && (
            <Link href={`/tutors/${tutor.id}`} className="ld-tutor-card">
              <div className="ld-tutor-avatar">
                <img src={tutor.photo} alt={tutor.name} />
              </div>
              <div>
                <div className="ld-tutor-name">{tutor.name}</div>
                <div className="ld-tutor-link">Открыть анкету репетитора →</div>
              </div>
            </Link>
          )}

          <div className="ld-section">
            <h2>Детали занятия</h2>

            <div className="ld-row">
              <div className="ld-row-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 6.5C10 5 7.5 4.5 4 4.5V18c3.5 0 6 .5 8 2 2-1.5 4.5-2 8-2V4.5c-3.5 0-6 .5-8 2z" />
                  <path d="M12 6.5V20" />
                </svg>
              </div>
              <div>
                <div className="ld-row-label">Предмет</div>
                <div className="ld-row-value">{booking.subject}</div>
              </div>
            </div>

            <div className="ld-row">
              <div className="ld-row-icon">
                {booking.format === 'online' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="13" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11l9-8 9 8" />
                    <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
                  </svg>
                )}
              </div>
              <div>
                <div className="ld-row-label">Формат</div>
                <div className="ld-row-value">{booking.format === 'online' ? 'Онлайн' : 'Очно'}</div>
              </div>
            </div>

            <div className="ld-row">
              <div className="ld-row-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 9.5h18" />
                  <path d="M7 14.5h4" />
                </svg>
              </div>
              <div>
                <div className="ld-row-label">Стоимость</div>
                <div className="ld-row-value">{booking.price} ₽</div>
              </div>
            </div>
          </div>

          <div className="ld-homework-section">
            <h2>Домашнее задание</h2>
            {booking.homework ? (
              <div className="ld-homework">{booking.homework}</div>
            ) : (
              <div className="ld-homework-empty">Домашнее задание пока не добавлено</div>
            )}
          </div>

          {isUpcoming && booking.format === 'online' && (
            <button className="ld-join-btn" onClick={handleJoin}>Войти на занятие</button>
          )}
        </div>
      </div>

      {toast && <div className="ld-toast">{toast}</div>}
    </>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

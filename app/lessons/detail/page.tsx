'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Booking } from '../../data/bookings'
import { TUTORS } from '../../data/tutors'
import { loadAllBookings } from '../../data/bookingHelpers'

const STATUS_LABELS: Record<Booking['status'], string> = {
  confirmed: 'Подтверждено',
  completed: 'Завершено',
  cancelled: 'Отменено'
}

export default function LessonDetailPage() {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [notFound, setNotFound] = useState(false)

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

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .ld-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .ld-container { max-width:600px; margin:0 auto; padding:24px 20px; }
        .ld-back { display:inline-flex; align-items:center; gap:6px; color:#2D5A45; text-decoration:none; font-weight:600; font-size:14px; margin-bottom:20px; }
        .ld-status { display:inline-block; padding:5px 14px; border-radius:999px; font-size:12px; font-weight:700; margin-bottom:14px; }
        .ld-status.confirmed { background:#E6F0EA; color:#2D5A45; }
        .ld-status.completed { background:#EFEFEF; color:#888; }
        .ld-status.cancelled { background:#F5E6E2; color:#C4705A; }

        .ld-tutor-card { background:white; border-radius:20px; padding:20px; border:1px solid #eee; display:flex; align-items:center; gap:14px; text-decoration:none; color:inherit; margin-bottom:16px; }
        .ld-tutor-avatar { width:56px; height:56px; border-radius:50%; overflow:hidden; flex-shrink:0; background:#eee; }
        .ld-tutor-avatar img { width:100%; height:100%; object-fit:cover; object-position:center 22%; }
        .ld-tutor-name { font-weight:700; font-size:16px; margin-bottom:2px; }
        .ld-tutor-link { font-size:13px; color:#2D5A45; font-weight:600; }

        .ld-section { background:white; border-radius:20px; padding:22px; border:1px solid #eee; margin-bottom:16px; }
        .ld-section h2 { font-size:15px; font-weight:700; margin-bottom:14px; color:#1A1A1A; }
        .ld-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .ld-item { background:#FAF8F4; border-radius:14px; padding:14px; }
        .ld-item-label { font-size:12px; color:#999; margin-bottom:4px; }
        .ld-item-value { font-size:15px; font-weight:700; color:#1A1A1A; }

        .ld-homework { font-size:14px; color:#444; line-height:1.7; }
        .ld-homework-empty { font-size:14px; color:#999; font-style:italic; }
      `}} />
      <div className="ld-page">
        <div className="ld-container">
          <Link href="/lessons" className="ld-back">← Назад к занятиям</Link>

          <span className={`ld-status ${booking.status}`}>{STATUS_LABELS[booking.status]}</span>

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
            <div className="ld-grid">
              <div className="ld-item">
                <div className="ld-item-label">Предмет</div>
                <div className="ld-item-value">{booking.subject}</div>
              </div>
              <div className="ld-item">
                <div className="ld-item-label">Формат</div>
                <div className="ld-item-value">{booking.format === 'online' ? 'Онлайн' : 'Очно'}</div>
              </div>
              <div className="ld-item">
                <div className="ld-item-label">Дата</div>
                <div className="ld-item-value">{formatDate(booking.date)}</div>
              </div>
              <div className="ld-item">
                <div className="ld-item-label">Время</div>
                <div className="ld-item-value">{booking.time}</div>
              </div>
              <div className="ld-item">
                <div className="ld-item-label">Длительность</div>
                <div className="ld-item-value">{booking.duration} мин</div>
              </div>
              <div className="ld-item">
                <div className="ld-item-label">Стоимость</div>
                <div className="ld-item-value">{booking.price} ₽</div>
              </div>
            </div>
          </div>

          <div className="ld-section">
            <h2>Домашнее задание</h2>
            {booking.homework ? (
              <div className="ld-homework">{booking.homework}</div>
            ) : (
              <div className="ld-homework-empty">Домашнее задание пока не добавлено</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Booking } from '../../data/bookings'
import { loadAllBookings, setBookingHomework } from '../../data/bookingHelpers'

export default function ScheduleDetailPage() {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [homeworkDraft, setHomeworkDraft] = useState('')
  const [editingHomework, setEditingHomework] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const load = () => {
    const id = new URLSearchParams(window.location.search).get('id')
    if (!id) { setNotFound(true); return }
    const all = loadAllBookings()
    const found = all.find(b => b.id === id)
    if (!found) { setNotFound(true); return }
    setBooking(found)
    setHomeworkDraft(found.homework || '')
  }

  useEffect(() => {
    load()
  }, [])

  if (notFound) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
        Занятие не найдено. <Link href="/schedule" style={{ color: '#2D5A45' }}>Вернуться к расписанию</Link>
      </div>
    )
  }
  if (!booking) return null

  const handleStart = () => {
    setToast('Ссылка на занятие станет активна за 10 минут до начала')
    setTimeout(() => setToast(null), 3000)
  }

  const saveHomework = () => {
    setBookingHomework(booking.id, homeworkDraft.trim())
    setEditingHomework(false)
    load()
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .sd-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .sd-container { max-width:600px; margin:0 auto; padding:24px 20px; }
        .sd-back { display:inline-flex; align-items:center; gap:6px; color:#2D5A45; text-decoration:none; font-weight:600; font-size:14px; margin-bottom:20px; }

        .sd-hero { background:#2D5A45; border-radius:20px; padding:24px; color:white; margin-bottom:16px; text-align:center; }
        .sd-hero-date { font-size:22px; font-weight:800; margin-bottom:4px; }
        .sd-hero-time { font-size:15px; opacity:0.85; }

        .sd-student-card { background:white; border-radius:20px; padding:18px 20px; border:1px solid #eee; margin-bottom:16px; }
        .sd-student-name { font-weight:700; font-size:18px; }

        .sd-section { background:white; border-radius:20px; padding:8px 20px; border:1px solid #eee; margin-bottom:16px; }
        .sd-section h2 { font-size:15px; font-weight:700; padding:14px 0 4px; color:#1A1A1A; }
        .sd-row { display:flex; align-items:center; gap:12px; padding:14px 0; border-top:1px solid #f2f0eb; }
        .sd-row-icon { width:36px; height:36px; border-radius:10px; background:#F0EDE8; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .sd-row-icon svg { width:18px; height:18px; color:#2D5A45; }
        .sd-row-label { font-size:12px; color:#999; margin-bottom:2px; }
        .sd-row-value { font-size:15px; font-weight:700; color:#1A1A1A; }

        .sd-homework-section { background:white; border-radius:20px; padding:22px; border:1px solid #eee; margin-bottom:16px; }
        .sd-homework-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
        .sd-homework-header h2 { font-size:15px; font-weight:700; color:#1A1A1A; }
        .sd-edit-link { font-size:13px; color:#2D5A45; font-weight:600; background:none; border:none; cursor:pointer; }
        .sd-homework { font-size:14px; color:#444; line-height:1.7; }
        .sd-homework-empty { font-size:14px; color:#999; font-style:italic; }
        .sd-homework-textarea { width:100%; min-height:90px; padding:12px 14px; border-radius:12px; border:1px solid #ddd; font-size:14px; font-family:inherit; outline:none; resize:vertical; margin-bottom:10px; }
        .sd-homework-textarea:focus { border-color:#2D5A45; }
        .sd-homework-save { padding:10px 20px; background:#2D5A45; color:white; border:none; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; }

        .sd-start-btn { width:100%; padding:16px; background:#2D5A45; color:white; border:none; border-radius:14px; font-size:16px; font-weight:700; cursor:pointer; }
        .sd-start-btn:hover { background:#244a38; }

        .sd-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#1A1A1A; color:white; padding:14px 22px; border-radius:14px; font-size:14px; font-weight:600; box-shadow:0 6px 20px rgba(0,0,0,0.25); z-index:200; max-width:90%; text-align:center; }
      `}} />
      <div className="sd-page">
        <div className="sd-container">
          <Link href="/schedule" className="sd-back">← Назад к расписанию</Link>

          <div className="sd-hero">
            <div className="sd-hero-date">{formatDate(booking.date)}</div>
            <div className="sd-hero-time">{booking.time} · {booking.duration} мин</div>
          </div>

          <div className="sd-student-card">
            <div className="sd-student-name">{booking.studentName}</div>
          </div>

          <div className="sd-section">
            <h2>Детали занятия</h2>

            <div className="sd-row">
              <div className="sd-row-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 6.5C10 5 7.5 4.5 4 4.5V18c3.5 0 6 .5 8 2 2-1.5 4.5-2 8-2V4.5c-3.5 0-6 .5-8 2z" />
                  <path d="M12 6.5V20" />
                </svg>
              </div>
              <div>
                <div className="sd-row-label">Предмет</div>
                <div className="sd-row-value">{booking.subject}</div>
              </div>
            </div>

            <div className="sd-row">
              <div className="sd-row-icon">
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
                <div className="sd-row-label">Формат</div>
                <div className="sd-row-value">{booking.format === 'online' ? 'Онлайн' : 'Очно'}</div>
              </div>
            </div>

            <div className="sd-row">
              <div className="sd-row-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 9.5h18" />
                  <path d="M7 14.5h4" />
                </svg>
              </div>
              <div>
                <div className="sd-row-label">Стоимость</div>
                <div className="sd-row-value">{booking.price} ₽</div>
              </div>
            </div>
          </div>

          <div className="sd-homework-section">
            <div className="sd-homework-header">
              <h2>Домашнее задание</h2>
              {!editingHomework && (
                <button className="sd-edit-link" onClick={() => setEditingHomework(true)}>
                  {booking.homework ? 'Изменить' : 'Добавить'}
                </button>
              )}
            </div>

            {editingHomework ? (
              <>
                <textarea
                  className="sd-homework-textarea"
                  value={homeworkDraft}
                  onChange={e => setHomeworkDraft(e.target.value)}
                  placeholder="Опишите, что нужно сделать ученику к следующему занятию"
                />
                <button className="sd-homework-save" onClick={saveHomework}>Сохранить</button>
              </>
            ) : booking.homework ? (
              <div className="sd-homework">{booking.homework}</div>
            ) : (
              <div className="sd-homework-empty">Домашнее задание пока не добавлено</div>
            )}
          </div>

          {booking.format === 'online' && (
            <button className="sd-start-btn" onClick={handleStart}>Начать занятие</button>
          )}
        </div>
      </div>

      {toast && <div className="sd-toast">{toast}</div>}
    </>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

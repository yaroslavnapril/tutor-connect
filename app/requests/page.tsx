'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Booking } from '../data/bookings'
import { CURRENT_TUTOR_ID } from '../data/currentUser'
import { loadAllBookings, daysSince } from '../data/bookingHelpers'

const DECLINE_RECOVERY_DAYS = 3

type Tab = 'pending' | 'confirmed' | 'cancelled'

export default function RequestsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [tab, setTab] = useState<Tab>('pending')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setBookings(loadAllBookings())
  }, [])

  if (!mounted) return null

  const mine = bookings.filter(b => b.tutorId === CURRENT_TUTOR_ID)

  const pending = mine.filter(b => b.status === 'pending').sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  const confirmed = mine.filter(b => b.status === 'confirmed').sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  const cancelled = mine.filter(b => b.status === 'cancelled').sort((a, b) => (b.statusChangedAt || '').localeCompare(a.statusChangedAt || ''))

  const shown = tab === 'pending' ? pending : tab === 'confirmed' ? confirmed : cancelled

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .rq-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .rq-container { max-width:700px; margin:0 auto; padding:24px 20px; }
        .rq-title { font-size:28px; font-weight:800; margin-bottom:6px; color:#1A1A1A; }
        .rq-subtitle { font-size:15px; color:#888; margin-bottom:20px; }
        .rq-tabs { display:flex; gap:8px; margin-bottom:20px; }
        .rq-tab { flex:1; padding:11px 8px; border-radius:12px; border:1px solid #ddd; background:white; font-size:13px; font-weight:700; cursor:pointer; color:#666; }
        .rq-tab.active { background:#2D5A45; color:white; border-color:#2D5A45; }
        .rq-list { display:flex; flex-direction:column; gap:14px; }
        .rq-card { background:white; border-radius:18px; padding:20px; border:1px solid #eee; text-decoration:none; color:inherit; display:block; }
        .rq-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; }
        .rq-name { font-weight:700; font-size:16px; }
        .rq-subject { font-size:13px; color:#888; margin-top:2px; }
        .rq-price { font-size:16px; font-weight:800; color:#C4705A; }
        .rq-details { font-size:13px; color:#444; display:flex; gap:14px; flex-wrap:wrap; }
        .rq-recovery { margin-top:10px; font-size:12px; color:#C4705A; font-weight:600; }
        .rq-recovery.expired { color:#aaa; }
        .rq-empty { text-align:center; padding:48px 20px; color:#999; background:white; border-radius:18px; border:1px dashed #ddd; }
      `}} />
      <div className="rq-page">
        <div className="rq-container">
          <h1 className="rq-title">Заявки</h1>
          <p className="rq-subtitle">Запросы от учеников на занятия</p>

          <div className="rq-tabs">
            <button className={`rq-tab ${tab === 'pending' ? 'active' : ''}`} onClick={() => setTab('pending')}>Новые {pending.length > 0 && `(${pending.length})`}</button>
            <button className={`rq-tab ${tab === 'confirmed' ? 'active' : ''}`} onClick={() => setTab('confirmed')}>Принято</button>
            <button className={`rq-tab ${tab === 'cancelled' ? 'active' : ''}`} onClick={() => setTab('cancelled')}>Отклонено</button>
          </div>

          {shown.length === 0 ? (
            <div className="rq-empty">
              {tab === 'pending' && 'Новых заявок пока нет'}
              {tab === 'confirmed' && 'Пока нет принятых заявок'}
              {tab === 'cancelled' && 'Пока нет отклонённых заявок'}
            </div>
          ) : (
            <div className="rq-list">
              {shown.map(b => {
                const daysLeft = b.statusChangedAt ? DECLINE_RECOVERY_DAYS - daysSince(b.statusChangedAt) : DECLINE_RECOVERY_DAYS
                return (
                  <Link key={b.id} href={`/requests/detail?id=${b.id}`} className="rq-card">
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
                    {tab === 'cancelled' && (
                      <div className={`rq-recovery ${daysLeft <= 0 ? 'expired' : ''}`}>
                        {daysLeft > 0 ? `Можно ещё принять — осталось ${daysLeft} дн.` : 'Срок восстановления истёк'}
                      </div>
                    )}
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
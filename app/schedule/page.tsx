'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Booking } from '../data/bookings'
import { CURRENT_TUTOR_ID } from '../data/currentUser'
import { loadAllBookings } from '../data/bookingHelpers'

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10)
}

export default function SchedulePage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [mounted, setMounted] = useState(false)
  const [viewDate, setViewDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(toISODate(new Date()))

  useEffect(() => {
    setMounted(true)
    setBookings(loadAllBookings())
  }, [])

  if (!mounted) return null

  const mine = bookings.filter(b => b.tutorId === CURRENT_TUTOR_ID && b.status !== 'cancelled')
  const bookingsByDate: Record<string, Booking[]> = {}
  mine.forEach(b => {
    if (!bookingsByDate[b.date]) bookingsByDate[b.date] = []
    bookingsByDate[b.date].push(b)
  })

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const startOffset = (firstDay.getDay() + 6) % 7 // понедельник = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  const today = toISODate(new Date())

  const goPrevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const goNextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const selectedBookings = (bookingsByDate[selectedDate] || []).sort((a, b) => a.time.localeCompare(b.time))

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .sc-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .sc-container { max-width:700px; margin:0 auto; padding:24px 20px; }
        .sc-title { font-size:28px; font-weight:800; margin-bottom:20px; color:#1A1A1A; }
        .sc-calendar { background:white; border-radius:20px; padding:20px; border:1px solid #eee; margin-bottom:20px; }
        .sc-nav { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
        .sc-nav-btn { width:36px; height:36px; border-radius:10px; border:1px solid #ddd; background:white; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#2D5A45; font-size:16px; font-weight:700; }
        .sc-nav-btn:hover { background:#F0EDE8; }
        .sc-month-label { font-size:16px; font-weight:700; color:#1A1A1A; }
        .sc-weekdays { display:grid; grid-template-columns:repeat(7, 1fr); margin-bottom:8px; }
        .sc-weekday { text-align:center; font-size:11px; font-weight:700; color:#999; padding:4px 0; }
        .sc-days { display:grid; grid-template-columns:repeat(7, 1fr); gap:4px; }
        .sc-day { aspect-ratio:1; display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:10px; cursor:pointer; position:relative; font-size:13px; font-weight:600; color:#444; border:none; background:transparent; }
        .sc-day.empty { cursor:default; }
        .sc-day.today { color:#C4705A; font-weight:800; }
        .sc-day.selected { background:#2D5A45; color:white; }
        .sc-day.today.selected { color:white; }
        .sc-day-dot { width:5px; height:5px; border-radius:50%; background:#C4705A; margin-top:2px; }
        .sc-day.selected .sc-day-dot { background:white; }

        .sc-list-title { font-size:18px; font-weight:700; margin-bottom:14px; color:#1A1A1A; }
        .sc-list { display:flex; flex-direction:column; gap:12px; }
        .sc-lesson-card { background:white; border-radius:16px; padding:16px 18px; border:1px solid #eee; display:flex; align-items:center; gap:14px; }
        .sc-lesson-time { font-size:15px; font-weight:800; color:#2D5A45; min-width:52px; }
        .sc-lesson-info { flex:1; min-width:0; }
        .sc-lesson-name { font-weight:700; font-size:14px; margin-bottom:2px; }
        .sc-lesson-subject { font-size:12px; color:#888; }
        .sc-lesson-status { font-size:11px; font-weight:700; padding:4px 10px; border-radius:999px; white-space:nowrap; }
        .sc-lesson-status.confirmed { background:#E6F0EA; color:#2D5A45; }
        .sc-lesson-status.completed { background:#EFEFEF; color:#888; }
        .sc-empty { text-align:center; padding:32px 20px; color:#999; background:white; border-radius:16px; border:1px dashed #ddd; font-size:14px; }
      `}} />
      <div className="sc-page">
        <div className="sc-container">
          <h1 className="sc-title">Расписание</h1>

          <div className="sc-calendar">
            <div className="sc-nav">
              <button className="sc-nav-btn" onClick={goPrevMonth}>‹</button>
              <span className="sc-month-label">{MONTHS[month]} {year}</span>
              <button className="sc-nav-btn" onClick={goNextMonth}>›</button>
            </div>
            <div className="sc-weekdays">
              {WEEKDAYS.map(d => <div key={d} className="sc-weekday">{d}</div>)}
            </div>
            <div className="sc-days">
              {cells.map((date, i) => {
                if (!date) return <div key={i} className="sc-day empty" />
                const iso = toISODate(date)
                const hasBookings = !!bookingsByDate[iso]
                const isToday = iso === today
                const isSelected = iso === selectedDate
                return (
                  <button
                    key={i}
                    className={`sc-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(iso)}
                  >
                    {date.getDate()}
                    {hasBookings && <span className="sc-day-dot" />}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="sc-list-title">
            {new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
          </div>

          {selectedBookings.length === 0 ? (
            <div className="sc-empty">На эту дату занятий нет</div>
          ) : (
            <div className="sc-list">
              {selectedBookings.map(b => (
                <div key={b.id} className="sc-lesson-card">
                  <div className="sc-lesson-time">{b.time}</div>
                  <div className="sc-lesson-info">
                    <div className="sc-lesson-name">{b.studentName}</div>
                    <div className="sc-lesson-subject">{b.subject} • {b.duration} мин • {b.format === 'online' ? 'Онлайн' : 'Очно'}</div>
                  </div>
                  <span className={`sc-lesson-status ${b.status}`}>{b.status === 'confirmed' ? 'Подтверждено' : 'Завершено'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

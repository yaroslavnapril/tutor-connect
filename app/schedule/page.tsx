'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Booking } from '../data/bookings'
import { CURRENT_TUTOR_ID } from '../data/currentUser'
import { loadAllBookings, addBooking } from '../data/bookingHelpers'

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
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const [formStudent, setFormStudent] = useState('')
  const [formSubject, setFormSubject] = useState('')
  const [formTime, setFormTime] = useState('')
  const [formPrice, setFormPrice] = useState('')
  const [formFormat, setFormFormat] = useState<'online' | 'offline'>('online')

  const reload = () => setBookings(loadAllBookings())

  useEffect(() => {
    setMounted(true)
    reload()
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
  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  const today = toISODate(new Date())

  const goPrevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const goNextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const selectedBookings = (bookingsByDate[selectedDate] || []).sort((a, b) => a.time.localeCompare(b.time))

  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setToast('Ссылка на занятие станет активна за 10 минут до начала')
    setTimeout(() => setToast(null), 3000)
  }

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formStudent.trim() || !formSubject.trim() || !formTime || !formPrice) return

    addBooking({
      tutorId: CURRENT_TUTOR_ID,
      studentName: formStudent.trim(),
      subject: formSubject.trim(),
      date: selectedDate,
      time: formTime,
      duration: 60,
      price: Number(formPrice),
      format: formFormat,
      status: 'confirmed'
    })

    setFormStudent('')
    setFormSubject('')
    setFormTime('')
    setFormPrice('')
    setFormFormat('online')
    setShowForm(false)
    reload()
  }

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

        .sc-list-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
        .sc-list-title { font-size:18px; font-weight:700; color:#1A1A1A; }
        .sc-add-btn { padding:9px 16px; background:#C4705A; color:white; border:none; border-radius:12px; font-size:13px; font-weight:700; cursor:pointer; }
        .sc-add-btn:hover { background:#b35d48; }

        .sc-form { background:white; border-radius:16px; padding:18px; border:1px solid #eee; margin-bottom:16px; display:flex; flex-direction:column; gap:12px; }
        .sc-form-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .sc-form label { display:block; font-size:12px; font-weight:700; color:#666; margin-bottom:6px; }
        .sc-form input, .sc-form select { width:100%; padding:10px 12px; border-radius:10px; border:1px solid #ddd; font-size:14px; outline:none; }
        .sc-form input:focus, .sc-form select:focus { border-color:#2D5A45; }
        .sc-form-actions { display:flex; gap:10px; margin-top:4px; }
        .sc-form-submit { flex:1; padding:12px; background:#2D5A45; color:white; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; }
        .sc-form-cancel { flex:1; padding:12px; background:#F0EDE8; color:#555; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; }

        .sc-list { display:flex; flex-direction:column; gap:12px; }
        .sc-lesson-card { background:white; border-radius:16px; border:1px solid #eee; overflow:hidden; }
        .sc-lesson-top { display:flex; align-items:center; gap:14px; padding:16px 18px; text-decoration:none; color:inherit; }
        .sc-lesson-time { font-size:15px; font-weight:800; color:#2D5A45; min-width:52px; }
        .sc-lesson-info { flex:1; min-width:0; }
        .sc-lesson-name { font-weight:700; font-size:14px; margin-bottom:2px; }
        .sc-lesson-subject { font-size:12px; color:#888; }
        .sc-lesson-arrow { color:#ccc; font-size:16px; }
        .sc-start-btn { display:block; width:calc(100% - 36px); margin:0 18px 16px; padding:11px; background:#2D5A45; color:white; border:none; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; text-align:center; }
        .sc-start-btn:hover { background:#244a38; }
        .sc-empty { text-align:center; padding:32px 20px; color:#999; background:white; border-radius:16px; border:1px dashed #ddd; font-size:14px; }

        .sc-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#1A1A1A; color:white; padding:14px 22px; border-radius:14px; font-size:14px; font-weight:600; box-shadow:0 6px 20px rgba(0,0,0,0.25); z-index:200; max-width:90%; text-align:center; }
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
                    onClick={() => { setSelectedDate(iso); setShowForm(false) }}
                  >
                    {date.getDate()}
                    {hasBookings && <span className="sc-day-dot" />}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="sc-list-header">
            <div className="sc-list-title">
              {new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
            </div>
            <button className="sc-add-btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Отмена' : '+ Добавить занятие'}
            </button>
          </div>

          {showForm && (
            <form className="sc-form" onSubmit={handleAddLesson}>
              <div>
                <label>Ученик</label>
                <input value={formStudent} onChange={e => setFormStudent(e.target.value)} placeholder="Имя ученика" required />
              </div>
              <div>
                <label>Предмет</label>
                <input value={formSubject} onChange={e => setFormSubject(e.target.value)} placeholder="Например: Математика" required />
              </div>
              <div className="sc-form-row">
                <div>
                  <label>Время</label>
                  <input type="time" value={formTime} onChange={e => setFormTime(e.target.value)} required />
                </div>
                <div>
                  <label>Цена, ₽</label>
                  <input type="number" min="0" value={formPrice} onChange={e => setFormPrice(e.target.value)} placeholder="1500" required />
                </div>
              </div>
              <div>
                <label>Формат</label>
                <select value={formFormat} onChange={e => setFormFormat(e.target.value as 'online' | 'offline')}>
                  <option value="online">Онлайн</option>
                  <option value="offline">Очно</option>
                </select>
              </div>
              <div className="sc-form-actions">
                <button type="button" className="sc-form-cancel" onClick={() => setShowForm(false)}>Отмена</button>
                <button type="submit" className="sc-form-submit">Добавить</button>
              </div>
            </form>
          )}

          {selectedBookings.length === 0 ? (
            <div className="sc-empty">На эту дату занятий нет</div>
          ) : (
            <div className="sc-list">
              {selectedBookings.map(b => (
                <div key={b.id} className="sc-lesson-card">
                  <Link href={`/schedule/detail?id=${b.id}`} className="sc-lesson-top">
                    <div className="sc-lesson-time">{b.time}</div>
                    <div className="sc-lesson-info">
                      <div className="sc-lesson-name">{b.studentName}</div>
                      <div className="sc-lesson-subject">{b.subject} • {b.duration} мин • {b.format === 'online' ? 'Онлайн' : 'Очно'}</div>
                    </div>
                    <span className="sc-lesson-arrow">›</span>
                  </Link>
                  {b.format === 'online' && (
                    <button className="sc-start-btn" onClick={handleStart}>Начать занятие</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {toast && <div className="sc-toast">{toast}</div>}
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Booking } from '../data/bookings'
import { CURRENT_STUDENT_NAME } from '../data/currentUser'
import { TUTORS } from '../data/tutors'
import { loadAllBookings } from '../data/bookingHelpers'

interface Card {
  id: string
  brand: string
  last4: string
  isDefault: boolean
}

function detectBrand(number: string): string {
  const digits = number.replace(/\D/g, '')
  if (digits.startsWith('4')) return 'Visa'
  if (digits.startsWith('5')) return 'Mastercard'
  if (digits.startsWith('2')) return 'МИР'
  return 'Карта'
}

export default function PaymentPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [mounted, setMounted] = useState(false)
  const [showAddCard, setShowAddCard] = useState(false)
  const [cardInput, setCardInput] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const loadCards = () => {
    const saved = localStorage.getItem('tc_payment_cards')
    setCards(saved ? JSON.parse(saved) : [])
  }

  useEffect(() => {
    setMounted(true)
    setBookings(loadAllBookings())
    loadCards()
  }, [])

  if (!mounted) return null

  const myPaid = bookings
    .filter(b => b.studentName === CURRENT_STUDENT_NAME && b.status === 'completed')
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))

  const totalSpent = myPaid.reduce((sum, b) => sum + b.price, 0)

  const tutorFor = (tutorId: string) => TUTORS.find(t => t.id === tutorId)

  const saveCards = (list: Card[]) => {
    setCards(list)
    localStorage.setItem('tc_payment_cards', JSON.stringify(list))
  }

  const addCard = (e: React.FormEvent) => {
    e.preventDefault()
    const digits = cardInput.replace(/\D/g, '')
    if (digits.length < 12) return
    const newCard: Card = {
      id: `card-${Date.now()}`,
      brand: detectBrand(digits),
      last4: digits.slice(-4),
      isDefault: cards.length === 0
    }
    saveCards([...cards, newCard])
    setCardInput('')
    setShowAddCard(false)
    setToast('Карта добавлена')
    setTimeout(() => setToast(null), 2500)
  }

  const removeCard = (id: string) => {
    if (!window.confirm('Удалить карту?')) return
    const updated = cards.filter(c => c.id !== id)
    if (updated.length > 0 && !updated.some(c => c.isDefault)) updated[0].isDefault = true
    saveCards(updated)
  }

  const makeDefault = (id: string) => {
    saveCards(cards.map(c => ({ ...c, isDefault: c.id === id })))
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .py-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .py-container { max-width:700px; margin:0 auto; padding:24px 20px; }
        .py-title { font-size:28px; font-weight:800; margin-bottom:20px; color:#1A1A1A; }

        .py-summary { background:#2D5A45; border-radius:20px; padding:22px; color:white; margin-bottom:20px; }
        .py-summary-label { font-size:12px; opacity:0.8; margin-bottom:4px; }
        .py-summary-value { font-size:26px; font-weight:800; }

        .py-section-title { font-size:17px; font-weight:700; margin-bottom:14px; color:#1A1A1A; }

        .py-card-list { display:flex; flex-direction:column; gap:10px; margin-bottom:16px; }
        .py-card-item { background:white; border-radius:14px; padding:14px 16px; border:1px solid #eee; display:flex; align-items:center; gap:12px; }
        .py-card-icon { width:36px; height:36px; border-radius:8px; background:#F0EDE8; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
        .py-card-info { flex:1; }
        .py-card-brand { font-weight:700; font-size:14px; }
        .py-card-default { font-size:11px; font-weight:700; color:#2D5A45; background:#EAF1EC; padding:3px 8px; border-radius:999px; }
        .py-card-set-default { font-size:11px; color:#2D5A45; font-weight:600; background:none; border:none; cursor:pointer; }
        .py-card-remove { border:none; background:none; color:#C4705A; font-size:16px; cursor:pointer; }

        .py-add-card-btn { padding:11px 18px; background:#F0EDE8; color:#2D5A45; border:none; border-radius:12px; font-size:13px; font-weight:700; cursor:pointer; margin-bottom:20px; }
        .py-form { background:white; border-radius:14px; padding:16px; border:1px solid #eee; margin-bottom:16px; display:flex; flex-direction:column; gap:10px; }
        .py-form input { width:100%; box-sizing:border-box; padding:12px 14px; border-radius:10px; border:1px solid #ddd; font-size:16px; outline:none; }
        .py-form-actions { display:flex; gap:10px; }
        .py-form-submit { flex:1; padding:11px; background:#2D5A45; color:white; border:none; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; }
        .py-form-cancel { flex:1; padding:11px; background:#F0EDE8; color:#555; border:none; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; }

        .py-history-item { background:white; border-radius:14px; padding:16px; border:1px solid #eee; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; }
        .py-history-name { font-weight:700; font-size:14px; margin-bottom:2px; }
        .py-history-date { font-size:12px; color:#999; }
        .py-history-amount { font-weight:800; font-size:15px; color:#1A1A1A; }
        .py-empty { text-align:center; padding:32px 20px; color:#999; background:white; border-radius:16px; border:1px dashed #ddd; font-size:14px; }

        .py-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#1A1A1A; color:white; padding:14px 22px; border-radius:14px; font-size:14px; font-weight:600; box-shadow:0 6px 20px rgba(0,0,0,0.25); z-index:200; max-width:90%; text-align:center; }
      `}} />
      <div className="py-page">
        <div className="py-container">
          <h1 className="py-title">Оплата</h1>

          <div className="py-summary">
            <div className="py-summary-label">Всего потрачено на занятия</div>
            <div className="py-summary-value">{totalSpent.toLocaleString('ru-RU')} ₽</div>
          </div>

          <div className="py-section-title">Способы оплаты</div>
          {cards.length > 0 && (
            <div className="py-card-list">
              {cards.map(c => (
                <div key={c.id} className="py-card-item">
                  <div className="py-card-icon">💳</div>
                  <div className="py-card-info">
                    <div className="py-card-brand">{c.brand} •••• {c.last4}</div>
                  </div>
                  {c.isDefault ? (
                    <span className="py-card-default">Основная</span>
                  ) : (
                    <button className="py-card-set-default" onClick={() => makeDefault(c.id)}>Сделать основной</button>
                  )}
                  <button className="py-card-remove" onClick={() => removeCard(c.id)}>✕</button>
                </div>
              ))}
            </div>
          )}

          {showAddCard ? (
            <form className="py-form" onSubmit={addCard}>
              <input
                value={cardInput}
                onChange={e => setCardInput(e.target.value)}
                placeholder="Номер карты"
                inputMode="numeric"
                required
              />
              <div className="py-form-actions">
                <button type="button" className="py-form-cancel" onClick={() => setShowAddCard(false)}>Отмена</button>
                <button type="submit" className="py-form-submit">Добавить</button>
              </div>
            </form>
          ) : (
            <button className="py-add-card-btn" onClick={() => setShowAddCard(true)}>+ Добавить карту</button>
          )}

          <div className="py-section-title">История платежей</div>
          {myPaid.length === 0 ? (
            <div className="py-empty">Пока нет оплаченных занятий</div>
          ) : (
            myPaid.map(b => {
              const tutor = tutorFor(b.tutorId)
              return (
                <div key={b.id} className="py-history-item">
                  <div>
                    <div className="py-history-name">{tutor?.name || 'Репетитор'} · {b.subject}</div>
                    <div className="py-history-date">{formatDate(b.date)}</div>
                  </div>
                  <div className="py-history-amount">−{b.price} ₽</div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {toast && <div className="py-toast">{toast}</div>}
    </>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

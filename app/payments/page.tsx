'use client'

import { useState, useEffect } from 'react'
import { Booking } from '../data/bookings'
import { CURRENT_TUTOR_ID } from '../data/currentUser'
import { loadAllBookings } from '../data/bookingHelpers'
import { PRODUCTS, Product } from '../data/products'
import { PLATFORM_COMMISSION } from '../data/requests'

interface Card {
  id: string
  brand: string
  last4: string
  isDefault: boolean
}

interface Withdrawal {
  id: string
  amount: number
  date: string
  cardLast4: string
}

function detectBrand(number: string): string {
  const digits = number.replace(/\D/g, '')
  if (digits.startsWith('4')) return 'Visa'
  if (digits.startsWith('5')) return 'Mastercard'
  if (digits.startsWith('2')) return 'МИР'
  return 'Карта'
}

export default function PayoutsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [customProducts, setCustomProducts] = useState<Product[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([])
  const [mounted, setMounted] = useState(false)

  const [showAddCard, setShowAddCard] = useState(false)
  const [cardInput, setCardInput] = useState('')
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawCardId, setWithdrawCardId] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const loadAll = () => {
    setBookings(loadAllBookings())
    const savedProducts = localStorage.getItem('tc_custom_products')
    setCustomProducts(savedProducts ? JSON.parse(savedProducts) : [])
    const savedCards = localStorage.getItem('tc_payout_cards')
    setCards(savedCards ? JSON.parse(savedCards) : [])
    const savedWithdrawals = localStorage.getItem('tc_withdrawals')
    setWithdrawals(savedWithdrawals ? JSON.parse(savedWithdrawals) : [])
  }

  useEffect(() => {
    setMounted(true)
    loadAll()
  }, [])

  if (!mounted) return null

  const myCompleted = bookings.filter(b => b.tutorId === CURRENT_TUTOR_ID && b.status === 'completed')
  const lessonEarnings = myCompleted.reduce((sum, b) => sum + b.price * (1 - PLATFORM_COMMISSION), 0)

  const allProducts = [...customProducts, ...PRODUCTS]
  const myProducts = allProducts.filter(p => p.authorId === CURRENT_TUTOR_ID)
  const marketEarnings = myProducts.reduce((sum, p) => sum + p.price * p.sales * (1 - PLATFORM_COMMISSION), 0)

  const totalEarned = Math.round(lessonEarnings + marketEarnings)
  const totalWithdrawn = withdrawals.reduce((sum, w) => sum + w.amount, 0)
  const available = totalEarned - totalWithdrawn

  const saveCards = (list: Card[]) => {
    setCards(list)
    localStorage.setItem('tc_payout_cards', JSON.stringify(list))
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
    const updated = [...cards, newCard]
    saveCards(updated)
    setCardInput('')
    setShowAddCard(false)
    if (!withdrawCardId) setWithdrawCardId(newCard.id)
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

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number(withdrawAmount)
    if (!amount || amount <= 0 || amount > available || !withdrawCardId) return
    const card = cards.find(c => c.id === withdrawCardId)
    if (!card) return

    const newWithdrawal: Withdrawal = {
      id: `wd-${Date.now()}`,
      amount,
      date: new Date().toISOString(),
      cardLast4: card.last4
    }
    const updated = [newWithdrawal, ...withdrawals]
    setWithdrawals(updated)
    localStorage.setItem('tc_withdrawals', JSON.stringify(updated))

    setWithdrawAmount('')
    setShowWithdraw(false)
    setToast(`Заявка на вывод ${amount} ₽ отправлена`)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .py-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .py-container { max-width:700px; margin:0 auto; padding:24px 20px; }
        .py-title { font-size:28px; font-weight:800; margin-bottom:20px; color:#1A1A1A; }

        .py-summary { background:#2D5A45; border-radius:20px; padding:22px; color:white; margin-bottom:14px; }
        .py-summary-label { font-size:12px; opacity:0.8; margin-bottom:4px; }
        .py-summary-value { font-size:30px; font-weight:800; margin-bottom:14px; }
        .py-summary-sub { display:flex; justify-content:space-between; font-size:13px; opacity:0.85; padding-top:12px; border-top:1px solid rgba(255,255,255,0.2); }

        .py-withdraw-btn { width:100%; padding:14px; background:#C4705A; color:white; border:none; border-radius:14px; font-size:15px; font-weight:700; cursor:pointer; margin-bottom:24px; }
        .py-withdraw-btn:hover { background:#b35d48; }
        .py-withdraw-btn:disabled { background:#ddd; cursor:default; }

        .py-section-title { font-size:17px; font-weight:700; margin-bottom:14px; color:#1A1A1A; }

        .py-card-list { display:flex; flex-direction:column; gap:10px; margin-bottom:16px; }
        .py-card-item { background:white; border-radius:14px; padding:14px 16px; border:1px solid #eee; display:flex; align-items:center; gap:12px; }
        .py-card-icon { width:36px; height:36px; border-radius:8px; background:#F0EDE8; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
        .py-card-info { flex:1; }
        .py-card-brand { font-weight:700; font-size:14px; }
        .py-card-default { font-size:11px; font-weight:700; color:#2D5A45; background:#EAF1EC; padding:3px 8px; border-radius:999px; }
        .py-card-set-default { font-size:11px; color:#2D5A45; font-weight:600; background:none; border:none; cursor:pointer; }
        .py-card-remove { border:none; background:none; color:#C4705A; font-size:16px; cursor:pointer; }

        .py-add-card-btn { padding:11px 18px; background:#F0EDE8; color:#2D5A45; border:none; border-radius:12px; font-size:13px; font-weight:700; cursor:pointer; margin-bottom:24px; }
        .py-form { background:white; border-radius:14px; padding:16px; border:1px solid #eee; margin-bottom:20px; display:flex; flex-direction:column; gap:10px; }
        .py-form input, .py-form select { width:100%; box-sizing:border-box; padding:12px 14px; border-radius:10px; border:1px solid #ddd; font-size:16px; outline:none; font-family:inherit; }
        .py-form-actions { display:flex; gap:10px; }
        .py-form-submit { flex:1; padding:11px; background:#2D5A45; color:white; border:none; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; }
        .py-form-cancel { flex:1; padding:11px; background:#F0EDE8; color:#555; border:none; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; }

        .py-history-item { background:white; border-radius:14px; padding:16px; border:1px solid #eee; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; }
        .py-history-name { font-weight:700; font-size:14px; margin-bottom:2px; }
        .py-history-date { font-size:12px; color:#999; }
        .py-history-amount { font-weight:800; font-size:15px; color:#C4705A; }
        .py-empty { text-align:center; padding:32px 20px; color:#999; background:white; border-radius:16px; border:1px dashed #ddd; font-size:14px; }

        .py-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#1A1A1A; color:white; padding:14px 22px; border-radius:14px; font-size:14px; font-weight:600; box-shadow:0 6px 20px rgba(0,0,0,0.25); z-index:200; max-width:90%; text-align:center; }
      `}} />
      <div className="py-page">
        <div className="py-container">
          <h1 className="py-title">Оплаты</h1>

          <div className="py-summary">
            <div className="py-summary-label">Доступно к выводу</div>
            <div className="py-summary-value">{available.toLocaleString('ru-RU')} ₽</div>
            <div className="py-summary-sub">
              <span>Всего заработано: {totalEarned.toLocaleString('ru-RU')} ₽</span>
              <span>Выведено: {totalWithdrawn.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>

          {showWithdraw ? (
            <form className="py-form" onSubmit={handleWithdraw}>
              <input
                type="number"
                min="1"
                max={available}
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
                placeholder={`До ${available} ₽`}
                required
              />
              {cards.length > 0 ? (
                <select value={withdrawCardId} onChange={e => setWithdrawCardId(e.target.value)} required>
                  <option value="" disabled>Выберите карту</option>
                  {cards.map(c => <option key={c.id} value={c.id}>{c.brand} •••• {c.last4}</option>)}
                </select>
              ) : (
                <div className="py-empty">Сначала добавьте карту для вывода ниже</div>
              )}
              <div className="py-form-actions">
                <button type="button" className="py-form-cancel" onClick={() => setShowWithdraw(false)}>Отмена</button>
                <button type="submit" className="py-form-submit" disabled={cards.length === 0}>Вывести</button>
              </div>
            </form>
          ) : (
            <button className="py-withdraw-btn" onClick={() => setShowWithdraw(true)} disabled={available <= 0}>
              Вывести средства
            </button>
          )}

          <div className="py-section-title">Карты для вывода</div>
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

          <div className="py-section-title">История выводов</div>
          {withdrawals.length === 0 ? (
            <div className="py-empty">Пока не было выводов средств</div>
          ) : (
            withdrawals.map(w => (
              <div key={w.id} className="py-history-item">
                <div>
                  <div className="py-history-name">Вывод на карту •••• {w.cardLast4}</div>
                  <div className="py-history-date">{formatDateTime(w.date)}</div>
                </div>
                <div className="py-history-amount">−{w.amount.toLocaleString('ru-RU')} ₽</div>
              </div>
            ))
          )}
        </div>
      </div>

      {toast && <div className="py-toast">{toast}</div>}
    </>
  )
}

function formatDateTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) + ', ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

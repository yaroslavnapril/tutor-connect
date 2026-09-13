'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Booking } from '../../data/bookings'
import { loadAllBookings, setBookingStatus, daysSince } from '../../data/bookingHelpers'

const DECLINE_RECOVERY_DAYS = 3

export default function RequestDetailPage() {
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [confirmAction, setConfirmAction] = useState<'accept' | 'decline' | null>(null)

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
        Заявка не найдена. <Link href="/requests" style={{ color: '#2D5A45' }}>Вернуться к заявкам</Link>
      </div>
    )
  }
  if (!booking) return null

  const confirmYes = () => {
    if (confirmAction === 'accept') setBookingStatus(booking.id, 'confirmed')
    if (confirmAction === 'decline') setBookingStatus(booking.id, 'cancelled')
    router.push('/requests')
  }

  const daysLeft = booking.statusChangedAt ? DECLINE_RECOVERY_DAYS - daysSince(booking.statusChangedAt) : DECLINE_RECOVERY_DAYS
  const canStillAccept = booking.status !== 'cancelled' || daysLeft > 0

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .rd-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .rd-container { max-width:600px; margin:0 auto; padding:24px 20px; }
        .rd-back { display:inline-flex; align-items:center; gap:6px; color:#2D5A45; text-decoration:none; font-weight:600; font-size:14px; margin-bottom:20px; }
        .rd-card { background:white; border-radius:24px; padding:28px; border:1px solid #eee; }
        .rd-status { display:inline-block; padding:5px 14px; border-radius:999px; font-size:12px; font-weight:700; margin-bottom:16px; }
        .rd-status.pending { background:#FDF3E3; color:#B8860B; }
        .rd-status.confirmed { background:#E6F0EA; color:#2D5A45; }
        .rd-status.cancelled { background:#F5E6E2; color:#C4705A; }
        .rd-status.completed { background:#EFEFEF; color:#888; }
        .rd-name { font-size:24px; font-weight:800; margin-bottom:4px; }
        .rd-subject { font-size:15px; color:#888; margin-bottom:24px; }
        .rd-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px; }
        .rd-item { background:#FAF8F4; border-radius:14px; padding:14px; }
        .rd-item-label { font-size:12px; color:#999; margin-bottom:4px; }
        .rd-item-value { font-size:15px; font-weight:700; color:#1A1A1A; }
        .rd-message-label { font-size:14px; font-weight:700; margin-bottom:8px; }
        .rd-message { background:#FAF8F4; border-radius:14px; padding:16px; font-size:14px; color:#444; line-height:1.6; margin-bottom:24px; }
        .rd-price-row { display:flex; align-items:baseline; gap:6px; margin-bottom:24px; }
        .rd-price { font-size:28px; font-weight:800; }
        .rd-price-unit { font-size:14px; color:#999; }
        .rd-actions { display:flex; gap:10px; }
        .rd-accept { flex:1; padding:15px; background:#2D5A45; color:white; border:none; border-radius:14px; font-size:15px; font-weight:700; cursor:pointer; }
        .rd-accept:hover { background:#244a38; }
        .rd-decline { flex:1; padding:15px; background:#F5E6E2; color:#C4705A; border:none; border-radius:14px; font-size:15px; font-weight:700; cursor:pointer; }
        .rd-decline:hover { background:#f0d8d2; }
        .rd-expired { text-align:center; padding:16px; color:#999; font-size:14px; }

        .rd-modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:200; display:flex; align-items:center; justify-content:center; padding:24px; }
        .rd-modal { background:white; border-radius:20px; padding:24px; max-width:380px; width:100%; }
        .rd-modal h3 { font-size:18px; font-weight:800; margin-bottom:10px; }
        .rd-modal p { font-size:14px; color:#555; line-height:1.6; margin-bottom:22px; }
        .rd-modal-actions { display:flex; gap:10px; }
        .rd-modal-cancel { flex:1; padding:13px; background:#F0EDE8; color:#555; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; }
        .rd-modal-confirm { flex:1; padding:13px; color:white; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; }
        .rd-modal-confirm.accept { background:#2D5A45; }
        .rd-modal-confirm.decline { background:#C4705A; }
      `}} />
      <div className="rd-page">
        <div className="rd-container">
          <Link href="/requests" className="rd-back">← Назад к заявкам</Link>

          <div className="rd-card">
            <span className={`rd-status ${booking.status}`}>
              {booking.status === 'pending' && 'Ожидает решения'}
              {booking.status === 'confirmed' && 'Принято'}
              {booking.status === 'cancelled' && 'Отклонено'}
              {booking.status === 'completed' && 'Завершено'}
            </span>
            <div className="rd-name">{booking.studentName}</div>
            <div className="rd-subject">{booking.subject}</div>

            <div className="rd-grid">
              <div className="rd-item">
                <div className="rd-item-label">Дата</div>
                <div className="rd-item-value">{formatDate(booking.date)}</div>
              </div>
              <div className="rd-item">
                <div className="rd-item-label">Время</div>
                <div className="rd-item-value">{booking.time}</div>
              </div>
              <div className="rd-item">
                <div className="rd-item-label">Длительность</div>
                <div className="rd-item-value">{booking.duration} мин</div>
              </div>
              <div className="rd-item">
                <div className="rd-item-label">Формат</div>
                <div className="rd-item-value">{booking.format === 'online' ? 'Онлайн' : 'Очно'}</div>
              </div>
            </div>

            {booking.message && (
              <>
                <div className="rd-message-label">Сообщение от ученика</div>
                <div className="rd-message">{booking.message}</div>
              </>
            )}

            <div className="rd-price-row">
              <span className="rd-price">{booking.price}</span>
              <span className="rd-price-unit">₽ за занятие</span>
            </div>

            {booking.status === 'pending' && (
              <div className="rd-actions">
                <button className="rd-accept" onClick={() => setConfirmAction('accept')}>Принять</button>
                <button className="rd-decline" onClick={() => setConfirmAction('decline')}>Отклонить</button>
              </div>
            )}

            {booking.status === 'cancelled' && canStillAccept && (
              <div className="rd-actions">
                <button className="rd-accept" onClick={() => setConfirmAction('accept')}>Всё же принять</button>
              </div>
            )}
            {booking.status === 'cancelled' && !canStillAccept && (
              <div className="rd-expired">Срок восстановления заявки истёк</div>
            )}
          </div>
        </div>
      </div>

      {confirmAction && (
        <div className="rd-modal-overlay" onClick={() => setConfirmAction(null)}>
          <div className="rd-modal" onClick={e => e.stopPropagation()}>
            <h3>{confirmAction === 'accept' ? 'Принять заявку?' : 'Отклонить заявку?'}</h3>
            <p>
              {confirmAction === 'accept'
                ? `Вы подтверждаете занятие с учеником ${booking.studentName} на ${formatDate(booking.date)} в ${booking.time}.`
                : `Заявка от ${booking.studentName} будет отклонена. В течение ${DECLINE_RECOVERY_DAYS} дней вы всё ещё сможете передумать и принять её.`}
            </p>
            <div className="rd-modal-actions">
              <button className="rd-modal-cancel" onClick={() => setConfirmAction(null)}>Отмена</button>
              <button className={`rd-modal-confirm ${confirmAction}`} onClick={confirmYes}>
                {confirmAction === 'accept' ? 'Да, принять' : 'Да, отклонить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TutorRequest, PLATFORM_COMMISSION } from '../../data/requests'
import { loadAllRequests, setRequestStatus, daysSince, timeAgo, FORMAT_LABELS } from '../../data/requestHelpers'

const DECLINE_RECOVERY_DAYS = 3

export default function RequestDetailPage() {
  const router = useRouter()
  const [request, setRequest] = useState<TutorRequest | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [confirmAction, setConfirmAction] = useState<'accept' | 'decline' | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id')
    if (!id) { setNotFound(true); return }
    const all = loadAllRequests()
    const found = all.find(r => r.id === id)
    if (!found) { setNotFound(true); return }
    setRequest(found)
  }, [])

  if (notFound) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
        Заявка не найдена. <Link href="/requests" style={{ color: '#2D5A45' }}>Вернуться к заявкам</Link>
      </div>
    )
  }
  if (!request) return null

  const earnings = Math.round(request.budgetPrice * (1 - PLATFORM_COMMISSION))

  const confirmYes = () => {
    if (confirmAction === 'accept') {
      setRequestStatus(request.id, 'accepted')
      router.push('/requests')
    }
    if (confirmAction === 'decline') {
      setRequestStatus(request.id, 'declined')
      router.push('/requests')
    }
  }

  const startChat = () => {
    setToast('Чат пока в разработке — ученик получит уведомление о принятии заявки')
    setTimeout(() => setToast(null), 3500)
  }

  const daysLeft = request.statusChangedAt ? DECLINE_RECOVERY_DAYS - daysSince(request.statusChangedAt) : DECLINE_RECOVERY_DAYS
  const canStillAccept = request.status !== 'declined' || daysLeft > 0

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .rd-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .rd-container { max-width:600px; margin:0 auto; padding:24px 20px; }
        .rd-back { display:inline-flex; align-items:center; gap:6px; color:#2D5A45; text-decoration:none; font-weight:600; font-size:14px; margin-bottom:20px; }
        .rd-status { display:inline-block; padding:5px 14px; border-radius:999px; font-size:12px; font-weight:700; margin-bottom:14px; }
        .rd-status.pending { background:#FDF3E3; color:#B8860B; }
        .rd-status.accepted { background:#E6F0EA; color:#2D5A45; }
        .rd-status.declined { background:#F5E6E2; color:#C4705A; }
        .rd-time-ago { float:right; font-size:12px; color:#aaa; }
        .rd-name { font-size:24px; font-weight:800; margin-bottom:4px; }
        .rd-subject-row { display:flex; align-items:center; gap:8px; margin-bottom:24px; }
        .rd-subject { font-size:16px; color:#2D5A45; font-weight:700; }
        .rd-goal-tag { font-size:12px; font-weight:700; color:#C4705A; background:#F5E6E2; padding:4px 12px; border-radius:999px; }

        .rd-section { background:white; border-radius:20px; padding:22px; border:1px solid #eee; margin-bottom:16px; }
        .rd-section h2 { font-size:15px; font-weight:700; margin-bottom:14px; color:#1A1A1A; }

        .rd-budget-grid { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:12px; }
        .rd-budget-col { text-align:center; }
        .rd-budget-label { font-size:11px; color:#999; text-transform:uppercase; letter-spacing:0.4px; margin-bottom:6px; }
        .rd-budget-value { font-size:22px; font-weight:800; }
        .rd-budget-value.offer { color:#1A1A1A; }
        .rd-budget-value.earn { color:#2D5A45; }
        .rd-budget-arrow { color:#ccc; font-size:20px; }
        .rd-commission-note { text-align:center; font-size:12px; color:#999; margin-top:14px; padding-top:14px; border-top:1px solid #f0f0f0; }

        .rd-location-row { display:flex; gap:20px; flex-wrap:wrap; }
        .rd-location-item { display:flex; align-items:center; gap:8px; font-size:14px; color:#444; font-weight:600; }

        .rd-tags-row { display:flex; gap:8px; flex-wrap:wrap; }
        .rd-tag { padding:6px 14px; background:#F0EDE8; color:#2D5A45; border-radius:999px; font-size:13px; font-weight:600; }

        .rd-forwhom { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; background:#EAF1EC; color:#2D5A45; border-radius:999px; font-size:13px; font-weight:700; margin-bottom:16px; }
        .rd-slots-grid { display:flex; flex-direction:column; gap:8px; margin-bottom:16px; }
        .rd-slot-row { display:flex; align-items:center; gap:10px; padding:10px 14px; background:#FAF8F4; border-radius:12px; }
        .rd-slot-day { font-size:13px; font-weight:800; color:#2D5A45; width:28px; }
        .rd-slot-time { font-size:13px; color:#444; }
        .rd-comment-label { font-size:13px; font-weight:700; color:#444; margin-bottom:6px; }
        .rd-comment { font-size:14px; color:#555; line-height:1.6; }

        .rd-actions { display:flex; gap:10px; }
        .rd-chat { flex:1.4; padding:15px; background:#2D5A45; color:white; border:none; border-radius:14px; font-size:15px; font-weight:700; cursor:pointer; }
        .rd-chat:hover { background:#244a38; }
        .rd-decline { flex:1; padding:15px; background:#F5E6E2; color:#C4705A; border:none; border-radius:14px; font-size:15px; font-weight:700; cursor:pointer; }
        .rd-decline:hover { background:#f0d8d2; }
        .rd-accept-only { width:100%; padding:15px; background:#2D5A45; color:white; border:none; border-radius:14px; font-size:15px; font-weight:700; cursor:pointer; }
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

        .rd-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#1A1A1A; color:white; padding:14px 22px; border-radius:14px; font-size:14px; font-weight:600; box-shadow:0 6px 20px rgba(0,0,0,0.25); z-index:210; max-width:90%; text-align:center; }
      `}} />
      <div className="rd-page">
        <div className="rd-container">
          <Link href="/requests" className="rd-back">← Назад к заявкам</Link>

          <span className={`rd-status ${request.status}`}>
            {request.status === 'pending' && 'Ожидает решения'}
            {request.status === 'accepted' && 'Принято'}
            {request.status === 'declined' && 'Отклонено'}
          </span>
          <span className="rd-time-ago">{timeAgo(request.createdAt)}</span>

          <div className="rd-name">{request.studentName}</div>
<div className="rd-subject-row">
  <span className="rd-subject">{request.subject}</span>
</div>

          <div className="rd-section">
            <h2>Бюджет</h2>
            <div className="rd-budget-col">
  <div className="rd-budget-label">Ученик готов платить</div>
  <div className="rd-budget-value offer">{request.budgetPrice} ₽</div>
</div>
<div className="rd-budget-arrow">→</div>
<div className="rd-budget-col">
  <div className="rd-budget-label">Вы получите</div>
  <div className="rd-budget-value earn">{earnings} ₽</div>
</div>
</div>
<div className="rd-commission-note">комиссия платформы {Math.round(PLATFORM_COMMISSION * 100)}%</div>
          </div>

          <div className="rd-section">
            <h2>Локация и формат</h2>
            <div className="rd-location-row">
              <div className="rd-location-item">📍 {request.city}</div>
              <div className="rd-location-item">{FORMAT_LABELS[request.format]}</div>
            </div>
          </div>

          <div className="rd-section">
            <h2>Цель занятий</h2>
            <div className="rd-tags-row">
              <span className="rd-tag">{request.goal}</span>
              <span className="rd-tag">{request.studentGrade}</span>
            </div>
          </div>

          <div className="rd-section">
            <h2>Пожелания к занятиям</h2>
            <div className="rd-forwhom">
              {request.forWhom === 'self' ? '👤 Ищет для себя' : '👨‍👩‍👧 Ищут для ребёнка'}
            </div>
            <div className="rd-slots-grid">
              {request.desiredSlots.map((s, i) => (
                <div key={i} className="rd-slot-row">
                  <span className="rd-slot-day">{s.day}</span>
                  <span className="rd-slot-time">{s.from}–{s.to}</span>
                </div>
              ))}
            </div>
            {request.comment && (
              <>
                <div className="rd-comment-label">Комментарий</div>
                <div className="rd-comment">{request.comment}</div>
              </>
            )}
          </div>

          {request.status === 'pending' && (
            <div className="rd-actions">
              <button className="rd-chat" onClick={() => setConfirmAction('accept')}>Принять и начать чат</button>
              <button className="rd-decline" onClick={() => setConfirmAction('decline')}>Отклонить</button>
            </div>
          )}

          {request.status === 'accepted' && (
            <button className="rd-accept-only" onClick={startChat}>Открыть чат с учеником</button>
          )}

          {request.status === 'declined' && canStillAccept && (
            <button className="rd-accept-only" onClick={() => setConfirmAction('accept')}>Всё же принять</button>
          )}
          {request.status === 'declined' && !canStillAccept && (
            <div className="rd-expired">Срок восстановления заявки истёк</div>
          )}
        </div>
      </div>

      {confirmAction && (
        <div className="rd-modal-overlay" onClick={() => setConfirmAction(null)}>
          <div className="rd-modal" onClick={e => e.stopPropagation()}>
            <h3>{confirmAction === 'accept' ? 'Принять заявку?' : 'Отклонить заявку?'}</h3>
            <p>
              {confirmAction === 'accept'
                ? `Вы подтверждаете готовность заниматься с ${request.studentName}. Откроется чат для согласования расписания.`
                : `Заявка от ${request.studentName} будет отклонена. В течение ${DECLINE_RECOVERY_DAYS} дней вы всё ещё сможете передумать и принять её.`}
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

      {toast && <div className="rd-toast">{toast}</div>}
    </>
  )
}

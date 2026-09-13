'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TutorRequest } from '../data/requests'
import { CURRENT_TUTOR_ID } from '../data/currentUser'
import { loadAllRequests, daysSince, timeAgo } from '../data/requestHelpers'

const DECLINE_RECOVERY_DAYS = 3

type Tab = 'pending' | 'accepted' | 'declined'

export default function RequestsPage() {
  const [requests, setRequests] = useState<TutorRequest[]>([])
  const [tab, setTab] = useState<Tab>('pending')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setRequests(loadAllRequests())
  }, [])

  if (!mounted) return null

  const mine = requests.filter(r => r.tutorId === CURRENT_TUTOR_ID)
  const pending = mine.filter(r => r.status === 'pending').sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const accepted = mine.filter(r => r.status === 'accepted').sort((a, b) => (b.statusChangedAt || '').localeCompare(a.statusChangedAt || ''))
  const declined = mine.filter(r => r.status === 'declined').sort((a, b) => (b.statusChangedAt || '').localeCompare(a.statusChangedAt || ''))

  const shown = tab === 'pending' ? pending : tab === 'accepted' ? accepted : declined

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
        .rq-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px; }
        .rq-name { font-weight:700; font-size:16px; }
        .rq-time-ago { font-size:11px; color:#aaa; white-space:nowrap; }
        .rq-subject-row { display:flex; align-items:center; gap:8px; margin-bottom:12px; flex-wrap:wrap; }
        .rq-subject { font-size:14px; color:#2D5A45; font-weight:700; }
        .rq-goal-tag { font-size:11px; font-weight:700; color:#C4705A; background:#F5E6E2; padding:3px 10px; border-radius:999px; }
        .rq-budget-row { display:flex; align-items:baseline; gap:6px; margin-bottom:10px; }
        .rq-budget { font-size:18px; font-weight:800; color:#1A1A1A; }
        .rq-budget-unit { font-size:12px; color:#999; }
        .rq-meta-row { display:flex; gap:14px; flex-wrap:wrap; font-size:12px; color:#666; margin-bottom:10px; }
        .rq-slots { display:flex; gap:6px; flex-wrap:wrap; }
        .rq-slot-chip { font-size:11px; font-weight:600; color:#2D5A45; background:#EAF1EC; padding:4px 10px; border-radius:999px; }
        .rq-recovery { margin-top:10px; font-size:12px; color:#C4705A; font-weight:600; }
        .rq-recovery.expired { color:#aaa; }
        .rq-empty { text-align:center; padding:48px 20px; color:#999; background:white; border-radius:18px; border:1px dashed #ddd; }
      `}} />
      <div className="rq-page">
        <div className="rq-container">
          <h1 className="rq-title">Заявки</h1>
          <p className="rq-subtitle">Запросы на подбор занятий от учеников</p>

          <div className="rq-tabs">
            <button className={`rq-tab ${tab === 'pending' ? 'active' : ''}`} onClick={() => setTab('pending')}>Новые {pending.length > 0 && `(${pending.length})`}</button>
            <button className={`rq-tab ${tab === 'accepted' ? 'active' : ''}`} onClick={() => setTab('accepted')}>Принято</button>
            <button className={`rq-tab ${tab === 'declined' ? 'active' : ''}`} onClick={() => setTab('declined')}>Отклонено</button>
          </div>

          {shown.length === 0 ? (
            <div className="rq-empty">
              {tab === 'pending' && 'Новых заявок пока нет'}
              {tab === 'accepted' && 'Пока нет принятых заявок'}
              {tab === 'declined' && 'Пока нет отклонённых заявок'}
            </div>
          ) : (
            <div className="rq-list">
              {shown.map(r => {
                const daysLeft = r.statusChangedAt ? DECLINE_RECOVERY_DAYS - daysSince(r.statusChangedAt) : DECLINE_RECOVERY_DAYS
                return (
                  <Link key={r.id} href={`/requests/detail?id=${r.id}`} className="rq-card">
                    <div className="rq-top">
                      <div className="rq-name">{r.studentName}</div>
                      <span className="rq-time-ago">{timeAgo(r.createdAt)}</span>
                    </div>
                    <div className="rq-subject-row">
                      <span className="rq-subject">{r.subject}</span>
                      <span className="rq-goal-tag">{r.goal}</span>
                    </div>
                    <div className="rq-budget-row">
                      <span className="rq-budget">{r.budgetPrice} ₽</span>
                      <span className="rq-budget-unit">за {r.lessonDuration} мин</span>
                    </div>
                    <div className="rq-meta-row">
                      <span>📍 {r.city}</span>
                      <span>{FORMAT_LABELS[r.format]}</span>
                      <span>🎓 {r.studentGrade}</span>
                    </div>
                    <div className="rq-slots">
                      {r.desiredSlots.slice(0, 3).map((s, i) => (
                        <span key={i} className="rq-slot-chip">{s.day} {s.from}–{s.to}</span>
                      ))}
                      {r.desiredSlots.length > 3 && <span className="rq-slot-chip">+{r.desiredSlots.length - 3}</span>}
                    </div>
                    {tab === 'declined' && (
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

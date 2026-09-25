'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { TUTORS } from '../data/tutors'
import { CURRENT_TUTOR_ID } from '../data/currentUser'
import { applyOverride } from '../data/tutorOverrides'
import StarIcon from '../components/StarIcon'

export default function MyProfilePage() {
  const baseTutor = TUTORS.find(t => t.id === CURRENT_TUTOR_ID)
  const [tutor, setTutor] = useState(baseTutor)
  const [mounted, setMounted] = useState(false)
  const [photoOpen, setPhotoOpen] = useState(false)

  useEffect(() => {
    if (!baseTutor) return
    const applyLatest = () => setTutor(applyOverride(baseTutor))
    applyLatest()
    setMounted(true)
    window.addEventListener('tc-tutor-profile-change', applyLatest)
    return () => window.removeEventListener('tc-tutor-profile-change', applyLatest)
  }, [])

  if (!mounted || !tutor) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .mp-page { background:#FAFAF7; min-height:100vh; padding-bottom:60px; }
        .mp-container { max-width:720px; margin:0 auto; padding:32px 20px 0; }

        .mp-top-row { display:flex; align-items:flex-start; gap:20px; margin-bottom:20px; }
        .mp-avatar { width:104px; height:104px; border-radius:28px; overflow:hidden; flex-shrink:0; background:#eee; cursor:pointer; -webkit-transform:translateZ(0); transform:translateZ(0); }
        .mp-avatar img { width:100%; height:100%; object-fit:cover; object-position:center 22%; display:block; }
        .mp-identity { flex:1; padding-top:4px; }
        .mp-name { font-size:26px; font-weight:800; color:#14231C; letter-spacing:-0.5px; line-height:1.1; margin-bottom:6px; }
        .mp-role { font-size:13px; font-weight:700; color:#C4705A; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px; }
        .mp-meta-row { display:flex; flex-wrap:wrap; gap:6px 14px; font-size:13px; color:#8A8A82; }
        .mp-meta-row b { color:#14231C; font-weight:700; }
        .mp-rating-pill { display:inline-flex; align-items:center; gap:5px; background:#14231C; color:white; padding:5px 12px; border-radius:999px; font-size:13px; font-weight:700; }

        .mp-edit-btn { display:block; width:100%; text-align:center; padding:15px; background:transparent; color:#14231C; border:1.5px solid #14231C; border-radius:14px; font-size:14px; font-weight:700; text-decoration:none; margin-bottom:36px; letter-spacing:0.2px; }
        .mp-edit-btn:hover { background:#14231C; color:white; }

        .mp-section { margin-bottom:36px; }
        .mp-section-label { font-size:11px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:#B8B8AE; margin-bottom:14px; }
        .mp-about-text { font-size:16px; line-height:1.75; color:#33362F; }

        .mp-tags { display:flex; flex-wrap:wrap; gap:8px; }
        .mp-tag { padding:7px 15px; border:1px solid #DEDED4; border-radius:999px; font-size:13px; font-weight:600; color:#33362F; background:white; }

        .mp-timeline { position:relative; padding-left:22px; }
        .mp-timeline::before { content:''; position:absolute; left:5px; top:6px; bottom:6px; width:1px; background:#E2E2D8; }
        .mp-timeline-item { position:relative; padding-bottom:20px; }
        .mp-timeline-item:last-child { padding-bottom:0; }
        .mp-timeline-item::before { content:''; position:absolute; left:-22px; top:5px; width:9px; height:9px; border-radius:50%; background:#C4705A; }
        .mp-timeline-text { font-size:15px; color:#33362F; line-height:1.5; }

        .mp-price-block { display:flex; align-items:baseline; justify-content:space-between; padding:22px 24px; background:#14231C; border-radius:20px; }
        .mp-price-label { font-size:13px; color:rgba(255,255,255,0.6); font-weight:600; }
        .mp-price-value { font-size:28px; font-weight:800; color:white; }
        .mp-price-unit { font-size:14px; color:rgba(255,255,255,0.5); font-weight:500; }

        .mp-lightbox { position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:100; display:flex; align-items:center; justify-content:center; padding:24px; }
        .mp-lightbox img { max-width:100%; max-height:85vh; border-radius:16px; object-fit:contain; }
        .mp-lightbox-close { position:absolute; top:20px; right:20px; width:44px; height:44px; border-radius:50%; background:rgba(255,255,255,0.15); color:white; border:none; font-size:22px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
      `}} />

      <div className="mp-page">
        <div className="mp-container">
          <div className="mp-top-row">
            <div className="mp-avatar" onClick={() => setPhotoOpen(true)}>
              <img src={tutor.photo} alt={tutor.name} />
            </div>
            <div className="mp-identity">
              <div className="mp-name">{tutor.name}</div>
              <div className="mp-role">{tutor.badge}</div>
              <div className="mp-meta-row">
                <span className="mp-rating-pill"><StarIcon size={12} /> {tutor.rating}</span>
                <span><b>{tutor.city}</b></span>
                <span><b>{tutor.experience}</b> лет опыта</span>
                <span><b>{tutor.reviews}</b> отзывов</span>
              </div>
            </div>
          </div>

          <Link href="/profile/edit" className="mp-edit-btn">Редактировать анкету</Link>

          <div className="mp-section">
            <div className="mp-section-label">Обо мне</div>
            <p className="mp-about-text">{tutor.about}</p>
          </div>

          <div className="mp-section">
            <div className="mp-section-label">Предметы</div>
            <div className="mp-tags">
              {tutor.subjects.map(s => <span key={s} className="mp-tag">{s}</span>)}
            </div>
          </div>

          <div className="mp-section">
            <div className="mp-section-label">Образование</div>
            <div className="mp-timeline">
              {tutor.education.map((e, i) => (
                <div key={i} className="mp-timeline-item">
                  <div className="mp-timeline-text">{e}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mp-section">
            <div className="mp-section-label">Достижения</div>
            <div className="mp-timeline">
              {tutor.achievements.map((a, i) => (
                <div key={i} className="mp-timeline-item">
                  <div className="mp-timeline-text">{a}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mp-section">
            <div className="mp-price-block">
              <span className="mp-price-label">Стоимость занятия</span>
              <span><span className="mp-price-value">{tutor.price}</span> <span className="mp-price-unit">₽/час</span></span>
            </div>
          </div>
        </div>
      </div>

      {photoOpen && (
        <div className="mp-lightbox" onClick={() => setPhotoOpen(false)}>
          <button className="mp-lightbox-close" onClick={() => setPhotoOpen(false)}>✕</button>
          <img src={tutor.photo} alt={tutor.name} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}

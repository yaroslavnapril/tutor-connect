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
        .mp-page { background:#F5F3EF; min-height:100vh; padding-bottom:60px; }
        .mp-hero { position:relative; width:100%; height:160px; overflow:hidden; margin-top:0; background:linear-gradient(135deg,#2D5A45,#3d7a5c); }
        .mp-badge { position:absolute; top:20px; left:20px; padding:7px 16px; background:rgba(255,255,255,0.2); backdrop-filter:blur(4px); color:white; font-size:13px; font-weight:700; border-radius:999px; }
        .mp-rating { position:absolute; top:20px; right:20px; padding:7px 16px; background:rgba(255,255,255,0.95); color:#1A1A1A; font-size:14px; font-weight:700; border-radius:999px; display:inline-flex; align-items:center; gap:5px; }
        .mp-avatar-wrap { max-width:900px; margin:0 auto; padding:0 20px; display:flex; justify-content:center; margin-top:-70px; position:relative; }
        .mp-avatar { width:140px; height:140px; border-radius:50%; overflow:hidden; border:5px solid white; box-shadow:0 4px 16px rgba(0,0,0,0.15); background:#eee; cursor:pointer; -webkit-transform:translateZ(0); transform:translateZ(0); }
        .mp-avatar img { width:100%; height:100%; object-fit:cover; object-position:center 22%; display:block; }
        .mp-hero-name { text-align:center; padding:12px 20px 0; }
        .mp-hero-name h1 { font-size:26px; font-weight:800; margin-bottom:6px; color:#1A1A1A; }
        .mp-hero-meta { font-size:14px; color:#888; }

        .mp-edit-wrap { max-width:900px; margin:0 auto; padding:20px 20px 0; }
        .mp-edit-btn { display:block; width:100%; text-align:center; padding:15px; background:#C4705A; color:white; border-radius:14px; font-size:15px; font-weight:700; text-decoration:none; }
        .mp-edit-btn:hover { background:#b35d48; }

        .mp-content { max-width:900px; margin:0 auto; padding:20px; display:flex; flex-direction:column; gap:20px; }
        .mp-section { background:white; border-radius:20px; padding:24px; border:1px solid #eee; }
        .mp-section h2 { font-size:16px; font-weight:700; margin-bottom:12px; color:#1A1A1A; }
        .mp-section p { font-size:15px; color:#444; line-height:1.7; }
        .mp-tags { display:flex; flex-wrap:wrap; gap:8px; }
        .mp-tag { padding:6px 14px; background:#F0EDE8; color:#2D5A45; border-radius:999px; font-size:13px; font-weight:500; }
        .mp-list { list-style:none; display:flex; flex-direction:column; gap:10px; }
        .mp-list li { font-size:14px; color:#444; padding-left:20px; position:relative; line-height:1.5; }
        .mp-list li::before { content:'•'; position:absolute; left:4px; color:#C4705A; font-weight:700; }
        .mp-price-row { display:flex; align-items:baseline; gap:6px; }
        .mp-price { font-size:26px; font-weight:800; }
        .mp-price-unit { font-size:14px; color:#999; }

        .mp-lightbox { position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:100; display:flex; align-items:center; justify-content:center; padding:24px; }
        .mp-lightbox img { max-width:100%; max-height:85vh; border-radius:16px; object-fit:contain; }
        .mp-lightbox-close { position:absolute; top:20px; right:20px; width:44px; height:44px; border-radius:50%; background:rgba(255,255,255,0.15); color:white; border:none; font-size:22px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
      `}} />

      <div className="mp-page">
        <div className="mp-hero">
          <span className="mp-badge">{tutor.badge}</span>
          <span className="mp-rating"><StarIcon size={14} /> {tutor.rating}</span>
        </div>
        <div className="mp-avatar-wrap">
          <div className="mp-avatar" onClick={() => setPhotoOpen(true)}>
            <img src={tutor.photo} alt={tutor.name} />
          </div>
        </div>
        <div className="mp-hero-name">
          <h1>{tutor.name}</h1>
          <div className="mp-hero-meta">{tutor.city} • {tutor.experience} лет опыта • {tutor.reviews} отзывов</div>
        </div>

        <div className="mp-edit-wrap">
          <Link href="/profile/edit" className="mp-edit-btn">Редактировать анкету</Link>
        </div>

        <div className="mp-content">
          <div className="mp-section">
            <h2>О преподавателе</h2>
            <p>{tutor.about}</p>
          </div>

          <div className="mp-section">
            <h2>Предметы</h2>
            <div className="mp-tags">
              {tutor.subjects.map(s => <span key={s} className="mp-tag">{s}</span>)}
            </div>
          </div>

          <div className="mp-section">
            <h2>Образование</h2>
            <ul className="mp-list">
              {tutor.education.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>

          <div className="mp-section">
            <h2>Достижения</h2>
            <ul className="mp-list">
              {tutor.achievements.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>

          <div className="mp-section">
            <h2>Цена</h2>
            <div className="mp-price-row">
              <span className="mp-price">{tutor.price}</span>
              <span className="mp-price-unit">₽/час</span>
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

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Tutor } from '../../data/tutors'
import StarIcon from '../../components/StarIcon'

const BIO_LIMIT = 220
const REVIEWS_LIMIT = 2

export default function TutorProfileClient({ tutor }: { tutor: Tutor }) {
  const [photoOpen, setPhotoOpen] = useState(false)
  const [bioExpanded, setBioExpanded] = useState(false)
  const [reviewsExpanded, setReviewsExpanded] = useState(false)

  const bioIsLong = tutor.about.length > BIO_LIMIT
  const bioText = bioIsLong && !bioExpanded
    ? tutor.about.slice(0, BIO_LIMIT).trim() + '…'
    : tutor.about

  const reviewsIsLong = tutor.reviewsList.length > REVIEWS_LIMIT
  const shownReviews = reviewsIsLong && !reviewsExpanded
    ? tutor.reviewsList.slice(0, REVIEWS_LIMIT)
    : tutor.reviewsList

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .tp-page { background:#F5F3EF; min-height:100vh; padding-bottom:60px; }
        .tp-back-wrap { max-width:900px; margin:0 auto; padding:20px 20px 0; }
        .tp-back { display:inline-flex; align-items:center; gap:6px; color:#2D5A45; text-decoration:none; font-weight:600; font-size:14px; }

        .tp-hero { position:relative; width:100%; height:160px; overflow:hidden; margin-top:16px; background:linear-gradient(135deg,#2D5A45,#3d7a5c); }
        .tp-badge { position:absolute; top:20px; left:20px; padding:7px 16px; background:rgba(255,255,255,0.2); backdrop-filter:blur(4px); color:white; font-size:13px; font-weight:700; border-radius:999px; }
        .tp-rating { position:absolute; top:20px; right:20px; padding:7px 16px; background:rgba(255,255,255,0.95); color:#1A1A1A; font-size:14px; font-weight:700; border-radius:999px; display:inline-flex; align-items:center; gap:5px; }
        .tp-avatar-wrap { max-width:900px; margin:0 auto; padding:0 20px; display:flex; justify-content:center; margin-top:-70px; position:relative; }
        .tp-avatar { width:140px; height:140px; border-radius:50%; overflow:hidden; border:5px solid white; box-shadow:0 4px 16px rgba(0,0,0,0.15); background:#eee; cursor:pointer; -webkit-transform:translateZ(0); transform:translateZ(0); }
        .tp-avatar img { width:100%; height:100%; object-fit:cover; object-position:center 22%; display:block; }
        .tp-hero-name { text-align:center; padding:12px 20px 0; }
        .tp-hero-name h1 { font-size:26px; font-weight:800; margin-bottom:6px; color:#1A1A1A; }
        .tp-hero-meta { font-size:14px; color:#888; }

        .tp-content { max-width:900px; margin:0 auto; padding:32px 20px; display:grid; grid-template-columns:1fr; gap:24px; }
        .tp-main { display:flex; flex-direction:column; gap:24px; }
        .tp-section { background:white; border-radius:20px; padding:24px; border:1px solid #eee; }
        .tp-section h2 { font-size:18px; font-weight:700; margin-bottom:14px; color:#1A1A1A; }
        .tp-section p { font-size:15px; color:#444; line-height:1.7; }
        .tp-more-btn-wrap { display:flex; justify-content:center; margin-top:12px; }
        .tp-more-btn { padding:10px 22px; background:#F0EDE8; color:#2D5A45; border:none; border-radius:999px; font-size:13px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px; }
        .tp-more-btn:hover { background:#e5e0d8; }
        .tp-more-btn svg { width:12px; height:12px; transition:0.2s; }
        .tp-more-btn.expanded svg { transform:rotate(180deg); }

        .tp-tags { display:flex; flex-wrap:wrap; gap:8px; }
        .tp-tag { padding:6px 14px; background:#F0EDE8; color:#2D5A45; border-radius:999px; font-size:13px; font-weight:500; }

        .tp-list { list-style:none; display:flex; flex-direction:column; gap:10px; }
        .tp-list li { font-size:14px; color:#444; padding-left:20px; position:relative; line-height:1.5; }
        .tp-list li::before { content:'•'; position:absolute; left:4px; color:#C4705A; font-weight:700; }

        .tp-review { padding:16px 0; border-bottom:1px solid #f0f0f0; }
        .tp-review:last-child { border-bottom:none; padding-bottom:0; }
        .tp-review-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
        .tp-review-name { font-weight:700; font-size:14px; }
        .tp-review-date { font-size:12px; color:#999; }
        .tp-review-stars { display:flex; gap:2px; margin-bottom:6px; }
        .tp-review-text { font-size:14px; color:#555; line-height:1.6; }

        .tp-reviews-wrap { max-width:900px; margin:0 auto; padding:0 20px 20px; }

        .tp-sidebar { background:white; border-radius:20px; padding:24px; border:1px solid #eee; height:fit-content; }
        .tp-price-row { display:flex; align-items:baseline; gap:6px; margin-bottom:16px; }
        .tp-price { font-size:32px; font-weight:800; color:#1A1A1A; }
        .tp-price-unit { font-size:15px; color:#999; }
        .tp-btn { width:100%; padding:16px; background:#C4705A; color:white; border:none; border-radius:14px; font-size:16px; font-weight:700; cursor:pointer; margin-bottom:12px; }
        .tp-btn:hover { background:#b35d48; }
        .tp-btn-secondary { width:100%; padding:16px; background:white; color:#2D5A45; border:2px solid #2D5A45; border-radius:14px; font-size:16px; font-weight:700; cursor:pointer; }
        .tp-stat-row { display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-top:1px solid #f0f0f0; font-size:14px; }
        .tp-stat-label { color:#888; }
        .tp-stat-value { font-weight:700; color:#1A1A1A; display:inline-flex; align-items:center; gap:5px; }

        .tp-lightbox { position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:100; display:flex; align-items:center; justify-content:center; padding:24px; }
        .tp-lightbox img { max-width:100%; max-height:85vh; border-radius:16px; object-fit:contain; }
        .tp-lightbox-close { position:absolute; top:20px; right:20px; width:44px; height:44px; border-radius:50%; background:rgba(255,255,255,0.15); color:white; border:none; font-size:22px; cursor:pointer; display:flex; align-items:center; justify-content:center; }

        @media(min-width:768px){
          .tp-content { grid-template-columns:1fr 320px; align-items:start; }
        }
      `}} />

      <div className="tp-page">
        <div className="tp-back-wrap">
          <Link href="/find-tutor" className="tp-back">← Назад к поиску</Link>
        </div>

        <div className="tp-hero">
          <span className="tp-badge">{tutor.badge}</span>
          <span className="tp-rating"><StarIcon size={14} /> {tutor.rating}</span>
        </div>
        <div className="tp-avatar-wrap">
          <div className="tp-avatar" onClick={() => setPhotoOpen(true)}>
            <img src={tutor.photo} alt={tutor.name} />
          </div>
        </div>
        <div className="tp-hero-name">
          <h1>{tutor.name}</h1>
          <div className="tp-hero-meta">{tutor.city} • {tutor.experience} лет опыта • {tutor.reviews} отзывов</div>
        </div>

        <div className="tp-content">
          <div className="tp-main">
            <div className="tp-section">
              <h2>О преподавателе</h2>
              <p>{bioText}</p>
              {bioIsLong && (
                <div className="tp-more-btn-wrap">
                  <button className={`tp-more-btn ${bioExpanded ? 'expanded' : ''}`} onClick={() => setBioExpanded(!bioExpanded)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                    {bioExpanded ? 'Свернуть' : 'Показать все'}
                  </button>
                </div>
              )}
            </div>

            <div className="tp-section">
              <h2>Предметы</h2>
              <div className="tp-tags">
                {tutor.subjects.map(s => <span key={s} className="tp-tag">{s}</span>)}
              </div>
            </div>

            <div className="tp-section">
              <h2>Образование</h2>
              <ul className="tp-list">
                {tutor.education.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>

            <div className="tp-section">
              <h2>Достижения</h2>
              <ul className="tp-list">
                {tutor.achievements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          </div>

          <div className="tp-sidebar">
            <div className="tp-price-row">
              <span className="tp-price">{tutor.price}</span>
              <span className="tp-price-unit">₽/час</span>
            </div>
            <button className="tp-btn">Записаться на занятие</button>
            <button className="tp-btn-secondary">Написать в чат</button>

            <div className="tp-stat-row">
              <span className="tp-stat-label">Рейтинг</span>
              <span className="tp-stat-value"><StarIcon size={14} /> {tutor.rating}</span>
            </div>
            <div className="tp-stat-row">
              <span className="tp-stat-label">Отзывы</span>
              <span className="tp-stat-value">{tutor.reviews}</span>
            </div>
            <div className="tp-stat-row">
              <span className="tp-stat-label">Опыт</span>
              <span className="tp-stat-value">{tutor.experience} лет</span>
            </div>
            <div className="tp-stat-row">
              <span className="tp-stat-label">Город</span>
              <span className="tp-stat-value">{tutor.city}</span>
            </div>
          </div>
        </div>

        <div className="tp-reviews-wrap">
          <div className="tp-section">
            <h2>Отзывы ({tutor.reviews})</h2>
            {shownReviews.map((r, i) => (
              <div key={i} className="tp-review">
                <div className="tp-review-header">
                  <span className="tp-review-name">{r.name}</span>
                  <span className="tp-review-date">{r.date}</span>
                </div>
                <div className="tp-review-stars">
                  {Array.from({ length: r.rating }).map((_, j) => <StarIcon key={j} size={14} />)}
                </div>
                <div className="tp-review-text">{r.text}</div>
              </div>
            ))}
            {reviewsIsLong && (
              <div className="tp-more-btn-wrap">
                <button className={`tp-more-btn ${reviewsExpanded ? 'expanded' : ''}`} onClick={() => setReviewsExpanded(!reviewsExpanded)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  {reviewsExpanded ? 'Свернуть' : 'Показать все'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {photoOpen && (
        <div className="tp-lightbox" onClick={() => setPhotoOpen(false)}>
          <button className="tp-lightbox-close" onClick={() => setPhotoOpen(false)}>✕</button>
          <img src={tutor.photo} alt={tutor.name} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}
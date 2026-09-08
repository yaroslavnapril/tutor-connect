import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TUTORS } from '../../data/tutors'

export function generateStaticParams() {
  return TUTORS.map(t => ({ id: t.id }))
}

export default async function TutorProfile({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await params
  const tutor = TUTORS.find(t => t.id === resolvedParams.id)
  if (!tutor) return notFound()

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .tp-page { background:#F5F3EF; min-height:100vh; padding-bottom:60px; }
        .tp-back-wrap { max-width:900px; margin:0 auto; padding:20px 20px 0; }
        .tp-back { display:inline-flex; align-items:center; gap:6px; color:#2D5A45; text-decoration:none; font-weight:600; font-size:14px; }

        .tp-hero { position:relative; width:100%; height:160px; overflow:hidden; margin-top:16px; background:linear-gradient(135deg,#2D5A45,#3d7a5c); }
.tp-badge { position:absolute; top:20px; left:20px; padding:7px 16px; background:rgba(255,255,255,0.2); backdrop-filter:blur(4px); color:white; font-size:13px; font-weight:700; border-radius:999px; }
.tp-rating { position:absolute; top:20px; right:20px; padding:7px 16px; background:rgba(255,255,255,0.95); color:#1A1A1A; font-size:14px; font-weight:700; border-radius:999px; }
.tp-avatar-wrap { max-width:900px; margin:0 auto; padding:0 20px; display:flex; justify-content:center; margin-top:-70px; position:relative; }
.tp-avatar { width:140px; height:140px; border-radius:50%; overflow:hidden; border:5px solid white; box-shadow:0 4px 16px rgba(0,0,0,0.15); background:#eee; }
.tp-avatar img { width:100%; height:100%; object-fit:cover; object-position:center 22%; display:block; }
.tp-hero-name { text-align:center; padding:12px 20px 0; }
.tp-hero-name h1 { font-size:26px; font-weight:800; margin-bottom:6px; color:#1A1A1A; }
.tp-hero-meta { font-size:14px; color:#888; }

        .tp-content { max-width:900px; margin:0 auto; padding:32px 20px; display:grid; grid-template-columns:1fr; gap:24px; }

        .tp-main { display:flex; flex-direction:column; gap:24px; }
        .tp-section { background:white; border-radius:20px; padding:24px; border:1px solid #eee; }
        .tp-section h2 { font-size:18px; font-weight:700; margin-bottom:14px; color:#1A1A1A; }
        .tp-section p { font-size:15px; color:#444; line-height:1.7; }

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
        .tp-review-stars { font-size:13px; margin-bottom:6px; }
        .tp-review-text { font-size:14px; color:#555; line-height:1.6; }

        .tp-sidebar { background:white; border-radius:20px; padding:24px; border:1px solid #eee; height:fit-content; }
        .tp-price-row { display:flex; align-items:baseline; gap:6px; margin-bottom:16px; }
        .tp-price { font-size:32px; font-weight:800; color:#1A1A1A; }
        .tp-price-unit { font-size:15px; color:#999; }
        .tp-btn { width:100%; padding:16px; background:#C4705A; color:white; border:none; border-radius:14px; font-size:16px; font-weight:700; cursor:pointer; margin-bottom:12px; }
        .tp-btn:hover { background:#b35d48; }
        .tp-btn-secondary { width:100%; padding:16px; background:white; color:#2D5A45; border:2px solid #2D5A45; border-radius:14px; font-size:16px; font-weight:700; cursor:pointer; }
        .tp-stat-row { display:flex; justify-content:space-between; padding:10px 0; border-top:1px solid #f0f0f0; font-size:14px; }
        .tp-stat-label { color:#888; }
        .tp-stat-value { font-weight:700; color:#1A1A1A; }

        @media(min-width:768px){
          .tp-content { grid-template-columns:1fr 320px; align-items:start; }
          .tp-sidebar { position:sticky; top:24px; }
        }
      `}} />

      <div className="tp-page">
        <div className="tp-back-wrap">
          <Link href="/find-tutor" className="tp-back">← Назад к поиску</Link>
        </div>

        <div className="tp-hero">
          <img src={tutor.photo} alt={tutor.name} />
          <div className="tp-hero-overlay" />
          <span className="tp-badge">{tutor.badge}</span>
          <span className="tp-rating">⭐ {tutor.rating}</span>
          <div className="tp-hero-name">
            <h1>{tutor.name}</h1>
            <div className="tp-hero-meta">{tutor.city} • {tutor.experience} лет опыта • {tutor.reviews} отзывов</div>
          </div>
        </div>

        <div className="tp-content">
          <div className="tp-main">
            <div className="tp-section">
              <h2>О преподавателе</h2>
              <p>{tutor.about}</p>
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

            <div className="tp-section">
              <h2>Отзывы ({tutor.reviews})</h2>
              {tutor.reviewsList.map((r, i) => (
                <div key={i} className="tp-review">
                  <div className="tp-review-header">
                    <span className="tp-review-name">{r.name}</span>
                    <span className="tp-review-date">{r.date}</span>
                  </div>
                  <div className="tp-review-stars">{'⭐'.repeat(r.rating)}</div>
                  <div className="tp-review-text">{r.text}</div>
                </div>
              ))}
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
              <span className="tp-stat-value">⭐ {tutor.rating}</span>
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
      </div>
    </>
  )
}

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
        .tp-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .tp-container { max-width:700px; margin:0 auto; padding:24px 20px; }
        .tp-back { display:inline-flex; align-items:center; gap:6px; color:#2D5A45; text-decoration:none; font-weight:600; font-size:14px; margin-bottom:20px; }
        .tp-card { background:white; border-radius:24px; overflow:hidden; border:1px solid #eee; }
        .tp-img { position:relative; height:280px; overflow:hidden; background:linear-gradient(135deg,#E8E4DE,#D4CFC7); }
        .tp-img img { width:100%; height:100%; object-fit:cover; display:block; }
        .tp-badge { position:absolute; top:16px; left:16px; padding:6px 14px; background:#2D5A45; color:white; font-size:12px; font-weight:700; border-radius:999px; }
        .tp-rating { position:absolute; top:16px; right:16px; padding:6px 14px; background:rgba(255,255,255,0.95); color:#1A1A1A; font-size:13px; font-weight:700; border-radius:999px; }
        .tp-body { padding:28px; }
        .tp-name { font-size:24px; font-weight:800; margin-bottom:6px; }
        .tp-meta { font-size:13px; color:#999; margin-bottom:18px; }
        .tp-bio { font-size:15px; color:#444; line-height:1.7; margin-bottom:20px; }
        .tp-tags { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px; }
        .tp-tag { padding:5px 14px; background:#F0EDE8; color:#2D5A45; border-radius:999px; font-size:13px; font-weight:500; }
        .tp-footer { display:flex; align-items:center; justify-content:space-between; padding-top:20px; border-top:1px solid #f0f0f0; }
        .tp-price { font-size:26px; font-weight:800; }
        .tp-price span { font-size:14px; color:#999; font-weight:400; }
        .tp-btn { padding:14px 28px; background:#C4705A; color:white; border:none; border-radius:14px; font-size:15px; font-weight:700; cursor:pointer; }
        .tp-btn:hover { background:#b35d48; }
      `}} />

      <div className="tp-page">
        <div className="tp-container">
          <Link href="/find-tutor" className="tp-back">← Назад к поиску</Link>

          <div className="tp-card">
            <div className="tp-img">
              <img src={tutor.photo} alt={tutor.name} />
              <span className="tp-badge">{tutor.badge}</span>
              <span className="tp-rating">⭐ {tutor.rating}</span>
            </div>
            <div className="tp-body">
              <div className="tp-name">{tutor.name}</div>
              <div className="tp-meta">{tutor.city} • {tutor.experience} лет опыта • {tutor.reviews} отзывов</div>
              <div className="tp-bio">{tutor.bio}</div>
              <div className="tp-tags">
                {tutor.subjects.map(s => <span key={s} className="tp-tag">{s}</span>)}
              </div>
              <div className="tp-footer">
                <span className="tp-price">{tutor.price} <span>₽/час</span></span>
                <button className="tp-btn">Записаться</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

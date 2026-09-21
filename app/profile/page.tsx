'use client'

import { useState, useEffect } from 'react'
import { TUTORS } from '../data/tutors'
import { CURRENT_TUTOR_ID } from '../data/currentUser'
import { getTutorOverride, setTutorOverride } from '../data/tutorOverrides'
import { SUBJECTS_LIST } from '../data/subjects'

export default function ProfilePage() {
  const baseTutor = TUTORS.find(t => t.id === CURRENT_TUTOR_ID)
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [experience, setExperience] = useState('')
  const [price, setPrice] = useState('')
  const [about, setAbout] = useState('')
  const [subjects, setSubjects] = useState<string[]>([])
  const [education, setEducation] = useState<string[]>([''])
  const [achievements, setAchievements] = useState<string[]>([''])
  const [photo, setPhoto] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!baseTutor) return
    const override = getTutorOverride(baseTutor.id)
    setName(override.name || baseTutor.name)
    setCity(override.city || baseTutor.city)
    setExperience(String(override.experience ?? baseTutor.experience))
    setPrice(String(override.price ?? baseTutor.price))
    setAbout(override.about || baseTutor.about)
    setSubjects(override.subjects || baseTutor.subjects)
    setEducation(override.education && override.education.length > 0 ? override.education : baseTutor.education)
    setAchievements(override.achievements && override.achievements.length > 0 ? override.achievements : baseTutor.achievements)
    setPhoto(override.photo || baseTutor.photo)
    setMounted(true)
  }, [])

  if (!mounted || !baseTutor) return null

  const toggleSubject = (s: string) => {
    setSubjects(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const updateListItem = (list: string[], setList: (v: string[]) => void, idx: number, value: string) => {
    const copy = [...list]
    copy[idx] = value
    setList(copy)
  }
  const addListItem = (list: string[], setList: (v: string[]) => void) => setList([...list, ''])
  const removeListItem = (list: string[], setList: (v: string[]) => void, idx: number) => setList(list.filter((_, i) => i !== idx))

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(URL.createObjectURL(file))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setTutorOverride(baseTutor.id, {
      name: name.trim(),
      city: city.trim(),
      experience: Number(experience) || baseTutor.experience,
      price: Number(price) || baseTutor.price,
      about: about.trim(),
      subjects: subjects.length > 0 ? subjects : baseTutor.subjects,
      education: education.filter(e => e.trim() !== ''),
      achievements: achievements.filter(a => a.trim() !== ''),
      photo
    })
    setToast('Анкета обновлена — изменения уже видны ученикам')
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .pf-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .pf-container { max-width:640px; margin:0 auto; padding:24px 20px; }
        .pf-title { font-size:28px; font-weight:800; margin-bottom:6px; color:#1A1A1A; }
        .pf-subtitle { font-size:14px; color:#888; margin-bottom:24px; }
        .pf-form { background:white; border-radius:20px; padding:24px; border:1px solid #eee; display:flex; flex-direction:column; gap:20px; }
        .pf-field label { display:block; font-size:13px; font-weight:700; color:#444; margin-bottom:8px; }
        .pf-field input, .pf-field textarea { width:100%; box-sizing:border-box; padding:12px 14px; border-radius:12px; border:1px solid #ddd; font-size:16px; outline:none; font-family:inherit; }
        .pf-field input:focus, .pf-field textarea:focus { border-color:#2D5A45; }
        .pf-field textarea { resize:vertical; min-height:90px; }
        .pf-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

        .pf-avatar-row { display:flex; align-items:center; gap:16px; }
        .pf-avatar { width:80px; height:80px; border-radius:50%; overflow:hidden; background:#eee; flex-shrink:0; }
        .pf-avatar img { width:100%; height:100%; object-fit:cover; object-position:center 22%; }
        .pf-photo-btn { padding:10px 18px; background:#F0EDE8; color:#2D5A45; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; display:inline-block; }

        .pf-chips { display:flex; flex-wrap:wrap; gap:8px; }
        .pf-chip { padding:8px 14px; border-radius:999px; border:1px solid #ddd; background:white; font-size:13px; font-weight:600; cursor:pointer; color:#555; }
        .pf-chip.active { background:#2D5A45; color:white; border-color:#2D5A45; }

        .pf-list-item { display:flex; gap:8px; margin-bottom:8px; }
        .pf-list-item input { flex:1; }
        .pf-list-remove { width:38px; height:38px; border-radius:10px; border:none; background:#F5E6E2; color:#C4705A; font-size:16px; cursor:pointer; flex-shrink:0; }
        .pf-list-add { padding:8px 16px; background:#F0EDE8; color:#2D5A45; border:none; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; align-self:flex-start; }

        .pf-submit { padding:16px; background:#C4705A; color:white; border:none; border-radius:14px; font-size:16px; font-weight:700; cursor:pointer; }
        .pf-submit:hover { background:#b35d48; }

        .pf-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#1A1A1A; color:white; padding:14px 22px; border-radius:14px; font-size:14px; font-weight:600; box-shadow:0 6px 20px rgba(0,0,0,0.25); z-index:200; max-width:90%; text-align:center; }
      `}} />
      <div className="pf-page">
        <div className="pf-container">
          <h1 className="pf-title">Моя анкета</h1>
          <p className="pf-subtitle">Изменения сразу видны ученикам на вашей публичной странице</p>

          <form className="pf-form" onSubmit={handleSave}>
            <div className="pf-avatar-row">
              <div className="pf-avatar"><img src={photo} alt="" /></div>
              <label className="pf-photo-btn">
                Изменить фото
                <input type="file" accept="image/*" onChange={handlePhotoSelect} style={{ display: 'none' }} />
              </label>
            </div>

            <div className="pf-field">
              <label>Имя</label>
              <input value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <div className="pf-row">
              <div className="pf-field">
                <label>Город</label>
                <input value={city} onChange={e => setCity(e.target.value)} required />
              </div>
              <div className="pf-field">
                <label>Опыт, лет</label>
                <input type="number" min="0" value={experience} onChange={e => setExperience(e.target.value)} required />
              </div>
            </div>

            <div className="pf-field">
              <label>Цена за занятие, ₽</label>
              <input type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} required />
            </div>

            <div className="pf-field">
              <label>О себе</label>
              <textarea value={about} onChange={e => setAbout(e.target.value)} required />
            </div>

            <div className="pf-field">
              <label>Предметы</label>
              <div className="pf-chips">
                {SUBJECTS_LIST.map(s => (
                  <button type="button" key={s} className={`pf-chip ${subjects.includes(s) ? 'active' : ''}`} onClick={() => toggleSubject(s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className="pf-field">
              <label>Образование</label>
              {education.map((line, i) => (
                <div key={i} className="pf-list-item">
                  <input value={line} onChange={e => updateListItem(education, setEducation, i, e.target.value)} placeholder="Например: МГУ, факультет ВМК, 2019" />
                  <button type="button" className="pf-list-remove" onClick={() => removeListItem(education, setEducation, i)}>✕</button>
                </div>
              ))}
              <button type="button" className="pf-list-add" onClick={() => addListItem(education, setEducation)}>+ Добавить строку</button>
            </div>

            <div className="pf-field">
              <label>Достижения</label>
              {achievements.map((line, i) => (
                <div key={i} className="pf-list-item">
                  <input value={line} onChange={e => updateListItem(achievements, setAchievements, i, e.target.value)} placeholder="Например: 80+ учеников подготовлено к ЕГЭ" />
                  <button type="button" className="pf-list-remove" onClick={() => removeListItem(achievements, setAchievements, i)}>✕</button>
                </div>
              ))}
              <button type="button" className="pf-list-add" onClick={() => addListItem(achievements, setAchievements)}>+ Добавить строку</button>
            </div>

            <button type="submit" className="pf-submit">Сохранить изменения</button>
          </form>
        </div>
      </div>

      {toast && <div className="pf-toast">{toast}</div>}
    </>
  )
}

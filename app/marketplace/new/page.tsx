'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TUTORS } from '../../data/tutors'
import { CURRENT_TUTOR_ID } from '../../data/currentUser'

const CATEGORIES = [
  'Английский', 'Астрономия', 'Биология', 'Дошкольники', 'Информатика',
  'Испанский', 'История', 'Итальянский', 'Китайский', 'Литература',
  'Логопед', 'Математика', 'Музыка', 'Начальная школа', 'Немецкий',
  'Обществознание', 'Русский как иностранный', 'Русский язык', 'Физика',
  'Французский', 'Химия', 'Экономика'
]

const GRADE_OPTIONS = ['Дошкольное образование', '1-4 классы', '5-7 классов', '8-9 классов', '10-11 классы', 'ЕГЭ', 'ОГЭ', 'Взрослые']

const MAX_PHOTOS = 30
const MAX_FILES = 10

interface PhotoItem { file: File; url: string }

export default function NewProductPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [grades, setGrades] = useState<string[]>([])
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [files, setFiles] = useState<File[]>([])

  const toggleGrade = (g: string) => {
    setGrades(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])
  }

  const handlePhotosSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    const room = MAX_PHOTOS - photos.length
    const toAdd = selected.slice(0, room).map(file => ({ file, url: URL.createObjectURL(file) }))
    setPhotos(prev => [...prev, ...toAdd])
    e.target.value = ''
  }

  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    const room = MAX_FILES - files.length
    setFiles(prev => [...prev, ...selected.slice(0, room)])
    e.target.value = ''
  }

  const removePhoto = (idx: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx))
  }
  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !price || grades.length === 0) return

    const tutor = TUTORS.find(t => t.id === CURRENT_TUTOR_ID)
    const mainFile = files[0]
    const newProduct = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      price: Number(price),
      sales: 0,
      authorId: CURRENT_TUTOR_ID,
      authorName: tutor?.name || 'Вы',
      category,
      grades,
      previewText: previewText.trim() || 'Превью пока не добавлено.',
      description: description.trim(),
      fileName: mainFile?.name || 'material.pdf',
      fileType: (mainFile?.name.split('.').pop() || 'pdf').toUpperCase(),
      photos: photos.map(p => p.url),
      attachments: files.map(f => f.name)
    }

    const saved = localStorage.getItem('tc_custom_products')
    const list = saved ? JSON.parse(saved) : []
    list.unshift(newProduct)
    localStorage.setItem('tc_custom_products', JSON.stringify(list))

    router.push('/marketplace')
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .np-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .np-container { max-width:640px; margin:0 auto; padding:24px 20px; }
        .np-title { font-size:26px; font-weight:800; margin-bottom:6px; color:#1A1A1A; }
        .np-subtitle { font-size:14px; color:#888; margin-bottom:24px; }
        .np-form { background:white; border-radius:20px; padding:24px; border:1px solid #eee; display:flex; flex-direction:column; gap:20px; }
        .np-field label { display:block; font-size:13px; font-weight:700; color:#444; margin-bottom:8px; }
        .np-field input, .np-field select, .np-field textarea { width:100%; padding:12px 14px; border-radius:12px; border:1px solid #ddd; font-size:14px; outline:none; font-family:inherit; }
        .np-field input:focus, .np-field select:focus, .np-field textarea:focus { border-color:#2D5A45; }
        .np-field textarea { resize:vertical; min-height:80px; }
        .np-hint { font-size:12px; color:#999; margin-top:6px; }
        .np-grades { display:flex; flex-wrap:wrap; gap:8px; }
        .np-grade-chip { padding:8px 14px; border-radius:999px; border:1px solid #ddd; background:white; font-size:13px; font-weight:600; cursor:pointer; color:#555; }
        .np-grade-chip.active { background:#2D5A45; color:white; border-color:#2D5A45; }
        .np-submit { padding:16px; background:#C4705A; color:white; border:none; border-radius:14px; font-size:16px; font-weight:700; cursor:pointer; }
        .np-submit:hover { background:#b35d48; }
        .np-back { display:inline-flex; align-items:center; gap:6px; color:#2D5A45; text-decoration:none; font-weight:600; font-size:14px; margin-bottom:16px; }

        .np-upload-row { display:flex; align-items:center; justify-content:space-between; padding:14px; border:1px dashed #ddd; border-radius:12px; cursor:pointer; }
        .np-upload-row:hover { border-color:#2D5A45; }
        .np-upload-left { display:flex; align-items:center; gap:10px; }
        .np-clip-icon { width:36px; height:36px; background:#F0EDE8; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .np-clip-icon svg { width:18px; height:18px; color:#2D5A45; }
        .np-upload-text { font-size:14px; font-weight:600; color:#2D5A45; }
        .np-upload-count { font-size:12px; color:#999; }

        .np-photo-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(72px, 1fr)); gap:8px; margin-top:12px; }
        .np-photo-thumb { position:relative; width:100%; aspect-ratio:1; border-radius:10px; overflow:hidden; background:#eee; }
        .np-photo-thumb img { width:100%; height:100%; object-fit:cover; display:block; }
        .np-photo-remove { position:absolute; top:3px; right:3px; width:20px; height:20px; border-radius:50%; background:rgba(0,0,0,0.6); color:white; border:none; font-size:11px; cursor:pointer; display:flex; align-items:center; justify-content:center; }

        .np-file-list { display:flex; flex-direction:column; gap:8px; margin-top:12px; }
        .np-file-chip { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; background:#FAF8F4; border-radius:10px; font-size:13px; }
        .np-file-chip-name { display:flex; align-items:center; gap:8px; color:#444; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .np-file-remove { border:none; background:none; color:#C4705A; font-size:16px; cursor:pointer; flex-shrink:0; padding:0 4px; }
      `}} />
      <div className="np-page">
        <div className="np-container">
          <a href="/marketplace" className="np-back">← Назад в маркетплейс</a>
          <h1 className="np-title">Новый материал</h1>
          <p className="np-subtitle">Заполните карточку, чтобы выставить материал на продажу</p>

          <form className="np-form" onSubmit={handleSubmit}>
            <div className="np-field">
              <label>Название материала</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Например: 30 задач по геометрии" required />
            </div>

            <div className="np-field">
              <label>Предмет</label>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="np-field">
              <label>Классы / уровень</label>
              <div className="np-grades">
                {GRADE_OPTIONS.map(g => (
                  <button type="button" key={g} className={`np-grade-chip ${grades.includes(g) ? 'active' : ''}`} onClick={() => toggleGrade(g)}>
                    {g}
                  </button>
                ))}
              </div>
              {grades.length === 0 && <div className="np-hint">Выберите хотя бы один вариант</div>}
            </div>

            <div className="np-field">
              <label>Цена, ₽</label>
              <input type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} placeholder="499" required />
            </div>

            <div className="np-field">
              <label>Описание</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Расскажите, что внутри и чем материал полезен ученику" />
            </div>

            <div className="np-field">
              <label>Превью (короткий фрагмент, который увидят до покупки)</label>
              <textarea value={previewText} onChange={e => setPreviewText(e.target.value)} placeholder="Например, первая задача или оглавление" />
            </div>

            <div className="np-field">
              <label>Фотографии ({photos.length}/{MAX_PHOTOS})</label>
              <label className="np-upload-row" htmlFor="np-photos-input">
                <div className="np-upload-left">
                  <div className="np-clip-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.44 11.05l-9.19 9.19a5.5 5.5 0 0 1-7.78-7.78l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a1.5 1.5 0 0 1-2.12-2.12l8.49-8.48" />
                    </svg>
                  </div>
                  <span className="np-upload-text">Добавить фото</span>
                </div>
                <span className="np-upload-count">до {MAX_PHOTOS} шт.</span>
              </label>
              <input
                id="np-photos-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotosSelect}
                disabled={photos.length >= MAX_PHOTOS}
                style={{ display: 'none' }}
              />
              {photos.length > 0 && (
                <div className="np-photo-grid">
                  {photos.map((p, i) => (
                    <div key={i} className="np-photo-thumb">
                      <img src={p.url} alt="" />
                      <button type="button" className="np-photo-remove" onClick={() => removePhoto(i)}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="np-field">
              <label>Файлы материала ({files.length}/{MAX_FILES})</label>
              <label className="np-upload-row" htmlFor="np-files-input">
                <div className="np-upload-left">
                  <div className="np-clip-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.44 11.05l-9.19 9.19a5.5 5.5 0 0 1-7.78-7.78l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a1.5 1.5 0 0 1-2.12-2.12l8.49-8.48" />
                    </svg>
                  </div>
                  <span className="np-upload-text">Прикрепить файл</span>
                </div>
                <span className="np-upload-count">до {MAX_FILES} шт.</span>
              </label>
              <input
                id="np-files-input"
                type="file"
                multiple
                onChange={handleFilesSelect}
                disabled={files.length >= MAX_FILES}
                style={{ display: 'none' }}
              />
              {files.length > 0 && (
                <div className="np-file-list">
                  {files.map((f, i) => (
                    <div key={i} className="np-file-chip">
                      <span className="np-file-chip-name">📎 {f.name}</span>
                      <button type="button" className="np-file-remove" onClick={() => removeFile(i)}>✕</button>
                    </div>
                  ))}
                </div>
              )}
              <div className="np-hint">Загруженные файлы будут доступны покупателю после оплаты</div>
            </div>

            <button type="submit" className="np-submit">Опубликовать материал</button>
          </form>
        </div>
      </div>
    </>
  )
}

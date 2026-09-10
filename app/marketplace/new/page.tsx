'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TUTORS } from '../../data/tutors'
import { CURRENT_TUTOR_ID } from '../../data/currentUser'

const CATEGORIES = ['Математика', 'Английский', 'Физика', 'Русский язык', 'История', 'Информатика', 'Литература', 'Химия', 'Биология', 'Обществознание']
const GRADE_OPTIONS = ['1-4 классы', '5-7 классов', '8-9 классов', '10-11 классы', 'ЕГЭ', 'ОГЭ', 'Взрослые']

export default function NewProductPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [grades, setGrades] = useState<string[]>([])
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [fileName, setFileName] = useState('')

  const toggleGrade = (g: string) => {
    setGrades(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !price || grades.length === 0) return

    const tutor = TUTORS.find(t => t.id === CURRENT_TUTOR_ID)
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
      fileName: fileName.trim() || 'material.pdf',
      fileType: fileName.split('.').pop()?.toUpperCase() || 'PDF'
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
        .np-file-row { display:flex; align-items:center; gap:10px; padding:14px; border:1px dashed #ddd; border-radius:12px; }
        .np-file-icon { width:36px; height:36px; background:#F0EDE8; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
        .np-submit { padding:16px; background:#C4705A; color:white; border:none; border-radius:14px; font-size:16px; font-weight:700; cursor:pointer; }
        .np-submit:hover { background:#b35d48; }
        .np-back { display:inline-flex; align-items:center; gap:6px; color:#2D5A45; text-decoration:none; font-weight:600; font-size:14px; margin-bottom:16px; }
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
              <label>Файл материала</label>
              <div className="np-file-row">
                <div className="np-file-icon">📎</div>
                <input style={{ border: 'none', padding: 0 }} value={fileName} onChange={e => setFileName(e.target.value)} placeholder="my_material.pdf" />
              </div>
              <div className="np-hint">Загрузка файлов появится позже — пока укажите название файла вручную</div>
            </div>

            <button type="submit" className="np-submit">Опубликовать материал</button>
          </form>
        </div>
      </div>
    </>
  )
}

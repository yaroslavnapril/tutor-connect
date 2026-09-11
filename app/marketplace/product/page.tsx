'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PRODUCTS, Product } from '../../data/products'
import { CURRENT_TUTOR_ID } from '../../data/currentUser'

export default function ProductPage() {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [purchased, setPurchased] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const idParam = new URLSearchParams(window.location.search).get('id')
    if (!idParam) { setNotFound(true); return }

    const seedMatch = PRODUCTS.find(p => p.id === idParam)
    let found: Product | null = seedMatch || null

    if (!found) {
      const saved = localStorage.getItem('tc_custom_products')
      if (saved) {
        try {
          const list: Product[] = JSON.parse(saved)
          found = list.find(p => p.id === idParam) || null
        } catch {}
      }
    }

    if (!found) { setNotFound(true); return }
    setProduct(found)

    const hiddenSaved = localStorage.getItem('tc_hidden_products')
    const hiddenList: string[] = hiddenSaved ? JSON.parse(hiddenSaved) : []
    setIsHidden(hiddenList.includes(found.id))
  }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const toggleHidden = () => {
    if (!product) return
    const saved = localStorage.getItem('tc_hidden_products')
    const list: string[] = saved ? JSON.parse(saved) : []
    let updated: string[]
    if (list.includes(product.id)) {
      updated = list.filter(id => id !== product.id)
      showToast(`Ваш материал «${product.title}» добавлен в продажу`)
    } else {
      updated = [...list, product.id]
      showToast(`Ваш материал «${product.title}» скрыт из маркетплейса`)
    }
    localStorage.setItem('tc_hidden_products', JSON.stringify(updated))
    setIsHidden(!isHidden)
  }

  const deleteProduct = () => {
    if (!product) return
    const confirmed = window.confirm(`Удалить материал «${product.title}» навсегда? Это действие нельзя отменить.`)
    if (!confirmed) return

    if (product.id.startsWith('custom-')) {
      const saved = localStorage.getItem('tc_custom_products')
      const list: Product[] = saved ? JSON.parse(saved) : []
      const updated = list.filter(p => p.id !== product.id)
      localStorage.setItem('tc_custom_products', JSON.stringify(updated))
    } else {
      const saved = localStorage.getItem('tc_deleted_products')
      const list: string[] = saved ? JSON.parse(saved) : []
      localStorage.setItem('tc_deleted_products', JSON.stringify([...list, product.id]))
    }

    router.push('/marketplace')
  }

  if (notFound) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
        Материал не найден. <Link href="/marketplace" style={{ color: '#2D5A45' }}>Вернуться в маркетплейс</Link>
      </div>
    )
  }
  if (!product) return null

  const isMine = product.authorId === CURRENT_TUTOR_ID

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .pp-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .pp-container { max-width:700px; margin:0 auto; padding:24px 20px; }
        .pp-back { display:inline-flex; align-items:center; gap:6px; color:#2D5A45; text-decoration:none; font-weight:600; font-size:14px; margin-bottom:20px; }
        .pp-card { background:white; border-radius:24px; padding:28px; border:1px solid #eee; }
        .pp-icon { width:64px; height:64px; background:#F0EDE8; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:28px; margin-bottom:16px; }
        .pp-cat { display:inline-block; padding:4px 12px; background:#F0EDE8; color:#2D5A45; border-radius:999px; font-size:12px; font-weight:700; margin-right:6px; margin-bottom:12px; }
        .pp-hidden-tag { display:inline-block; padding:4px 12px; background:#F5E6E2; color:#C4705A; border-radius:999px; font-size:12px; font-weight:700; margin-bottom:12px; }
        .pp-title { font-size:24px; font-weight:800; margin-bottom:8px; }
        .pp-author { font-size:14px; color:#999; margin-bottom:20px; }
        .pp-preview { background:#FAF8F4; border:1px dashed #ddd; border-radius:14px; padding:16px; margin-bottom:20px; }
        .pp-preview-label { font-size:12px; font-weight:700; color:#C4705A; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px; }
        .pp-preview-text { font-size:13px; color:#666; line-height:1.6; white-space:pre-line; }
        .pp-desc-label { font-size:16px; font-weight:700; margin-bottom:8px; }
        .pp-desc { font-size:15px; color:#444; line-height:1.7; margin-bottom:24px; }
        .pp-meta { display:flex; gap:20px; flex-wrap:wrap; margin-bottom:24px; padding:16px 0; border-top:1px solid #f0f0f0; border-bottom:1px solid #f0f0f0; }
        .pp-meta-item { font-size:13px; color:#888; }
        .pp-meta-item b { display:block; font-size:15px; color:#1A1A1A; margin-top:2px; }
        .pp-footer { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .pp-price { font-size:28px; font-weight:800; }
        .pp-btn { padding:14px 28px; background:#C4705A; color:white; border:none; border-radius:14px; font-size:15px; font-weight:700; cursor:pointer; }
        .pp-btn:hover { background:#b35d48; }
        .pp-btn:disabled { background:#8fae9c; cursor:default; }

        .pp-owner-actions { margin-top:24px; display:flex; flex-direction:column; gap:10px; }
        .pp-toggle-btn { width:100%; padding:14px; border-radius:14px; font-size:15px; font-weight:700; cursor:pointer; border:2px solid #2D5A45; background:white; color:#2D5A45; }
        .pp-toggle-btn.is-hidden { border-color:#C4705A; color:#C4705A; }
        .pp-delete-btn { width:100%; padding:14px; border-radius:14px; font-size:15px; font-weight:700; cursor:pointer; border:none; background:#F5E6E2; color:#C4705A; }
        .pp-delete-btn:hover { background:#f0d8d2; }

        .pp-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#1A1A1A; color:white; padding:14px 22px; border-radius:14px; font-size:14px; font-weight:600; box-shadow:0 6px 20px rgba(0,0,0,0.25); z-index:200; max-width:90%; text-align:center; }
      `}} />
      <div className="pp-page">
        <div className="pp-container">
          <Link href="/marketplace" className="pp-back">← Назад в маркетплейс</Link>
          <div className="pp-card">
            <div className="pp-icon">📄</div>
            <div>
              {isHidden && isMine && <div className="pp-hidden-tag">Скрыто из продажи</div>}
              <span className="pp-cat">{product.category}</span>
              {product.grades?.map(g => <span key={g} className="pp-cat">{g}</span>)}
            </div>
            <div className="pp-title">{product.title}</div>
            <div className="pp-author">
              Автор: <Link href={`/tutors/${product.authorId}`} style={{ color: '#2D5A45', fontWeight: 600 }}>{product.authorName}</Link>
            </div>

            <div className="pp-preview">
              <div className="pp-preview-label">Превью</div>
              <div className="pp-preview-text">{product.previewText}</div>
            </div>

            <div className="pp-desc-label">Описание</div>
            <div className="pp-desc">{product.description}</div>

            <div className="pp-meta">
              <div className="pp-meta-item">Продано<b>{product.sales}</b></div>
              <div className="pp-meta-item">Файл<b>{product.fileName}</b></div>
              <div className="pp-meta-item">Формат<b>{product.fileType}</b></div>
            </div>

            <div className="pp-footer">
              <span className="pp-price">{product.price} ₽</span>
              {!isMine && (
                <button className="pp-btn" onClick={() => setPurchased(true)} disabled={purchased}>
                  {purchased ? 'Куплено ✓' : 'Купить'}
                </button>
              )}
            </div>

            {isMine && (
              <div className="pp-owner-actions">
                <button className={`pp-toggle-btn ${isHidden ? 'is-hidden' : ''}`} onClick={toggleHidden}>
                  {isHidden ? 'Возобновить продажу' : 'Убрать из продажи'}
                </button>
                <button className="pp-delete-btn" onClick={deleteProduct}>Удалить материал</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <div className="pp-toast">{toast}</div>}
    </>
  )
}

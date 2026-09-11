'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { PRODUCTS, Product } from '../data/products'
import { CURRENT_TUTOR_ID } from '../data/currentUser'

export default function MarketplacePage() {
  const [role, setRole] = useState<'student' | 'tutor'>('student')
  const [customProducts, setCustomProducts] = useState<Product[]>([])
  const [hiddenIds, setHiddenIds] = useState<string[]>([])
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  const loadState = () => {
    const savedCustom = localStorage.getItem('tc_custom_products')
    setCustomProducts(savedCustom ? JSON.parse(savedCustom) : [])
    const savedHidden = localStorage.getItem('tc_hidden_products')
    setHiddenIds(savedHidden ? JSON.parse(savedHidden) : [])
    const savedDeleted = localStorage.getItem('tc_deleted_products')
    setDeletedIds(savedDeleted ? JSON.parse(savedDeleted) : [])
  }

  useEffect(() => {
    setMounted(true)
    const savedRole = localStorage.getItem('tc_role')
    if (savedRole === 'student' || savedRole === 'tutor') setRole(savedRole)
    loadState()

    const handleRoleChange = () => {
      const current = localStorage.getItem('tc_role')
      if (current === 'student' || current === 'tutor') setRole(current)
    }
    const handleFocus = () => loadState()
    window.addEventListener('tc-role-change', handleRoleChange)
    window.addEventListener('focus', handleFocus)
    return () => {
      window.removeEventListener('tc-role-change', handleRoleChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  if (!mounted) return null

  const allProducts = [...customProducts, ...PRODUCTS].filter(p => !deletedIds.includes(p.id))
  const myProducts = allProducts.filter(p => p.authorId === CURRENT_TUTOR_ID)
  const publicProducts = allProducts.filter(p => !hiddenIds.includes(p.id))

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .mp-page { background:#F5F3EF; min-height:100vh; padding-bottom:48px; }
        .mp-container { max-width:1100px; margin:0 auto; padding:24px 20px; }
        .mp-header-row { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom:6px; flex-wrap:wrap; }
        .mp-title { font-size:28px; font-weight:800; color:#1A1A1A; }
        .mp-subtitle { font-size:15px; color:#888; margin-bottom:24px; }
        .mp-add-btn { padding:12px 22px; background:#C4705A; color:white; border:none; border-radius:14px; font-size:14px; font-weight:700; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:6px; white-space:nowrap; }
        .mp-add-btn:hover { background:#b35d48; }
        .mp-section-title { font-size:19px; font-weight:700; margin:32px 0 16px; color:#1A1A1A; }
        .mp-section-title:first-of-type { margin-top:0; }
        .mp-grid { display:grid; grid-template-columns:1fr; gap:16px; }
        .mp-card { background:white; border-radius:16px; padding:20px; border:1px solid #eee; text-decoration:none; color:inherit; display:block; transition:0.2s; position:relative; }
        .mp-card:hover { box-shadow:0 4px 12px rgba(0,0,0,0.08); }
        .mp-card.hidden-card { opacity:0.6; }
        .mp-icon { width:40px; height:40px; background:#F0EDE8; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; margin-bottom:12px; }
        .mp-cat { display:inline-block; padding:3px 10px; background:#F0EDE8; color:#2D5A45; border-radius:999px; font-size:11px; font-weight:700; margin-bottom:8px; margin-right:6px; }
        .mp-hidden-badge { display:inline-block; padding:3px 10px; background:#F5E6E2; color:#C4705A; border-radius:999px; font-size:11px; font-weight:700; margin-bottom:8px; }
        .mp-card h4 { font-size:15px; font-weight:700; margin-bottom:4px; line-height:1.4; }
        .mp-author { font-size:12px; color:#999; margin-bottom:12px; }
        .mp-footer { display:flex; justify-content:space-between; align-items:center; }
        .mp-price { font-size:18px; font-weight:800; color:#C4705A; }
        .mp-sales { font-size:12px; color:#999; }
        .mp-empty { padding:24px; text-align:center; color:#999; font-size:14px; background:white; border-radius:16px; border:1px dashed #ddd; }
        @media(min-width:640px){ .mp-grid { grid-template-columns:repeat(2, minmax(0,1fr)); } }
        @media(min-width:1024px){ .mp-grid { grid-template-columns:repeat(3, minmax(0,1fr)); } }
      `}} />
      <div className="mp-page">
        <div className="mp-container">
          <div className="mp-header-row">
            <div>
              <h1 className="mp-title">Маркетплейс</h1>
            </div>
            {role === 'tutor' && (
              <Link href="/marketplace/new" className="mp-add-btn">+ Добавить материал</Link>
            )}
          </div>
          <p className="mp-subtitle">
            {role === 'tutor' ? 'Выкладывайте свои материалы и зарабатывайте на них' : 'Готовые материалы от лучших репетиторов'}
          </p>

          {role === 'tutor' && (
            <>
              <h2 className="mp-section-title">Мои материалы</h2>
              {myProducts.length === 0 ? (
                <div className="mp-empty">У вас пока нет выложенных материалов</div>
              ) : (
                <div className="mp-grid">
                  {myProducts.map(p => {
                    const isHidden = hiddenIds.includes(p.id)
                    return (
                      <Link key={p.id} href={`/marketplace/product?id=${p.id}`} className={`mp-card ${isHidden ? 'hidden-card' : ''}`}>
                        <div className="mp-icon">📄</div>
                        {isHidden ? (
                          <div className="mp-hidden-badge">Скрыто из продажи</div>
                        ) : (
                          <span className="mp-cat">{p.category}</span>
                        )}
                        <h4>{p.title}</h4>
                        <div className="mp-author">Ваш материал</div>
                        <div className="mp-footer">
                          <span className="mp-price">{p.price} ₽</span>
                          <span className="mp-sales">{p.sales} продаж</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
              <h2 className="mp-section-title">Все материалы на платформе</h2>
            </>
          )}

          <div className="mp-grid">
            {publicProducts.map(p => (
              <Link key={p.id} href={`/marketplace/product?id=${p.id}`} className="mp-card">
                <div className="mp-icon">📄</div>
                <span className="mp-cat">{p.category}</span>
                <h4>{p.title}</h4>
                <div className="mp-author">Автор: {p.authorName}</div>
                <div className="mp-footer">
                  <span className="mp-price">{p.price} ₽</span>
                  <span className="mp-sales">{p.sales} продаж</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

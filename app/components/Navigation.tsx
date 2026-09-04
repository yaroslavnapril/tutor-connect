'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<'student' | 'tutor'>('student');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('tc_role');
    if (saved === 'student' || saved === 'tutor') setRole(saved);
  }, []);

  const toggleMenu = () => setMenuOpen(p => !p);

  if (!mounted) {
    return (
      <header className="bg-[#2d5f3f] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <span className="text-white text-xl font-bold">Tutor Connect</span>
        <div className="w-20 h-9" />
      </header>
    );
  }

  return (
    <>
      <header className="bg-[#2d5f3f] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="text-white text-xl font-bold">Tutor Connect</Link>
        <div className="flex items-center gap-2.5">
          <div className="flex bg-white/20 rounded-full p-[3px]">
            <span className="px-3 py-1 rounded-full text-[13px] font-semibold bg-white text-[#2d5f3f]">RU</span>
            <span className="px-3 py-1 rounded-full text-[13px] font-semibold text-white/70">EN</span>
          </div>
          <button onClick={toggleMenu} className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] bg-white/15 rounded-[10px]">
            <span className={`block w-[18px] h-[2.5px] bg-white rounded-sm transition-all ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-[18px] h-[2.5px] bg-white rounded-sm transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-[18px] h-[2.5px] bg-white rounded-sm transition-all ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </header>

      <div onClick={toggleMenu} className={`fixed inset-0 bg-black/40 z-[200] transition-opacity md:hidden ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />

      <nav className={`fixed top-0 right-0 w-[85%] max-w-[360px] h-full bg-[#1a1a1a] z-[201] overflow-y-auto transition-transform md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-white/[0.08]">
          <div className="text-white text-xl font-bold mb-4">Меню</div>
          <div className="flex bg-white/10 rounded-xl p-1 gap-1">
            <button onClick={() => { setRole('student'); localStorage.setItem('tc_role', 'student'); }} className={`flex-1 py-2.5 rounded-[10px] text-sm font-semibold transition-all ${role === 'student' ? 'bg-[#2d5f3f] text-white' : 'text-white/50'}`}>Я ученик</button>
            <button onClick={() => { setRole('tutor'); localStorage.setItem('tc_role', 'tutor'); }} className={`flex-1 py-2.5 rounded-[10px] text-sm font-semibold transition-all ${role === 'tutor' ? 'bg-[#2d5f3f] text-white' : 'text-white/50'}`}>Я репетитор</button>
          </div>
        </div>

        {role === 'student' ? (
          <div className="p-5">
            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3">Учёба</h4>
            <Link href="/find-tutor" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85"><span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">🔍</span>Найти репетитора</Link>
            <Link href="/lessons" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85"><span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">📅</span>Мои занятия</Link>
            <Link href="/marketplace" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85"><span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">📚</span>Маркетплейс</Link>
            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3 mt-5">Финансы</h4>
            <Link href="/payment" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85"><span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">💳</span>Оплата</Link>
            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3 mt-5">Аккаунт</h4>
            <Link href="/settings" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85"><span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">⚙️</span>Настройки</Link>
          </div>
        ) : (
          <div className="p-5">
            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3">Работа</h4>
            <Link href="/requests" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85"><span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">🔔</span>Заявки<span className="ml-auto bg-[#c67b5c] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">3</span></Link>
            <Link href="/schedule" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85"><span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">📅</span>Расписание</Link>
            <Link href="/students" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85"><span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">👥</span>Ученики</Link>
            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3 mt-5">Материалы</h4>
            <Link href="/my-materials" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85"><span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">📁</span>Мои материалы</Link>
            <Link href="/marketplace" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85"><span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">🛒</span>Маркетплейс</Link>
            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3 mt-5">Финансы</h4>
            <Link href="/payments" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85"><span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">💳</span>Оплаты</Link>
            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3 mt-5">Аккаунт</h4>
            <Link href="/profile" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85"><span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">📝</span>Моя анкета</Link>
            <Link href="/settings" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85"><span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">⚙️</span>Настройки</Link>
          </div>
        )}
      </nav>
    </>
  );
}

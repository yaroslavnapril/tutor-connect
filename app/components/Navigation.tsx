'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<'student' | 'tutor'>('student');
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedRole = localStorage.getItem('tc_role');
    const savedLang = localStorage.getItem('tc_lang');
    if (savedRole === 'student' || savedRole === 'tutor') setRole(savedRole);
    if (savedLang === 'ru' || savedLang === 'en') setLang(savedLang);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const changeRole = (newRole: 'student' | 'tutor') => {
    setRole(newRole);
    localStorage.setItem('tc_role', newRole);
    window.dispatchEvent(new Event('tc-role-change'));
  };

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
      {/* ШАПКА */}
      <header className="bg-[#2d5f3f] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="text-white text-xl font-bold">Tutor Connect</Link>
        <div className="flex items-center gap-2.5">
          {/* Переключатель языков */}
          <div className="flex bg-white/20 rounded-full p-[3px]">
            <button
              onClick={() => { setLang('ru'); localStorage.setItem('tc_lang', 'ru'); window.location.reload(); }}
              className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-all ${lang === 'ru' ? 'bg-white text-[#2d5f3f]' : 'text-white/70 hover:text-white'}`}
            >RU</button>
            <button
              onClick={() => { setLang('en'); localStorage.setItem('tc_lang', 'en'); window.location.reload(); }}
              className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-all ${lang === 'en' ? 'bg-white text-[#2d5f3f]' : 'text-white/70 hover:text-white'}`}
            >EN</button>
          </div>

          {/* Бургер */}
          <button
            onClick={toggleMenu}
            aria-label="Меню"
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] bg-white/15 rounded-[10px]"
          >
            <span className={`block w-[18px] h-[2.5px] bg-white rounded-sm transition-all ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-[18px] h-[2.5px] bg-white rounded-sm transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-[18px] h-[2.5px] bg-white rounded-sm transition-all ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Затемнение */}
      <div
        onClick={toggleMenu}
        className={`fixed inset-0 bg-black/40 z-[200] transition-opacity md:hidden ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Меню */}
      <nav className={`fixed top-0 right-0 w-[85%] max-w-[360px] h-full bg-[#1a1a1a] z-[201] overflow-y-auto transition-transform md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-white/[0.08] sticky top-0 bg-[#1a1a1a] z-10">
          <div className="text-white text-xl font-bold mb-4">Меню</div>
          <div className="flex bg-white/10 rounded-xl p-1 gap-1">
            <button
              onClick={() => changeRole('student')}
              className={`flex-1 py-2.5 rounded-[10px] text-sm font-semibold transition-all ${role === 'student' ? 'bg-[#2d5f3f] text-white' : 'text-white/50'}`}
            >Я ученик</button>
            <button
              onClick={() => changeRole('tutor')}
              className={`flex-1 py-2.5 rounded-[10px] text-sm font-semibold transition-all ${role === 'tutor' ? 'bg-[#2d5f3f] text-white' : 'text-white/50'}`}
            >Я репетитор</button>
          </div>
        </div>

        {role === 'student' ? (
          <div className="p-5">
            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3">Учёба</h4>
            <Link href="/find-tutor" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors">
              <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">🔍</span>Найти репетитора
            </Link>
            <Link href="/lessons" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors">
              <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">📅</span>Мои занятия
            </Link>
            <Link href="/marketplace" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors">
              <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">📚</span>Маркетплейс
            </Link>

            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3 mt-5">Финансы</h4>
            <Link href="/payment" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors">
              <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">💳</span>Оплата
            </Link>

            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3 mt-5">Аккаунт</h4>
            <Link href="/settings" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors">
              <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">⚙️</span>Настройки
            </Link>
          </div>
        ) : (
          <div className="p-5">
            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3">Работа</h4>
            <Link href="/requests" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors">
              <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">🔔</span>Заявки<span className="ml-auto bg-[#c67b5c] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">3</span>
            </Link>
            <Link href="/schedule" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors">
              <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">📅</span>Расписание
            </Link>
            <Link href="/students" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors">
              <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">👥</span>Ученики
            </Link>

            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3 mt-5">Материалы</h4>
            <Link href="/my-materials" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors">
              <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">📁</span>Мои материалы
            </Link>
            <Link href="/marketplace" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors">
              <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">🛒</span>Маркетплейс
            </Link>

            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3 mt-5">Финансы</h4>
            <Link href="/payments" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors">
              <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">💳</span>Оплаты
            </Link>

            <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3 mt-5">Аккаунт</h4>
            <Link href="/profile" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors">
              <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">📝</span>Моя анкета
            </Link>
            <Link href="/settings" onClick={toggleMenu} className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors">
              <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">⚙️</span>Настройки
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Role = 'student' | 'tutor';
type Lang = 'ru' | 'en';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<Role>('student');
  const [lang, setLang] = useState<Lang>('ru');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedRole = localStorage.getItem('tc_role') as Role | null;
    const savedLang = localStorage.getItem('tc_lang') as Lang | null;
    if (savedRole) setRole(savedRole);
    if (savedLang) setLang(savedLang);
  }, []);

  const handleSetRole = (newRole: Role) => {
    setRole(newRole);
    localStorage.setItem('tc_role', newRole);
  };

  const handleSetLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('tc_lang', newLang);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Переводы
  const t = {
    ru: {
      menu: 'Меню',
      student: 'Я ученик',
      tutor: 'Я репетитор',
      studentMenu: {
        study: 'Учёба',
        finance: 'Финансы',
        account: 'Аккаунт',
        findTutor: 'Найти репетитора',
        myLessons: 'Мои занятия',
        marketplace: 'Маркетплейс',
        payment: 'Оплата',
        settings: 'Настройки',
      },
      tutorMenu: {
        work: 'Работа',
        materials: 'Материалы',
        finance: 'Финансы',
        account: 'Аккаунт',
        requests: 'Заявки',
        schedule: 'Расписание',
        students: 'Ученики',
        myMaterials: 'Мои материалы',
        payments: 'Оплаты',
        myProfile: 'Моя анкета',
        settings: 'Настройки',
      },
      tabs: {
        home: 'Главная',
        search: 'Репетиторы',
        schedule: 'Занятия',
        market: 'Маркет',
        profile: 'Профиль',
        requests: 'Заявки',
        students: 'Ученики',
      },
    },
    en: {
      menu: 'Menu',
      student: 'I am a student',
      tutor: 'I am a tutor',
      studentMenu: {
        study: 'Study',
        finance: 'Finance',
        account: 'Account',
        findTutor: 'Find a tutor',
        myLessons: 'My lessons',
        marketplace: 'Marketplace',
        payment: 'Payment',
        settings: 'Settings',
      },
      tutorMenu: {
        work: 'Work',
        materials: 'Materials',
        finance: 'Finance',
        account: 'Account',
        requests: 'Requests',
        schedule: 'Schedule',
        students: 'Students',
        myMaterials: 'My materials',
        payments: 'Payments',
        myProfile: 'My profile',
        settings: 'Settings',
      },
      tabs: {
        home: 'Home',
        search: 'Tutors',
        schedule: 'Lessons',
        market: 'Market',
        profile: 'Profile',
        requests: 'Requests',
        students: 'Students',
      },
    },
  };

  const text = t[lang];

  // Табы для мобильного таб-бара
  const studentTabs = [
    { icon: '🏠', label: text.tabs.home, href: '/' },
    { icon: '🔍', label: text.tabs.search, href: '/find-tutor' },
    { icon: '📅', label: text.tabs.schedule, href: '/lessons' },
    { icon: '📚', label: text.tabs.market, href: '/marketplace' },
    { icon: '👤', label: text.tabs.profile, href: '/profile' },
  ];

  const tutorTabs = [
    { icon: '🏠', label: text.tabs.home, href: '/' },
    { icon: '🔔', label: text.tabs.requests, href: '/requests' },
    { icon: '📅', label: text.tabs.schedule, href: '/schedule' },
    { icon: '👥', label: text.tabs.students, href: '/students' },
    { icon: '👤', label: text.tabs.profile, href: '/profile' },
  ];

  const tabs = role === 'student' ? studentTabs : tutorTabs;

  if (!mounted) {
    // Предотвращаем гидратационный мismatch
    return (
      <header className="bg-[#2d5f3f] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <span className="text-white text-xl font-bold">Tutor Connect</span>
        <div className="w-20 h-9" />
      </header>
    );
  }

  return (
    <>
      {/* ===== ШАПКА ===== */}
      <header className="bg-[#2d5f3f] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="text-white text-xl font-bold tracking-tight">
          Tutor Connect
        </Link>

        <div className="flex items-center gap-2.5">
          {/* Переключатель языков */}
          <div className="flex bg-white/20 rounded-full p-[3px] gap-0.5">
            <button
              onClick={() => handleSetLang('ru')}
              className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-all ${
                lang === 'ru'
                  ? 'bg-white text-[#2d5f3f]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => handleSetLang('en')}
              className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-all ${
                lang === 'en'
                  ? 'bg-white text-[#2d5f3f]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Бургер */}
          <button
            onClick={toggleMenu}
            aria-label="Меню"
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] bg-white/15 rounded-[10px] md:hidden"
          >
            <span
              className={`block w-[18px] h-[2.5px] bg-white rounded-sm transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-[18px] h-[2.5px] bg-white rounded-sm transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-[18px] h-[2.5px] bg-white rounded-sm transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* ===== ЗАТЕМНЕНИЕ ===== */}
      <div
        onClick={toggleMenu}
        className={`fixed inset-0 bg-black/40 z-[200] transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ===== МОБИЛЬНОЕ МЕНЮ (выезжает справа) ===== */}
      <nav
        className={`fixed top-0 right-0 w-[85%] max-w-[360px] h-full bg-[#1a1a1a] z-[201] flex flex-col overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Заголовок меню + переключатель ролей */}
        <div className="p-5 border-b border-white/[0.08] sticky top-0 bg-[#1a1a1a] z-10">
          <div className="text-white text-xl font-bold mb-4">{text.menu}</div>
          <div className="flex bg-white/10 rounded-xl p-1 gap-1">
            <button
              onClick={() => handleSetRole('student')}
              className={`flex-1 py-2.5 rounded-[10px] text-sm font-semibold transition-all ${
                role === 'student'
                  ? 'bg-[#2d5f3f] text-white'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {text.student}
            </button>
            <button
              onClick={() => handleSetRole('tutor')}
              className={`flex-1 py-2.5 rounded-[10px] text-sm font-semibold transition-all ${
                role === 'tutor'
                  ? 'bg-[#2d5f3f] text-white'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {text.tutor}
            </button>
          </div>
        </div>

        {/* Содержимое меню */}
        <div className="flex-1">
          {role === 'student' ? (
            <>
              <div className="px-5 py-5 border-b border-white/[0.06]">
                <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3">
                  {text.studentMenu.study}
                </h4>
                <MenuLink href="/find-tutor" icon="🔍" onClick={toggleMenu}>
                  {text.studentMenu.findTutor}
                </MenuLink>
                <MenuLink href="/lessons" icon="📅" onClick={toggleMenu}>
                  {text.studentMenu.myLessons}
                </MenuLink>
                <MenuLink href="/marketplace" icon="📚" onClick={toggleMenu}>
                  {text.studentMenu.marketplace}
                </MenuLink>
              </div>
              <div className="px-5 py-5 border-b border-white/[0.06]">
                <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3">
                  {text.studentMenu.finance}
                </h4>
                <MenuLink href="/payment" icon="💳" onClick={toggleMenu}>
                  {text.studentMenu.payment}
                </MenuLink>
              </div>
              <div className="px-5 py-5 border-b border-white/[0.06]">
                <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3">
                  {text.studentMenu.account}
                </h4>
                <MenuLink href="/settings" icon="⚙️" onClick={toggleMenu}>
                  {text.studentMenu.settings}
                </MenuLink>
              </div>
            </>
          ) : (
            <>
              <div className="px-5 py-5 border-b border-white/[0.06]">
                <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3">
                  {text.tutorMenu.work}
                </h4>
                <MenuLink href="/requests" icon="🔔" onClick={toggleMenu} badge="3">
                  {text.tutorMenu.requests}
                </MenuLink>
                <MenuLink href="/schedule" icon="📅" onClick={toggleMenu}>
                  {text.tutorMenu.schedule}
                </MenuLink>
                <MenuLink href="/students" icon="👥" onClick={toggleMenu}>
                  {text.tutorMenu.students}
                </MenuLink>
              </div>
              <div className="px-5 py-5 border-b border-white/[0.06]">
                <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3">
                  {text.tutorMenu.materials}
                </h4>
                <MenuLink href="/my-materials" icon="📁" onClick={toggleMenu}>
                  {text.tutorMenu.myMaterials}
                </MenuLink>
                <MenuLink href="/marketplace" icon="🛒" onClick={toggleMenu}>
                  {text.tutorMenu.marketplace}
                </MenuLink>
              </div>
              <div className="px-5 py-5 border-b border-white/[0.06]">
                <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3">
                  {text.tutorMenu.finance}
                </h4>
                <MenuLink href="/payments" icon="💳" onClick={toggleMenu}>
                  {text.tutorMenu.payments}
                </MenuLink>
              </div>
              <div className="px-5 py-5 border-b border-white/[0.06]">
                <h4 className="text-[11px] uppercase tracking-[1.2px] text-white/35 font-semibold mb-3">
                  {text.tutorMenu.account}
                </h4>
                <MenuLink href="/profile" icon="📝" onClick={toggleMenu}>
                  {text.tutorMenu.myProfile}
                </MenuLink>
                <MenuLink href="/settings" icon="⚙️" onClick={toggleMenu}>
                  {text.tutorMenu.settings}
                </MenuLink>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* ===== ДЕСКТОПНАЯ НАВИГАЦИЯ (под шапкой) ===== */}
      <nav className="hidden md:flex bg-[#2d5f3f] border-t border-white/10 justify-center gap-8 px-6">
        {role === 'student' ? (
          <>
            <DesktopLink href="/find-tutor">{text.studentMenu.findTutor}</DesktopLink>
            <DesktopLink href="/lessons">{text.studentMenu.myLessons}</DesktopLink>
            <DesktopLink href="/marketplace">{text.studentMenu.marketplace}</DesktopLink>
            <DesktopLink href="/payment">{text.studentMenu.payment}</DesktopLink>
            <DesktopLink href="/settings">{text.studentMenu.settings}</DesktopLink>
          </>
        ) : (
          <>
            <DesktopLink href="/requests">{text.tutorMenu.requests}</DesktopLink>
            <DesktopLink href="/schedule">{text.tutorMenu.schedule}</DesktopLink>
            <DesktopLink href="/students">{text.tutorMenu.students}</DesktopLink>
            <DesktopLink href="/my-materials">{text.tutorMenu.myMaterials}</DesktopLink>
            <DesktopLink href="/payments">{text.tutorMenu.payments}</DesktopLink>
            <DesktopLink href="/profile">{text.tutorMenu.myProfile}</DesktopLink>
          </>
        )}
      </nav>

      {/* ===== НИЖНИЙ ТАБ-БАР (только мобилка) ===== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/[0.06] z-40 flex pb-5 pt-2 px-1">
        {tabs.map((tab, i) => (
          <Link
            key={i}
            href={tab.href}
            className="flex-1 flex flex-col items-center gap-1 text-[11px] font-medium text-[#aaa] hover:text-[#2d5f3f] transition-colors"
          >
            <span className="text-xl leading-none">{tab.icon}</span>
            <span>{tab.label}</span>
          </Link>
        ))}
      </nav>

      {/* Отступ снизу на мобилке, чтобы контент не прятался за таб-бар */}
      <div className="md:hidden h-[68px]" />
    </>
  );
}

// ===== Вспомогательные компоненты =====

function MenuLink({
  href,
  icon,
  children,
  onClick,
  badge,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3.5 py-3 text-[15px] text-white/85 hover:text-[#c67b5c] transition-colors"
    >
      <span className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center text-[15px] shrink-0">
        {icon}
      </span>
      <span className="flex-1">{children}</span>
      {badge && (
        <span className="bg-[#c67b5c] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}

function DesktopLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-white/80 hover:text-white py-3.5 transition-colors"
    >
      {children}
    </Link>
  );
}

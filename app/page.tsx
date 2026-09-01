export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Tutor Connect
          </h1>
          <p className="text-lg md:text-2xl mb-10 opacity-90 leading-relaxed">
            Найди репетитора без переплат. Комиссия всего 8–10% — в 2 раза меньше, чем у «Репетит»
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-violet-700 font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition">
              Найти репетитора
            </button>
            <button className="bg-white/10 backdrop-blur border border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition">
              Стать репетитором
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-14">Что умеет платформа</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4 text-2xl">💰</div>
            <h3 className="text-xl font-bold mb-2">Низкая комиссия</h3>
            <p className="text-slate-600 leading-relaxed">8–10% с занятия против 19% у конкурентов. Репетиторы зарабатывают больше.</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 text-2xl">📚</div>
            <h3 className="text-xl font-bold mb-2">Маркетплейс наработок</h3>
            <p className="text-slate-600 leading-relaxed">Продавай методички, чек-листы, программы и получай пассивный доход.</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-2xl">🎓</div>
            <h3 className="text-xl font-bold mb-2">Курсы для репетиторов</h3>
            <p className="text-slate-600 leading-relaxed">Научись находить учеников, вести занятия онлайн и масштабировать доход.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-14">Как это работает</h2>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Создай профиль', desc: 'Укажи предметы, опыт, цену и формат занятий' },
              { step: '2', title: 'Получай заявки', desc: 'Ученики находят тебя через поиск и отправляют запрос' },
              { step: '3', title: 'Проводи занятия', desc: 'Онлайн или офлайн — как договоритесь' },
              { step: '4', title: 'Получай деньги', desc: 'Мы удерживаем всего 8–10% и мгновенно переводим остальное' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-slate-500 text-sm">
        © 2026 Tutor Connect. Создано репетиторами для репетиторов.
      </footer>
    </main>
  )
}

      
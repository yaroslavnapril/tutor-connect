export interface Tutor {
  id: string
  name: string
  rating: number
  reviews: number
  experience: number
  city: string
  price: number
  subjects: string[]
  formats: string[]
  photo: string
  badge: string
  bio: string
}

export const TUTORS: Tutor[] = [
  {
    id: '1',
    name: 'Анна Сергеевна',
    rating: 4.9,
    reviews: 127,
    experience: 5,
    city: 'Москва',
    price: 1500,
    subjects: ['Математика', 'ЕГЭ', 'ОГЭ'],
    formats: ['online'],
    photo: 'https://i.pravatar.cc/400?img=47',
    badge: 'Топ-репетитор',
    bio: 'Готовлю к ЕГЭ и ОГЭ. Разбираю каждую ошибку до полного понимания.'
  },
  {
    id: '2',
    name: 'Иван Петров',
    rating: 4.8,
    reviews: 89,
    experience: 3,
    city: 'Санкт-Петербург',
    price: 1200,
    subjects: ['Английский', 'IELTS'],
    formats: ['online'],
    photo: 'https://i.pravatar.cc/400?img=12',
    badge: 'Проверен',
    bio: 'Разговорный английский и IELTS. Жил в Лондоне, знаю все нюансы экзамена.'
  },
  {
    id: '3',
    name: 'Мария Кузнецова',
    rating: 5.0,
    reviews: 56,
    experience: 7,
    city: 'Санкт-Петербург',
    price: 1800,
    subjects: ['Физика', 'Олимпиады'],
    formats: ['tutor'],
    photo: 'https://i.pravatar.cc/400?img=32',
    badge: 'Эксперт',
    bio: 'Физика с нуля до олимпиад. Помогаю понять логику, а не зубрить формулы.'
  },
  {
    id: '4',
    name: 'Дмитрий Соколов',
    rating: 4.7,
    reviews: 42,
    experience: 4,
    city: 'Москва',
    price: 1300,
    subjects: ['История', 'Обществознание', 'ЕГЭ'],
    formats: ['student', 'tutor', 'online'],
    photo: 'https://i.pravatar.cc/400?img=51',
    badge: 'Проверен',
    bio: 'ЕГЭ по истории и обществознанию. Работаю по собственным методичкам.'
  },
  {
    id: '5',
    name: 'Елена Васильева',
    rating: 4.9,
    reviews: 203,
    experience: 10,
    city: 'Казань',
    price: 2000,
    subjects: ['Русский язык', 'Литература', 'ЕГЭ'],
    formats: ['online'],
    photo: 'https://i.pravatar.cc/400?img=45',
    badge: 'Топ-репетитор',
    bio: 'Сочинения, анализ текстов, подготовка к ЕГЭ. 95% учеников на 80+ баллов.'
  },
  {
    id: '6',
    name: 'Алексей Морозов',
    rating: 4.6,
    reviews: 31,
    experience: 2,
    city: 'Казань',
    price: 900,
    subjects: ['Информатика', 'Программирование'],
    formats: ['online'],
    photo: 'https://i.pravatar.cc/400?img=13',
    badge: 'Новый',
    bio: 'Python, подготовка к олимпиадам по информатике. Доступно и с нуля.'
  }
]

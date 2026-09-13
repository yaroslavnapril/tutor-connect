export interface Booking {
  id: string
  tutorId: string
  studentName: string
  subject: string
  date: string // YYYY-MM-DD
  time: string // HH:MM
  duration: number // минут
  price: number
  format: 'online' | 'offline'
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
  message?: string
  statusChangedAt?: string
}

export const BOOKINGS: Booking[] = [
  {
    id: 'b1',
    tutorId: '1',
    studentName: 'Кирилл',
    subject: 'Математика',
    date: '2026-09-18',
    time: '16:00',
    duration: 60,
    price: 1500,
    format: 'online',
    status: 'confirmed',
    createdAt: '2026-09-10'
  },
  {
    id: 'b2',
    tutorId: '1',
    studentName: 'Кирилл',
    subject: 'Математика',
    date: '2026-09-25',
    time: '16:00',
    duration: 60,
    price: 1500,
    format: 'online',
    status: 'confirmed',
    createdAt: '2026-09-10'
  },
  {
    id: 'b3',
    tutorId: '1',
    studentName: 'Ольга',
    subject: 'Математика',
    date: '2026-09-14',
    time: '10:00',
    duration: 60,
    price: 1500,
    format: 'online',
    status: 'pending',
    createdAt: '2026-09-11',
    message: 'Готовимся к контрольной на следующей неделе, нужно закрепить тему дробей.'
  },
  {
    id: 'b4',
    tutorId: '1',
    studentName: 'Максим',
    subject: 'ЕГЭ математика',
    date: '2026-09-20',
    time: '14:00',
    duration: 90,
    price: 2200,
    format: 'offline',
    status: 'pending',
    createdAt: '2026-09-12',
    message: 'Хочу подтянуть профильную математику перед экзаменом, начинаем с нуля почти.'
  },
  {
    id: 'b5',
    tutorId: '1',
    studentName: 'Кирилл',
    subject: 'Математика',
    date: '2026-09-04',
    time: '16:00',
    duration: 60,
    price: 1500,
    format: 'online',
    status: 'completed',
    createdAt: '2026-08-28'
  },
  {
    id: 'b6',
    tutorId: '1',
    studentName: 'Полина',
    subject: 'ОГЭ математика',
    date: '2026-09-13',
    time: '18:00',
    duration: 60,
    price: 1500,
    format: 'online',
    status: 'pending',
    createdAt: '2026-09-12',
    message: 'Ищу репетитора на регулярной основе, 2 раза в неделю.'
  }
]
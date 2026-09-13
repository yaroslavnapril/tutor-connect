export interface Booking {
  id: string
  tutorId: string
  studentName: string
  subject: string
  date: string
  time: string
  duration: number
  price: number
  format: 'online' | 'offline'
  status: 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
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
  }
]

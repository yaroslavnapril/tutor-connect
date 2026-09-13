export const PLATFORM_COMMISSION = 0.1 // 10% — комиссия платформы

export interface DesiredSlot {
  day: string // Пн, Вт, Ср...
  from: string
  to: string
}

export interface TutorRequest {
  id: string
  tutorId: string
  studentName: string
  subject: string
  goal: string
  studentGrade: string
  city: string
  format: 'online' | 'at_student' | 'at_tutor'
  budgetPrice: number
  lessonDuration: number
  forWhom: 'self' | 'child'
  desiredSlots: DesiredSlot[]
  comment?: string
  status: 'pending' | 'accepted' | 'declined'
  createdAt: string
  statusChangedAt?: string
}

export const REQUESTS: TutorRequest[] = [
  {
    id: 'r1',
    tutorId: '1',
    studentName: 'Ольга',
    subject: 'Математика',
    goal: 'ЕГЭ',
    studentGrade: '10 класс',
    city: 'Москва',
    format: 'online',
    budgetPrice: 1500,
    lessonDuration: 60,
    forWhom: 'child',
    desiredSlots: [
      { day: 'Вт', from: '19:00', to: '20:00' },
      { day: 'Чт', from: '19:00', to: '20:00' }
    ],
    comment: 'Готовимся к контрольной на следующей неделе, нужно закрепить тему дробей.',
    status: 'pending',
    createdAt: '2026-09-11T14:20:00'
  },
  {
    id: 'r2',
    tutorId: '1',
    studentName: 'Максим',
    subject: 'Математика',
    goal: 'ЕГЭ профильная',
    studentGrade: '11 класс',
    city: 'Москва',
    format: 'at_student',
    budgetPrice: 2200,
    lessonDuration: 90,
    forWhom: 'self',
    desiredSlots: [
      { day: 'Пн', from: '15:00', to: '16:30' },
      { day: 'Ср', from: '15:00', to: '16:30' },
      { day: 'Пт', from: '15:00', to: '16:30' }
    ],
    comment: 'Хочу подтянуть профильную математику перед экзаменом, начинаем почти с нуля.',
    status: 'pending',
    createdAt: '2026-09-12T09:05:00'
  },
  {
    id: 'r3',
    tutorId: '1',
    studentName: 'Полина',
    subject: 'Математика',
    goal: 'ОГЭ',
    studentGrade: '9 класс',
    city: 'Москва',
    format: 'online',
    budgetPrice: 1500,
    lessonDuration: 60,
    forWhom: 'self',
    desiredSlots: [
      { day: 'Вт', from: '18:00', to: '19:00' },
      { day: 'Чт', from: '18:00', to: '19:00' }
    ],
    comment: 'Ищу репетитора на регулярной основе, 2 раза в неделю.',
    status: 'pending',
    createdAt: '2026-09-12T18:40:00'
  }
]

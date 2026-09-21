import { TUTORS, Tutor } from './tutors'

export interface TutorOverride {
  name?: string
  city?: string
  experience?: number
  price?: number
  photo?: string
  about?: string
  subjects?: string[]
  education?: string[]
  achievements?: string[]
}

function getOverrides(): Record<string, TutorOverride> {
  if (typeof window === 'undefined') return {}
  const saved = localStorage.getItem('tc_tutor_overrides')
  return saved ? JSON.parse(saved) : {}
}

export function getTutorOverride(tutorId: string): TutorOverride {
  const overrides = getOverrides()
  return overrides[tutorId] || {}
}

export function setTutorOverride(tutorId: string, data: TutorOverride) {
  const overrides = getOverrides()
  overrides[tutorId] = { ...overrides[tutorId], ...data }
  localStorage.setItem('tc_tutor_overrides', JSON.stringify(overrides))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('tc-tutor-profile-change'))
  }
}

export function applyOverride(tutor: Tutor): Tutor {
  const override = getTutorOverride(tutor.id)
  return { ...tutor, ...override }
}

export function loadDisplayTutors(): Tutor[] {
  return TUTORS.map(applyOverride)
}

import { REQUESTS, TutorRequest } from './requests'

interface OverrideEntry {
  status: TutorRequest['status']
  changedAt: string
}

function getOverrides(): Record<string, OverrideEntry> {
  if (typeof window === 'undefined') return {}
  const saved = localStorage.getItem('tc_request_overrides')
  return saved ? JSON.parse(saved) : {}
}

export function loadAllRequests(): TutorRequest[] {
  const overrides = getOverrides()
  return REQUESTS.map(r => {
    const override = overrides[r.id]
    if (override) {
      return { ...r, status: override.status, statusChangedAt: override.changedAt }
    }
    return r
  })
}

export function setRequestStatus(id: string, status: TutorRequest['status']) {
  const overrides = getOverrides()
  overrides[id] = { status, changedAt: new Date().toISOString() }
  localStorage.setItem('tc_request_overrides', JSON.stringify(overrides))
}

export function daysSince(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24))
}

export function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  if (hours < 1) return 'меньше часа назад'
  if (hours < 24) return `${hours} ч. назад`
  const days = Math.floor(hours / 24)
  return `${days} дн. назад`
}

export const FORMAT_LABELS: Record<TutorRequest['format'], string> = {
  online: '💻 Онлайн',
  at_student: '🏠 У ученика',
  at_tutor: '🎓 У репетитора'
}

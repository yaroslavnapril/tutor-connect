import { BOOKINGS, Booking } from './bookings'

interface OverrideEntry {
  status: Booking['status']
  changedAt: string
}

function getCustomBookings(): Booking[] {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('tc_bookings')
  return saved ? JSON.parse(saved) : []
}

function getOverrides(): Record<string, OverrideEntry> {
  if (typeof window === 'undefined') return {}
  const saved = localStorage.getItem('tc_booking_overrides')
  return saved ? JSON.parse(saved) : {}
}

export function loadAllBookings(): Booking[] {
  const overrides = getOverrides()
  const merged = [...getCustomBookings(), ...BOOKINGS]
  return merged.map(b => {
    const override = overrides[b.id]
    if (override) {
      return { ...b, status: override.status, statusChangedAt: override.changedAt }
    }
    return b
  })
}

export function setBookingStatus(id: string, status: Booking['status']) {
  const overrides = getOverrides()
  overrides[id] = { status, changedAt: new Date().toISOString() }
  localStorage.setItem('tc_booking_overrides', JSON.stringify(overrides))
}

export function daysSince(isoDate: string): number {
  const then = new Date(isoDate).getTime()
  const now = Date.now()
  return Math.floor((now - then) / (1000 * 60 * 60 * 24))
}

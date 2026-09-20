import { BOOKINGS, Booking } from './bookings'

interface OverrideEntry {
  status?: Booking['status']
  changedAt?: string
  homework?: string
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
      return { ...b, ...override }
    }
    return b
  })
}

export function setBookingStatus(id: string, status: Booking['status']) {
  const overrides = getOverrides()
  overrides[id] = { ...overrides[id], status, changedAt: new Date().toISOString() }
  localStorage.setItem('tc_booking_overrides', JSON.stringify(overrides))
}

export function setBookingHomework(id: string, homework: string) {
  const overrides = getOverrides()
  overrides[id] = { ...overrides[id], homework }
  localStorage.setItem('tc_booking_overrides', JSON.stringify(overrides))
}

export function addBooking(booking: Omit<Booking, 'id' | 'createdAt'>) {
  if (typeof window === 'undefined') return
  const saved = localStorage.getItem('tc_bookings')
  const list: Booking[] = saved ? JSON.parse(saved) : []
  const newBooking: Booking = {
    ...booking,
    id: `custom-${Date.now()}`,
    createdAt: new Date().toISOString()
  }
  list.unshift(newBooking)
  localStorage.setItem('tc_bookings', JSON.stringify(list))
}

export function daysSince(isoDate: string): number {
  const then = new Date(isoDate).getTime()
  const now = Date.now()
  return Math.floor((now - then) / (1000 * 60 * 60 * 24))
}

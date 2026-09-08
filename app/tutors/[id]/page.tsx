import { notFound } from 'next/navigation'
import { TUTORS } from '../../data/tutors'
import TutorProfileClient from './TutorProfileClient'

export function generateStaticParams() {
  return TUTORS.map(t => ({ id: t.id }))
}

export default async function TutorProfile({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await params
  const tutor = TUTORS.find(t => t.id === resolvedParams.id)
  if (!tutor) return notFound()

  return <TutorProfileClient tutor={tutor} />
}

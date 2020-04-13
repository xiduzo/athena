import { IAgreement } from 'src/lib/interfaces'

export const getFeedbackGivenThisWeek = (
  agreement: IAgreement,
  currentUserId: string,
  currentWeek: number
): number =>
  agreement.feedback.filter((f) => f.from.id === currentUserId && f.weekNum === currentWeek).length

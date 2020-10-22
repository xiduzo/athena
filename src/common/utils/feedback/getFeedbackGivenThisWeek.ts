import { Agreement } from 'src/lib/interfaces'
import { getWeek } from '../helpers/getWeek'

export const getFeedbackGivenThisWeek = (agreement: Agreement, currentUserId: string): number =>
  agreement.feedback.filter(
    (f) => f.from.id === currentUserId && getWeek(new Date(f.weekStart.formatted)) === getWeek()
  ).length

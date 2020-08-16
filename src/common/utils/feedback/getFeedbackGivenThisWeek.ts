import { IAgreement } from 'src/lib/interfaces'
import { getWeek } from '../helpers/getWeek'

export const getFeedbackGivenThisWeek = (agreement: IAgreement, currentUserId: string): number =>
  agreement.feedback.filter((f) => f.from.id === currentUserId && f.weekNum === getWeek()).length

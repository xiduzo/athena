import { Agreement, IUser, Feedback } from 'src/lib/interfaces'
import { getWeek } from '../helpers/getWeek'

export const getMyFeedback = (
  agreement: Agreement,
  toUser: IUser,
  selectedWeek: number
): Feedback | undefined =>
  agreement.feedback.find(
    (feedback) =>
      feedback.to.id === toUser.id &&
      getWeek(new Date(feedback.weekStart.formatted)) === selectedWeek &&
      feedback.agreement.id === agreement.id
  )

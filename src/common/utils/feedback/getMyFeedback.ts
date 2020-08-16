import { IAgreement, IUser, IFeedback } from 'src/lib/interfaces'

export const getMyFeedback = (
  agreement: IAgreement,
  toUser: IUser,
  selectedWeek: number
): IFeedback | undefined =>
  agreement.feedback.find(
    (feedback) =>
      feedback.to.id === toUser.id &&
      feedback.weekNum === selectedWeek &&
      feedback.agreement.id === agreement.id
  )

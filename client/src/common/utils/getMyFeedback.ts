import { IAgreement, IUser } from 'src/lib/interfaces'

export const getMyFeedback = (agreement: IAgreement, weekNum: number, toUser: IUser) =>
  agreement.feedback.find(
    (feedback) =>
      feedback.to.id === toUser.id &&
      feedback.weekNum === weekNum &&
      feedback.agreement.id === agreement.id
  )

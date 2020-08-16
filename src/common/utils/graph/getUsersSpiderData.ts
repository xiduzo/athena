import { AgreementType } from 'src/lib/enums'
import { IAgreement } from 'src/lib/interfaces'
import { groupBy } from '..'

export const getUsersSpiderData = (
  agreements: IAgreement[]
): { usersFeedbackLine: number[][]; typesUsed: AgreementType[] } => {
  const usersFeedbackLine: number[][] = []

  const agreementTypes = groupBy(agreements, (a) => a.type)
  const typesUsed: AgreementType[] = []

  agreementTypes.forEach((agreements, type) => {
    typesUsed.push(type)

    agreements.forEach((agreement) => {
      const userFeedback = groupBy(agreement.feedback, (f) => f.to.id)
      userFeedback.forEach((feedback, userId) => {
        // console.log(feedback, userId, type)
        if (!usersFeedbackLine[userId]) usersFeedbackLine[userId] = []

        usersFeedbackLine[userId][type] = feedback.reduce(
          (curr, next) => (curr += agreement.points * next.rating),
          0
        )
      })
    })
  })

  return { usersFeedbackLine, typesUsed }
}

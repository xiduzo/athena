import { AgreementType } from 'src/lib/enums'
import { Agreement } from 'src/lib/interfaces'
import { groupBy } from '..'

export const getUsersSpiderData = (
  agreements: Agreement[]
): { usersFeedbackLine: number[][]; typesUsed: AgreementType[] } => {
  const usersFeedbackLine: number[][] = []

  const agreementTypes = groupBy(agreements, (a) => a.type)
  const typesUsed: AgreementType[] = []

  agreementTypes.forEach((agreements, type) => {
    typesUsed.push(type)

    agreements.forEach((agreement) => {
      const userFeedback = groupBy(agreement.feedback, (f) => f.to.id)
      userFeedback.forEach((feedback, userId) => {
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

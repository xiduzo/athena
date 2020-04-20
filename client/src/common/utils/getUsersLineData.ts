import { IAgreement, IFeedback } from 'src/lib/interfaces'
import { groupBy, getLineData, sumArrays } from '.'

export const getUsersLineData = (agreements: IAgreement[]): number[][] => {
  const usersFeedbackLine: number[][] = []

  agreements.forEach((agreement) => {
    const usersFeedback = groupBy(agreement.feedback, (feedback) => feedback.to.id)

    usersFeedback.forEach((feedback, userId) => {
      const lineData = getLineData(
        feedback,
        agreement.points,
        Math.max(...feedback.map((f) => f.weekNum))
      )
      const currentLine = usersFeedbackLine[userId]
      usersFeedbackLine[userId] = !currentLine ? lineData : sumArrays(currentLine, lineData)
    })
  })

  return usersFeedbackLine
}

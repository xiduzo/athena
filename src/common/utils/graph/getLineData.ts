import { IFeedback } from 'src/lib/interfaces'

export const getLineData = (feedback: IFeedback[]): number[] => {
  const feedbackLine = feedback.reduce((sum, f) => {
    if (!sum[f.weekNum]) sum[f.weekNum] = 0
    sum[f.weekNum] += f.rating * f.agreement.points
    return sum
  }, [] as number[])

  return feedbackLine
}

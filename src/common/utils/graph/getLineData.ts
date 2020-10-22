import { Feedback } from 'src/lib/interfaces'

export const getLineData = (feedback: Feedback[]): number[] => {
  const feedbackLine = feedback.reduce((sum, f) => {
    if (!sum[f.weekStart.formatted]) sum[f.weekStart.formatted] = 0
    sum[f.weekStart.formatted] += f.rating * f.agreement.points
    return sum
  }, [] as number[])

  return feedbackLine
}

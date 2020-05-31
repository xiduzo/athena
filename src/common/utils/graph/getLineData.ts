import { IFeedback } from 'src/lib/interfaces'

const maxRating: number = 4.0 // TODO: make global const

export const getPointsEarned = (agreementPoints: number, rating: number): number =>
  (rating * (agreementPoints * maxRating)) / maxRating

export const getLineData = (feedback: IFeedback[]): number[] => {
  const feedbackLine: number[] = Array.from<number>({
    length: Math.max(...feedback.map((f) => f.weekNum)) + 1, // We start at week 0
  }).fill(0)

  feedback.forEach(
    (f) => (feedbackLine[f.weekNum] += getPointsEarned(f.agreement.points, f.rating))
  )

  return feedbackLine
}

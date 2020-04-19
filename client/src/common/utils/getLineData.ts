import { IFeedback } from 'src/lib/interfaces'

// TODO move these types to its own files
type Percentage = number
type Points = number

type Double = number
type Rating = Double

const maxRating: Rating = 4.0 // TODO: make global const

export const getPointsEarned = (agreementPoints: Points, rating: Rating): Points =>
  (rating * (agreementPoints * maxRating)) / maxRating

export const getPercentageEarned = (rating: Rating): Percentage => (rating * 100) / maxRating

export const getLineData = (
  feedback: IFeedback[],
  agreementPoints: Points,
  maxWeek: number
): number[] => {
  const feedbackLine: number[] = Array.from<number>({ length: maxWeek }).fill(0)

  feedback.forEach(
    (f) => (feedbackLine[f.weekNum - 1] += getPointsEarned(agreementPoints, f.rating))
  )

  return feedbackLine
}

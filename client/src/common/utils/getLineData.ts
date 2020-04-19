import { IFeedback } from 'src/lib/interfaces'

export const getLineData = (
  feedback: IFeedback[],
  agreementPoints: number,
  currentWeek: number
): number[] => {
  const maxRating = 4 // TODO: make global const
  const feedbackLine: number[] = Array.from<number>({ length: currentWeek }).fill(0)

  agreementPoints = agreementPoints === 0 ? 10 : agreementPoints // todo make sure this can not be 0

  feedback.forEach(
    (f) => (feedbackLine[f.weekNum - 1] += (f.rating * (agreementPoints * maxRating)) / maxRating)
  )

  return feedbackLine
}

import { Agreement, Feedback } from 'src/lib/interfaces'
import { groupBy } from '..'

export const getFeedbackByUser = (agreements: Agreement[]): Map<string, Feedback[]> => {
  const feedback = agreements
    .map((_agreement) => _agreement.feedback.map((f) => ({ ...f, agreement: _agreement })))
    .flat()

  const byUser = groupBy(feedback, (f) => f.to.id)

  return byUser
}

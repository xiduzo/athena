import { IAgreement, IFeedback } from 'src/lib/interfaces'
import { getLineData } from './getLineData'

export const getUsersLineData = (agreements: IAgreement[]): Map<string, number[]> => {
  const feedback: Map<string, IFeedback[]> = new Map()

  agreements.forEach((_agreement) => {
    _agreement.feedback.forEach((_feedback) => {
      const to = _feedback.to.id
      _feedback.agreement = _agreement
      feedback.set(to, [...(feedback.get(to) ?? []), _feedback])
    })
  })

  const lineData = Array.from(feedback).reduce((map, [_userId, _feedback]) => {
    map[_userId] = getLineData(_feedback)
    return map
  }, {} as Map<string, number[]>)

  return lineData
}

import { IAgreement } from 'src/lib/interfaces'

const maxRating: number = 4
export const getMaxPointsPerWeek = (agreements: IAgreement[], amountOfTeamMember: number): number =>
  Math.abs(
    agreements.reduce((points, agreement) => (points += agreement.points * maxRating), 0) *
      (amountOfTeamMember - 1) // We can not give feedback to ourselves
  )

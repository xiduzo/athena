import { IAgreement } from 'src/lib/interfaces'

export const getMaxPointsPerWeek = (agreements: IAgreement[], amountOfTeamMember: number): number =>
  agreements.reduce((prev, curr) => (prev += curr.points * 4), 0) * (amountOfTeamMember - 1) // We can not give feedback to ourselves

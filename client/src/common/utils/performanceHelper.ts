import { formatDate } from './dateHelper'

export const logPerformance = (event: string) => {
  console.log(`${event} @ ${formatDate(new Date(), 'h:i:s:M')}`)
}

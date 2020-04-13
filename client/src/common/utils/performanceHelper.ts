import { formatDate } from './dateHelper'

export const logPerformance = (event: string): void => {
  console.log(`${event} @ ${formatDate(new Date(), 'h:i:s:M')}`)
}

import { formatDate } from './dateHelpers'

export const logPerformance = (event: string) => {
  console.log(`${event} @ ${formatDate(new Date(), 'h:i:s:M')}`)
}

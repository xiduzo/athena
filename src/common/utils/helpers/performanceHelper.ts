import { formatDate } from 'src/common/utils'

export const logPerformance = (event: string, format: string = 'h:i:s:M'): void => {
  console.log(`${event} @ ${formatDate(new Date(), format)}`)
}

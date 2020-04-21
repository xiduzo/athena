import { Percentage } from 'src/lib/types'

export const asPercentage = (x: number, max: number): Percentage => (x * 100) / max

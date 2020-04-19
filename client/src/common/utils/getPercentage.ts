import { Percentage } from 'src/lib/types'

export const getPercentage = (x: number, max: number): Percentage => (x * 100) / max

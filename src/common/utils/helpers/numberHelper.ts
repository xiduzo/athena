import { Percentage } from 'src/lib/types'

export const asPercentage = (x: number, max: number, floatingPoint: number = 0): Percentage =>
  Number(((x * 100) / max).toFixed(floatingPoint))

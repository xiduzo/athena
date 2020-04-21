import { sumArrays } from './sumArrays'

export const normalizeArray = (array: number[]): number[] =>
  sumArrays(Array.from({ length: array.length }).fill(null) as number[], array)

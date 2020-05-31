import { sumArrays } from 'src/common/utils'

export const normalizeArray = (array: (number | undefined)[]): number[] =>
  sumArrays(Array.from({ length: array.length }).fill(null) as number[], array)

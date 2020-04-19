import { sumArrays } from './sumArrays'

export const getAverageLineData = (lineData: { id: string; data: number[] }[]): number[] => {
  return (
    lineData
      // Reduce so we have have a sum of the week on each index
      .reduce(
        (prev, curr) => (prev.length > 0 ? sumArrays(prev, curr.data) : curr.data),
        [] as number[]
      )
      // Map to get average of each week
      // -1 because we can not give ourselves feedback
      .map((x) => x / lineData.length - 1)
  )
}

export const sumArrays = (
  arrayOne: (number | undefined)[],
  arrayTwo: (number | undefined)[]
): number[] => {
  const biggestArray = Math.max(arrayOne.length, arrayTwo.length)

  const summedArray: number[] = Array.from<number>({ length: biggestArray })
    .fill(0)
    .map((value, index) => {
      const arrayOneValue = arrayOne[index] ?? value
      const arrayTwoValue = arrayTwo[index] ?? value

      return arrayOneValue + arrayTwoValue
    })

  return summedArray
}

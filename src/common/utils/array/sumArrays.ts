export const sumArrays = (
  arrayOne: (number | undefined)[],
  arrayTwo: (number | undefined)[]
): number[] => {
  const maxArraySize = Math.max(arrayOne.length, arrayTwo.length)

  const summedArray: number[] = Array.from<number>({ length: maxArraySize })
    .fill(0)
    .map((value, index) => {
      const arrayOneValue = arrayOne[index] ?? value
      const arrayTwoValue = arrayTwo[index] ?? value

      return arrayOneValue + arrayTwoValue
    })

  return summedArray
}

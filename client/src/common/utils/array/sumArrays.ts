export const sumArrays = (arrayOne: number[], arrayTwo: number[]): number[] => {
  const summedArray: number[] = Array.from<number>({ length: arrayOne.length }).fill(0)

  arrayOne.forEach((value, index) => {
    if (arrayTwo[index]) {
      summedArray[index] = value + arrayTwo[index]
    }
  })

  return summedArray
}

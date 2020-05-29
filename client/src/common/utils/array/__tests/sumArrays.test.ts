import { sumArrays } from '../sumArrays'

describe('Having two empty number arrays', () => {
  it('should return a empty number array', () => {
    // Arrange
    const expected: number[] = []

    // Act
    const received = sumArrays([], [])

    // Assert
    expect(received).toEqual(expected)
  })
})

describe('Having two complete number arrays of equal length', () => {
  it('should sum the arrays on the indexes', () => {
    // Arrange
    const arrayOne: number[] = [1, 1, 1, 1]
    const arrayTwo: number[] = [1, 1, 1, 1]
    const expected: number[] = [2, 2, 2, 2]

    // Act
    const received = sumArrays(arrayOne, arrayTwo)

    // Assert
    expect(received).toEqual(expected)
  })
})

describe('Having complete arrays of different length', () => {
  it('replace the empty indexes by `0`', () => {
    // Arrange
    const arrayOne: number[] = [1, 1, 1, 1, 1, 1, 1]
    const arrayTwo: number[] = [1, 1, 1, 1]
    const expected: number[] = [2, 2, 2, 2, 1, 1, 1]

    // Act
    const received = sumArrays(arrayOne, arrayTwo)

    // Assert
    expect(received).toEqual(expected)
  })
})

describe('Having incomplete arrays of equal length', () => {
  it('replace the incomplete indexes by `0`', () => {
    // Arrange
    const arrayOne: (number | undefined)[] = [undefined, 1, 1, 1]
    const arrayTwo: (number | undefined)[] = [1, 1, 1, undefined]
    const expected: number[] = [1, 2, 2, 1]

    // Act
    const received = sumArrays(arrayOne, arrayTwo)

    // Assert
    expect(received).toEqual(expected)
  })
})

describe('Having incomplete arrays of different length', () => {
  it('replace the empty and incomplete indexes by `0`', () => {
    // Arrange
    const arrayOne: (number | undefined)[] = [undefined, 1, 1, 1, 1, 1, 1]
    const arrayTwo: (number | undefined)[] = [1, 1, 1, undefined]
    const expected: number[] = [1, 2, 2, 1, 1, 1, 1]

    // Act
    const received = sumArrays(arrayOne, arrayTwo)

    // Assert
    expect(received).toEqual(expected)
  })
})

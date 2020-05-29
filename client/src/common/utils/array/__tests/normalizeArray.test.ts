import { normalizeArray } from '../normalizeArray'

describe('Having an empty array', () => {
  it('should return an empty array', () => {
    // Arrange

    // Act
    const received = normalizeArray([])

    // Assert
    expect(received).toHaveLength(0)
  })
})

describe('Having an number array of random numbers', () => {
  it('should return the same array of numbers', () => {
    // Arrange
    const expected: number[] = [Math.random(), Math.random(), Math.random(), Math.random()]

    // Act
    const received = normalizeArray(expected)

    // Assert
    expect(received).toEqual(expected)
  })
})

describe('Having an number array with undefined indexes', () => {
  it('should replace the undefined indexes with `0`', () => {
    // Arrange
    const arrayWithUndefinedIndexes: (number | undefined)[] = [1, undefined, 6, undefined]
    const expected: number[] = [1, 0, 6, 0]

    // Act
    const received = normalizeArray(arrayWithUndefinedIndexes)

    // Assert
    expect(received).toEqual(expected)
  })
})

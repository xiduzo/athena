import { groupBy } from '../groupBy'

describe('Having an empty list', () => {
  it('should give back an empty map', () => {
    // Arrange
    const list: number[] = []

    const expected = new Map<string, number[]>()
    // Act
    const received = groupBy(list, (x) => x)

    // Assert
    expect(received).toEqual(expected)
  })
})

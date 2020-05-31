import { groupBy } from '../groupBy'

describe('Given an empty list', () => {
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

describe('Given an non empty list', () => {
  describe('and no matches come out of the key getter', () => {
    it('should give a map with the list in one key', () => {
      // Arrange
      const list: number[] = [1, 2, 1, 2, 3]

      const expected = new Map<string, number[]>()
      expected.set('false', list)

      // Act
      const received = groupBy(list, (x) => (x > 5 ? 'true' : 'false'))

      // Assert
      expect(received).toEqual(expected)
    })
  })
  describe('and matches come out of the key getter', () => {
    it('should separate the items based on the key getter return value', () => {
      // Arrange
      const list: number[] = [1, 2, 1, 2, 3]

      const expected = new Map<string, number[]>()
      expected.set('false', [1, 2, 1, 2])
      expected.set('true', [3])

      // Act
      const received = groupBy(list, (x) => (x > 2 ? 'true' : 'false'))

      // Assert
      expect(received).toEqual(expected)
    })
  })
})

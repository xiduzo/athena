import { hasMatchesWith } from '../hasMatchesWith'
import { Agreement, Translation } from 'src/lib/interfaces'

describe('Having empty arrays', () => {
  describe('while both arrays are empty', () => {
    it('should never have any matches', () => {
      // Arrange
      const expected: boolean = false

      // Act
      const received = hasMatchesWith([], [])

      // Assert
      expect(received).toBe(expected)
    })
  })

  describe('while one array is empty', () => {
    it('should never have any matches [arrayOne]', () => {
      // Arrange
      const expected: boolean = false

      // Act
      const received = hasMatchesWith([], [1])

      // Assert
      expect(received).toBe(expected)
    })
    it('should never have any matches [arrayTwo]', () => {
      // Arrange
      const expected: boolean = false

      // Act
      const received = hasMatchesWith([1], [])

      // Assert
      expect(received).toBe(expected)
    })
  })
})

describe('Having arrays of unknown types', () => {
  it('should not have any matches', () => {
    // Arrange
    const expected: boolean = false

    // Act
    const received = hasMatchesWith([1, 2, 3], ['1', '2', '3'])

    // Assert
    expect(received).toBe(expected)
  })
  it('should have matches if one array a type from the other array with a match', () => {
    // Arrange
    const expected: boolean = true

    // Act
    const received = hasMatchesWith([1, 2, 3], ['1', 2, '3'])

    // Assert
    expect(received).toBe(expected)
  })
})

describe('Having two arrays of the same type', () => {
  describe('containing simple types', () => {
    it('should not give a match if no data overlaps', () => {
      // Arrange
      const expected: boolean = false

      // Act
      const received = hasMatchesWith([1, 2, 3], [4, 5, 6])

      // Assert
      expect(received).toBe(expected)
    })
    it('should give a match if data overlaps', () => {
      // Arrange
      const expected: boolean = true

      // Act
      const received = hasMatchesWith([1, 2, 3], [1, 5, 6])

      // Assert
      expect(received).toBe(expected)
    })
  })
  describe('containing complex types', () => {
    it('should not give a match if no data overlaps', () => {
      // Arrange
      const expected: boolean = false
      const translation: Translation = {
        id: '123',
        language: 'nl',
        text: 'dit is een text',
      }
      const translationCompare: Translation = {
        ...translation,
        text: 'dit is een andere text',
      }

      // Act
      const received = hasMatchesWith([translation], [translationCompare])

      // Assert
      expect(received).toBe(expected)
    })
    it('should give a match if data overlaps', () => {
      // Arrange
      const expected: boolean = true
      const translation: Translation = {
        id: '123',
        language: 'nl',
        text: 'dit is een text',
      }

      // Act
      const received = hasMatchesWith([translation], [translation])

      // Assert
      expect(received).toBe(expected)
    })
  })
})

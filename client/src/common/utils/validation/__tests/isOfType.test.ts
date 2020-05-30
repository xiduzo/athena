import { isArray, isObject } from '../isOfType'

describe('Giving an array', () => {
  it('should be an array', () => {
    // Arrange
    const expected = true

    // Act
    const received = isArray([])

    // Assert
    expect(received).toBe(expected)
  })
})

describe('Giving an object', () => {
  it('should be an object', () => {
    // Arrange
    const expected = true

    // Act
    const received = isObject({})

    // Assert
    expect(received).toBe(expected)
  })
})

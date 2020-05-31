import { asPercentage } from '../numberHelper'

describe('Given a total and number', () => {
  it('should give a percentage', () => {
    // Arrange
    const expected = 10

    // Act
    const received = asPercentage(10, 100)

    // Assert
    expect(received).toBe(expected)
  })
})

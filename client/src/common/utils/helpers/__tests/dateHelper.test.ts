import { formatDate } from '../dateHelper'

describe('Given a format', () => {
  it('should give a time string', () => {
    // Arrange
    const expected = '20:20:20:020'
    const date = new Date()

    date.setUTCHours(20)
    date.setUTCMinutes(20)
    date.setUTCSeconds(20)
    date.setUTCMilliseconds(20)

    // Act
    const received = formatDate(date, 'h:i:s:M')

    // Assert
    expect(received).toBe(expected)
  })
})

describe('Given no format', () => {
  it('should give a empty string', () => {
    // Arrange
    const expected = ''
    const date = new Date()

    date.setUTCHours(20)
    date.setUTCMinutes(20)
    date.setUTCSeconds(20)
    date.setUTCMilliseconds(20)

    // Act
    const received = formatDate(date, '')

    // Assert
    expect(received).toBe(expected)
  })
})

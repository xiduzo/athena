import { Feedback, Agreement } from 'src/lib/interfaces'
import { getLineData } from '../getLineData'

describe('Given no feedback', () => {
  it('should give an empty array', () => {
    // Arrange
    const feedback: Feedback[] = []

    // Act
    const received = getLineData(feedback)

    // Assert
    expect(received).toHaveLength(0)
  })
})

describe('Given feedback', () => {
  it('order the feedback per week, filling in the empty weeks with 0', () => {
    // Arrange
    const expected = [40]
    const feedback: Partial<Feedback>[] = [
      {
        weekNum: 0,
        rating: 4,
        agreement: {
          points: 10,
        } as Agreement,
      },
    ]

    // Act
    const received = getLineData(feedback as Feedback[])

    // Assert
    expect(received).toEqual(expected)
  })
})

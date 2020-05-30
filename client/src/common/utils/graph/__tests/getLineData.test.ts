import { IFeedback, IAgreement } from 'src/lib/interfaces'
import { getLineData } from '../getLineData'

describe('Given no feedback', () => {
  it('should give an empty array', () => {
    // Arrange
    const feedback: IFeedback[] = []

    // Act
    const received = getLineData(feedback)

    // Assert
    expect(received).toHaveLength(0)
  })
})

describe('Given feedback', () => {
  it('should give an empty array when no week is passed', () => {
    // Arrange
    const expected = [40]
    const feedback: Partial<IFeedback>[] = [
      {
        weekNum: 0,
        rating: 4,
        agreement: {
          points: 10,
        } as IAgreement,
      },
    ]

    // Act
    const received = getLineData(feedback as IFeedback[])

    // Assert
    expect(received).toEqual(expected)
  })
})

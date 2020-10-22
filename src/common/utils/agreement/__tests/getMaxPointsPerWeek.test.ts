import { getMaxPointsPerWeek } from '../'
import { Agreement, Translation, Feedback } from 'src/lib/interfaces'
import { AgreementType } from 'src/lib/enums'

const agreements: Agreement[] = [
  {
    id: '1',
    type: AgreementType.ATTITUDE,
    isBase: false,
    points: 10,
    transLations: [] as Translation[],
    feedBack: [] as Feedback[],
  },
  {
    id: '1',
    type: AgreementType.ATTITUDE,
    isBase: false,
    points: 10,
    transLations: [] as Translation[],
    feedBack: [] as Feedback[],
  },
]

describe('Having 0 agreements', () => {
  it('it should get 0 points', () => {
    // Arrange
    const expected = 0

    // Act
    const received = getMaxPointsPerWeek([], 0)

    // Assert
    expect(received).toBe(expected)
  })
})

describe('Having 1 agreement of 10 points', () => {
  it('should give 0 points with 1 team member', () => {
    // Arrange
    const expected = 0

    const members = 1
    const singleAgreement: Agreement[] = [agreements[0]]

    // Act
    const received = getMaxPointsPerWeek(singleAgreement, members)

    // Assert
    expect(received).toBe(expected)
  })

  it('should give 40 points with 2 team members', () => {
    // Arrange
    const expected = 40

    const members = 2
    const singleAgreement: Agreement[] = [agreements[0]]

    // Act
    const received = getMaxPointsPerWeek(singleAgreement, members)

    // Assert
    expect(received).toBe(expected)
  })
})

describe('Having 2 agreements of 10 points each', () => {
  it('should give 0 points with 1 team member', () => {
    // Arrange
    const expected = 0

    const members = 1

    // Act
    const received = getMaxPointsPerWeek(agreements, members)

    // Assert
    expect(received).toBe(expected)
  })

  it('should give 80 points with 2 team members', () => {
    // Arrange
    const expected = 80

    const members = 2

    // Act
    const received = getMaxPointsPerWeek(agreements, members)

    // Assert
    expect(received).toBe(expected)
  })
})

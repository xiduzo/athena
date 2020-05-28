// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './App'

// it('renders without crashing', () => {
//   const div = document.createElement('div')
//   ReactDOM.render(<App />, div)
//   ReactDOM.unmountComponentAtNode(div)
// })
import { getMaxPointsPerWeek } from '../'
import { IAgreement } from 'src/lib/interfaces'

const agreements: IAgreement[] = [
  {
    id: '1',
    agreementType: AgreementType.ATTITUDE,
    isBase: false,
    points: 10,
    transLations: [],
    feedBack: [],
  },
]
it('should get the max points per week', () => {
  // Arrange
  const expected = 10

  // Act
  const result = getMaxPointsPerWeek(agreements)

  // Assert
  expect(expected).toBe(result)
})

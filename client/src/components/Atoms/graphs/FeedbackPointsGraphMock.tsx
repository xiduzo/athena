import React, { FC } from 'react'
import { Paper } from '@material-ui/core'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { getFeedbackPointsOptions } from './feedbackPointsOptions'

interface IFeedbackPointsGraphMock {
  loading?: boolean
}
export const FeedbackPointsGraphMock: FC<IFeedbackPointsGraphMock> = (props) => {
  const { loading = true } = props

  const options = getFeedbackPointsOptions(
    loading ? [50, 43, 67, 43, 23, 55] : [],
    [
      {
        id: '1234',
        name: loading ? `loading` : `No data found`,
        data: loading ? [43, 56, 32, 56, 45, 36] : [],
        zones: [
          {
            value: 4,
            dashStyle: 'Solid',
          },
        ],
      },
    ],
    true,
    '',
    100
  )

  return (
    <Paper>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Paper>
  )
}

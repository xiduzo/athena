import { Paper } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { FC } from 'react'
import { IAgreement } from 'src/lib/interfaces'

interface IFeedbackPointsGraph {
  agreements?: IAgreement[]
}

export const FeedbackPointsGraph: FC<IFeedbackPointsGraph> = (props) => {
  // const { agreements } = props

  const theme = useTheme()

  const options = {
    title: { text: 'Feedback' },
    xAxis: {
      visible: false,
      categories: [],
    },
    yAxis: [
      {
        visible: false,
        // title: { text: 'Punten percentage' },
        min: 0,
        max: 100,
      },
    ],
    tooltip: {
      pointFormat: 'Week {series.name} <strong>{point.y:,.0f}%</strong><br>',
    },
    series: [
      { name: `Average`, data: [ 45, 87, 34, 65, 43, 23, 56, 38 ], color: theme.palette.grey[400] },
      { name: `user 1`, data: [ 1, 2, 3, 4, 8, 3, 7, 4 ] },
      { name: `user 2`, data: [ 34, 65, 23, 76, 43, 56, 34, 45 ] },
      { name: `user 3`, data: [ 23, 45, 76, 34, 76, 43, 1, 45 ] },
      { name: `user 4`, data: [ 37, 34, 65, 23, 87, 56, 12, 4 ] },
      { name: `user 5`, data: [ 67, 43, 87, 23, 84, 29, 46, 37 ] },
      { name: `user 6`, data: [ 45, 67, 23, 76, 45, 87, 23, 87 ] },
      { name: `user 7`, data: [ 43, 76, 3, 8, 32, 76, 45, 76 ] },
      { name: `user 8`, data: [ 67, 12, 87, 56, 76, 34, 56, 23 ] },
      { name: `user 9`, data: [ 12, 65, 44, 67, 23, 8, 53, 3 ] },
      { name: `user 10`, data: [ 43, 23, 87, 34, 87, 4, 8, 23 ] },
    ],
  }

  return (
    <Paper>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </Paper>
  )
}

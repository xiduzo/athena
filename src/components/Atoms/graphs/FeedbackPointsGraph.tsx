import React, { FC } from 'react'
import { Paper } from '@material-ui/core'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IAgreement } from 'src/lib/types/agreement'
import { useTheme } from '@material-ui/core/styles'

interface IFeedbackPointsGraph {
  agreements?: IAgreement[]
}

export const FeedbackPointsGraph: FC<IFeedbackPointsGraph> = (props) => {
  const { agreements } = props

  const theme = useTheme()

  const options = {
    chart: { type: 'spline' },
    title: { text: 'Feedback' },
    xAxis: { categories: [] },
    yAxis: [
      {
        title: { text: 'Punten percentage' },
        minorGridLineWidth: 0,
        gridLineWidth: 1,
        alternateGridColor: null,
        min: 0,
        max: 100,
      },
      //{ title: { text: 'Totaal aantal punten'}, minorGridLineWidth: 0, gridLineWidth: 1, alternateGridColor: null, opposite: true}
    ],
    tooltip: {
      shared: true,
      pointFormat: '{series.name} <strong>{point.y:,.0f}%</strong><br>',
    },
    plotOptions: {
      spline: { lineWidth: 4, marker: { symbol: 'circle' } },
      series: {
        events: {
          legendItemClick: function() {
            return false
          },
        },
      },
    },
    // series: data.graphs_data.line,
    series: [
      { name: `test`, data: [ 1, 2, 3, 4, 8, 3, 7, 4 ], color: theme.palette.primary.main },
      { name: `Average`, data: [ 34, 65, 23, 76, 43, 56, 34, 45 ], color: theme.palette.grey[200] },
    ],
    exporting: { filename: 'export' },
    credits: { href: null, text: `[date]` },
  }

  return (
    <Paper>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </Paper>
  )
}

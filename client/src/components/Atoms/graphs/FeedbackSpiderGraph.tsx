import React, { FC } from 'react'
import { Paper } from '@material-ui/core'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IAgreement } from 'src/lib/interfaces'

interface IFeedbackSpiderGraph {
  agreements?: IAgreement[]
}

export const FeedbackSpiderGraph: FC<IFeedbackSpiderGraph> = (props) => {
  // const { agreements } = props

  const options = {
    chart: {
      polar: true,
      type: 'spline',
    },

    pane: {
      size: '80%',
      startAngle: 45,
    },

    xAxis: {
      categories: [ 'Development', 'Customer Support', 'Information Technology', 'Administration' ],
      tickmarkPlacement: 'on',
      lineWidth: 0,
    },

    yAxis: {
      gridLineInterpolation: 'polygon',
      visible: false,
      min: 0,
      max: 100,
    },

    tooltip: {
      shared: true,
      pointFormat: `<span style="color:{series.color}">{series.name}: <b>\${point.y:,.0f}</b><br/>`,
    },
    series: [
      {
        name: 'Allocated Budget',
        data: [ 60, 35, 17, 10 ],
        pointPlacement: 'on',
      },
      {
        name: 'Actual Spending',
        data: [ 42, 31, 26, 14 ],
        pointPlacement: 'on',
      },
      {
        name: 'Actual Spending',
        data: [ 12, 87, 45, 8 ],
        pointPlacement: 'on',
      },
    ],
  }

  return (
    <Paper>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Paper>
  )
}

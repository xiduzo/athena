import React, { FC, useMemo } from 'react'
import { Paper } from '@material-ui/core'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IAgreement } from 'src/lib/interfaces'
import { groupBy, getPointsEarned } from 'src/common/utils'
import { ILineData } from './feedbackPointsOptions'
import { useAuth } from 'src/common/providers'

interface IFeedbackSpiderGraph {
  agreements: IAgreement[]
}

export const FeedbackSpiderGraph: FC<IFeedbackSpiderGraph> = (props) => {
  const { agreements } = props
  const { userInfo } = useAuth()

  useMemo(() => {
    // console.log(agreements)
    const lineData: ILineData[] = []

    const usersFeedbackLine: number[][] = []

    const data: any[] = []

    const agreementTypes = groupBy(agreements, (a) => a.type)

    agreementTypes.forEach((agreements, type) => {
      agreements.forEach((agreement) => {
        const userFeedback = groupBy(agreement.feedback, (f) => f.to.id)
        userFeedback.forEach((feedback, userId) => {
          // console.log(feedback, userId, type)
          if (!usersFeedbackLine[userId]) usersFeedbackLine[userId] = []

          usersFeedbackLine[userId][type] = feedback.reduce(
            (curr, next) => (curr += getPointsEarned(agreement.points, next.rating)),
            0
          )
        })
      })
    })

    for (let user in usersFeedbackLine) {
      // console.log(user, usersFeedbackLine[user])
      lineData.push({
        id: user,
        name: user === userInfo.id ? userInfo.displayName : user,
        data: usersFeedbackLine[user],
        zones: [],
      })
    }

    console.log(lineData)

    // console.log(data)
  }, [agreements])

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
      categories: ['Development', 'Customer Support', 'Information Technology', 'Administration'],
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
        data: [60, 35, 17, 10],
        pointPlacement: 'on',
      },
      {
        name: 'Actual Spending',
        data: [42, 31, 26, 14],
        pointPlacement: 'on',
      },
      {
        name: 'Actual Spending',
        data: [12, 87, 45, 8],
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

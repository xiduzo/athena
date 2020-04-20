import React, { FC, useMemo, useState } from 'react'
import { Paper } from '@material-ui/core'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IAgreement } from 'src/lib/interfaces'
import {
  groupBy,
  getPointsEarned,
  getAverageLineData,
  getPercentage,
  getMaxPointsPerWeek,
} from 'src/common/utils'
import { ILineData } from './feedbackPointsOptions'
import { useAuth } from 'src/common/providers'
import { grey } from '@material-ui/core/colors'
import { AgreementType } from 'src/lib/enums'

interface IFeedbackSpiderGraph {
  agreements: IAgreement[]
}

export const FeedbackSpiderGraph: FC<IFeedbackSpiderGraph> = (props) => {
  const { agreements } = props
  const { userInfo } = useAuth()

  const [options, setOptions] = useState<any>()

  useMemo(() => {
    // console.log(agreements)
    const lineData: ILineData[] = []

    const usersFeedbackLine: number[][] = []

    const agreementTypes = groupBy(agreements, (a) => a.type)
    const typesUsed: AgreementType[] = []

    agreementTypes.forEach((agreements, type) => {
      typesUsed.push(type)

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

    // TODO get max points per category per week
    const maxPointsPerWeek = getMaxPointsPerWeek(agreements, lineData.length) * 4 // TODO max week of tribe
    const averageScores = getAverageLineData(lineData).map((x) => {
      if (x < 0) return null
      return getPercentage(x, maxPointsPerWeek)
    })

    console.log(typesUsed)

    const graphOptions = {
      chart: {
        polar: true,
        type: 'spline',
      },

      pane: {
        size: '80%',
        startAngle: 45,
      },

      xAxis: {
        categories: typesUsed.map((type) => AgreementType[type]),
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
        pointFormat: '{series.name} <strong>{point.y:,.0f}%</strong><br>',
      },
      series: [
        {
          name: 'Average',
          data: averageScores.filter((x) => x !== null),
          color: grey[600],
          pointPlacement: 'on',
        },
        ...lineData?.map((line) => {
          return {
            name: line.name,
            zones: line.zones,
            data: line.data
              .filter((x) => x !== null)
              .map((x) => getPercentage(x, maxPointsPerWeek)),
          }
        }),
      ],
    }

    setOptions(graphOptions)
  }, [agreements])

  return (
    <Paper>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Paper>
  )
}

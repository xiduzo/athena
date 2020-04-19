import { Paper } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { FC, useMemo, useState } from 'react'
import { useAuth } from 'src/common/providers'
import {
  getUsersLineData,
  sumArrays,
  getMaxPointsPerWeek,
  getAverageLineData,
} from 'src/common/utils'
import { IAgreement } from 'src/lib/interfaces'
import { grey } from '@material-ui/core/colors'
import regression from 'regression'

interface IFeedbackPointsGraph {
  agreements: IAgreement[]
  showAll?: boolean
}

interface ILineData {
  id: string
  name: string
  data: number[]
  zones: unknown[]
}

export const FeedbackPointsGraph: FC<IFeedbackPointsGraph> = (props) => {
  const { agreements, showAll = true } = props
  const { userInfo } = useAuth()

  const [lineData, setLineData] = useState<ILineData[]>([])

  useMemo(() => {
    const usersLineData = getUsersLineData(agreements)

    const normalizedData: ILineData[] = []

    for (let user in usersLineData) {
      const userData = usersLineData[user]
      const minPredictionLength = 4

      const dataLength = userData.length
      // Add some basic prediction
      if (dataLength >= minPredictionLength) {
        const regressionLine = regression.exponential(
          userData
            // Predict based on the last minPredictionLength
            .slice(dataLength - minPredictionLength, dataLength)
            .map((val, index) => [index, val])
        )
        // TODO: make this different than rest off line
        userData.push(regressionLine.predict(dataLength)[1])
      }

      normalizedData.push({
        id: user,
        name: user === userInfo.id ? userInfo.displayName : user,
        data: usersLineData[user],
        zones: [
          {
            value: dataLength - 1,
            dashStyle: 'Solid',
          },
        ],
      })
    }

    setLineData(normalizedData)
  }, [agreements])

  const asPercentage = (x: number, max: number) => (x * 100) / max

  const maxPointsPerWeek = getMaxPointsPerWeek(agreements, lineData.length)
  const averageScores = getAverageLineData(lineData).map((x) => asPercentage(x, maxPointsPerWeek))

  // TODO: : Highcharts.Options
  // const options: Highcharts.Options = {
  const options = {
    title: {
      text: 'Feedback',
    },
    xAxis: {
      visible: false,
    },
    yAxis: [
      {
        visible: false,
        // title: { text: '%' },
        min: 0,
        max: 100,
      },
    ],
    tooltip: {
      headerFormat: `Sprint {point.key}<br/>`,
      pointFormat: '{series.name} <strong>{point.y:,.0f}%</strong><br>',
    },
    series: [
      {
        name: 'Average',
        color: grey[600],
        data: averageScores,
      },
      ...lineData
        ?.filter((line) => showAll || line.id === userInfo.id)
        ?.map((line) => ({
          name: line.name,
          zoneAxis: 'x',
          zones: line.zones,
          dashStyle: 'Dot',
          data: [...line.data.map((x) => asPercentage(x, maxPointsPerWeek))],
        })),
    ],
  }

  return (
    <Paper>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </Paper>
  )
}

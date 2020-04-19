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

interface IFeedbackPointsGraph {
  agreements: IAgreement[]
  showSelf?: boolean
}

export const FeedbackPointsGraph: FC<IFeedbackPointsGraph> = (props) => {
  const { agreements, showSelf = true } = props
  const { userInfo } = useAuth()

  const [lineData, setLineData] = useState<{ id: string; data: number[] }[]>([])

  useMemo(() => {
    const usersLineData = getUsersLineData(agreements)

    const normalizedData: { id: string; data: number[] }[] = []

    for (let user in usersLineData) {
      normalizedData.push({
        id: user,
        data: usersLineData[user],
      })
    }

    setLineData(normalizedData)
  }, [agreements])

  const maxPointsPerWeek = getMaxPointsPerWeek(agreements, lineData.length)
  const options = {
    title: { text: 'Feedback' },
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
      pointFormat: '{series.name} <strong>{point.y:,.0f}%</strong><br>',
    },
    series: [
      {
        name: 'Average',
        color: grey[600],
        data: getAverageLineData(lineData).map((x) => (x * 100) / maxPointsPerWeek),
      },
      ...lineData
        // ?.filter((user) => user.id === userInfo.id)
        ?.map((user) => ({
          name: user.id,
          data: user.data.map((x) => (x * 100) / maxPointsPerWeek),
        })),
    ],
  }

  return (
    <Paper>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </Paper>
  )
}

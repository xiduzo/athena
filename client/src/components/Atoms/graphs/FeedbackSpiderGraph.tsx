import { Paper } from '@material-ui/core'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { FC, useMemo, useState } from 'react'
import { useAuth } from 'src/common/providers'
import {
  asPercentage,
  getAverageLineData,
  getMaxPointsPerWeek,
  getUsersSpiderData,
  normalizeArray,
} from 'src/common/utils'
import { IAgreement } from 'src/lib/interfaces'
import { ILineData } from './feedbackPointsOptions'
import { getFeedbackSpiderOptions } from './feedbackSpiderOptions'

interface IFeedbackSpiderGraph {
  agreements: IAgreement[]
}

export const FeedbackSpiderGraph: FC<IFeedbackSpiderGraph> = (props) => {
  const { agreements } = props
  const { userInfo } = useAuth()

  const [options, setOptions] = useState<any>()

  useMemo(() => {
    const lineData: ILineData[] = []

    const data = getUsersSpiderData(agreements)
    const { usersFeedbackLine, typesUsed } = data

    for (let user in usersFeedbackLine) {
      // Normalize the `empty` indexes to `null`
      const normalizedArray = normalizeArray(usersFeedbackLine[user])

      lineData.push({
        id: user,
        name: user === userInfo.id ? userInfo.displayName : user,
        data: normalizedArray,
        zones: [],
      })
    }

    // TODO get max points per category per week
    const maxPointsPerWeek = getMaxPointsPerWeek(agreements, lineData.length) * 10 // TODO max week of tribe
    const averageScores: number[] = getAverageLineData(lineData).map((x) =>
      asPercentage(x, maxPointsPerWeek)
    )

    const graphOptions = getFeedbackSpiderOptions(
      typesUsed,
      averageScores,
      lineData,
      maxPointsPerWeek
    )

    setOptions(graphOptions)
  }, [agreements, userInfo])

  return (
    <Paper>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Paper>
  )
}

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
  showAll?: boolean
}

export const FeedbackSpiderGraph: FC<IFeedbackSpiderGraph> = (props) => {
  const { agreements, showAll = true } = props

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

    // TODO check test max points per week
    const maxPointsPerWeek = [
      ...typesUsed.map((type) => {
        console.log(
          type,
          agreements.filter((a) => a.type === type)
        )
        return (
          getMaxPointsPerWeek(
            agreements.filter((a) => a.type === type),
            lineData.length
          ) * 10
        ) // Todo get max week of tribe
      }),
    ]
    console.log(lineData, maxPointsPerWeek)
    const averageScores: number[] = getAverageLineData(lineData).map((x, index) =>
      asPercentage(x, maxPointsPerWeek[index])
    )

    const graphOptions = getFeedbackSpiderOptions(
      typesUsed,
      averageScores,
      lineData,
      maxPointsPerWeek,
      showAll,
      userInfo
    )

    setOptions(graphOptions)
  }, [agreements, userInfo, showAll])

  return (
    <Paper>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Paper>
  )
}

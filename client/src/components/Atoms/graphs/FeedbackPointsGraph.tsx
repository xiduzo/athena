import { Paper } from '@material-ui/core'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { FC, useMemo, useState } from 'react'
import regression from 'regression'
import { useAuth } from 'src/common/providers'
import {
  getAverageLineData,
  getMaxPointsPerWeek,
  getPercentage,
  getUsersLineData,
} from 'src/common/utils'
import { IAgreement } from 'src/lib/interfaces'
import { getFeedbackPointsOptions, ILineData } from './feedbackPointsOptions'

interface IFeedbackPointsGraph {
  agreements: IAgreement[]
  showAll?: boolean
}

export const FeedbackPointsGraph: FC<IFeedbackPointsGraph> = (props) => {
  const { agreements, showAll = true } = props
  const { userInfo } = useAuth()

  const [options, setOptions] = useState<any>()

  useMemo(() => {
    const usersLineData = getUsersLineData(agreements)

    const lineData: ILineData[] = []

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

      lineData.push({
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

    const maxPointsPerWeek = getMaxPointsPerWeek(agreements, lineData.length)
    const averageScores = getAverageLineData(lineData).map((x) =>
      getPercentage(x, maxPointsPerWeek)
    )

    // const options: Highcharts.Options = {
    const graphOptions = getFeedbackPointsOptions(
      averageScores,
      lineData,
      showAll,
      userInfo,
      maxPointsPerWeek
    )

    setOptions(graphOptions)
  }, [agreements, userInfo, showAll])

  return (
    <Paper>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </Paper>
  )
}

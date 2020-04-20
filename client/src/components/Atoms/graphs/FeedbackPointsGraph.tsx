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
    const minLengthNeededForPrediction = 2
    const maxPredictionLookBack = 4

    const usersLineData = getUsersLineData(agreements)

    const lineData: ILineData[] = []

    for (let user in usersLineData) {
      const userData = usersLineData[user]

      const dataLength = userData.length
      // Add some basic prediction
      if (dataLength >= minLengthNeededForPrediction) {
        const predictionSliceSize = Math.min(maxPredictionLookBack, dataLength)
        const regressionLine = regression.linear(
          userData
            // Predict based on the last minPredictionLength
            .slice(dataLength - predictionSliceSize, dataLength)
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
            value: dataLength >= minLengthNeededForPrediction ? dataLength - 1 : dataLength,
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
      maxPointsPerWeek,
      minLengthNeededForPrediction
    )

    setOptions(graphOptions)
  }, [agreements, userInfo, showAll])

  return (
    <Paper>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </Paper>
  )
}

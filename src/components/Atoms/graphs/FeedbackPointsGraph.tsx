import { Paper } from '@material-ui/core'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { FC, useMemo, useState } from 'react'
import regression from 'regression'
import { useAuth } from 'src/common/providers'
import {
  asPercentage,
  getAverageLineData,
  getFeedbackByUser,
  getMaxPointsPerWeek,
  groupBy,
  sumArrays,
} from 'src/common/utils'
import { Agreement } from 'src/lib/interfaces'
import { getFeedbackPointsOptions, ILineData } from './feedbackPointsOptions'

interface IFeedbackPointsGraph {
  agreements: Agreement[]
  showAll?: boolean
}

export const FeedbackPointsGraph: FC<IFeedbackPointsGraph> = (props) => {
  const { agreements, showAll = true } = props
  const { userInfo } = useAuth()

  const [options, setOptions] = useState<any>()

  useMemo(() => {
    const minLengthNeededForPrediction = 2
    const maxPredictionLookBack = 4

    const lineData: ILineData[] = []

    const data = Array.from(getFeedbackByUser(agreements).entries()).map(([userId, feedback]) => ({
      userId: userId,
      feedbackByWeek: groupBy(feedback, (f) => f.weekStart.formatted),
    }))

    // todo: this foreach should be put into util function
    data.forEach((line) => {
      const feedbackArray = Array.from(line.feedbackByWeek.entries())

      const data = feedbackArray.reduce((total, [weekNum, feedback]) => {
        total[weekNum] = feedback.reduce((sum, f) => sum + f.rating * f.agreement.points, 0)
        return total
      }, [] as number[])

      const normalizedData = sumArrays(
        Array.from({ length: data.length }).map((x) => 0),
        data
      )
      console.log(normalizedData)
      if (normalizedData.length >= minLengthNeededForPrediction) {
        const predictionSliceSize = Math.min(maxPredictionLookBack, normalizedData.length)
        const regressionLine = regression.linear(
          normalizedData
            .slice(normalizedData.length - predictionSliceSize, normalizedData.length)
            .map((val, index) => [index, val])
        )
        const prediction = regressionLine.predict(normalizedData.length)
        normalizedData.push(prediction[1])
      }

      lineData.push({
        id: line.userId,
        name: line.userId === userInfo.id ? userInfo.displayName : line.userId,
        data: normalizedData,
        zones: [
          {
            value:
              normalizedData.length >= minLengthNeededForPrediction
                ? normalizedData.length - 2
                : normalizedData.length,
            dashStyle: 'Solid',
          },
        ],
      })
    })

    const maxPointsPerWeek = getMaxPointsPerWeek(agreements, lineData.length)
    const averageScores = getAverageLineData(lineData).map((x) => asPercentage(x, maxPointsPerWeek))

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

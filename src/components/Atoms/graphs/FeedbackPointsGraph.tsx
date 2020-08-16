import { Paper } from '@material-ui/core'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { FC, useMemo, useState } from 'react'
import regression from 'regression'
import { useAuth } from 'src/common/providers'
import {
  getAverageLineData,
  getMaxPointsPerWeek,
  asPercentage,
  getUsersLineData,
  sumArrays,
} from 'src/common/utils'
import { IAgreement } from 'src/lib/interfaces'
import { getFeedbackPointsOptions, ILineData } from './feedbackPointsOptions'
import { getWeek } from 'src/common/utils/helpers/getWeek'

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

    console.log(usersLineData)
    const dataSize = usersLineData.size
    for (var userId in usersLineData) {
      console.log(userId, usersLineData[userId])
      const _lineData = usersLineData[userId] as number[]

      if (dataSize >= minLengthNeededForPrediction) {
        const predictionSliceSize = Math.min(maxPredictionLookBack, dataSize)
        const regressionLine = regression.linear(
          _lineData
            .slice(dataSize - predictionSliceSize, dataSize)
            .map((val, index) => [index, val])
        )

        _lineData.push(regressionLine.predict(dataSize)[1])
      }

      lineData.push({
        id: userId,
        name: userId === userInfo.id ? userInfo.displayName : userId,
        data: sumArrays(Array.from({ length: 35 }).fill(0) as number[], _lineData),
        zones: [
          {
            value: dataSize >= minLengthNeededForPrediction ? dataSize - 1 : dataSize,
            dashStyle: 'Solid',
          },
        ],
      })
    }

    console.log(lineData)

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

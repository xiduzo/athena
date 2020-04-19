import { grey } from '@material-ui/core/colors'
import { getPercentage } from 'src/common/utils'

export interface ILineData {
  id: string
  name: string
  data: number[]
  zones: unknown[]
}

export const getFeedbackPointsOptions = (
  averageScores: number[],
  lineData: ILineData[],
  showAll: boolean,
  userInfo: any,
  maxPointsPerWeek: number
) => {
  return {
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
    plotOptions: {
      series: {
        zoneAxis: 'x',
        dashStyle: 'Dot',
      },
    },
    series: [
      {
        name: 'Average',
        color: grey[600],
        zones: [
          {
            value: averageScores.length >= 4 ? averageScores.length - 2 : averageScores.length,
            dashStyle: 'Solid',
          },
        ],
        data: averageScores,
      },
      ...lineData
        ?.filter((line) => showAll || (userInfo.id && line.id === userInfo.id))
        ?.map((line) => ({
          name: showAll ? line.name : `You`,
          zones: line.zones,
          data: [...line.data.map((x) => getPercentage(x, maxPointsPerWeek))],
        })),
    ],
  }
}

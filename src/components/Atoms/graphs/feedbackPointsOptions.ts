import { grey } from '@material-ui/core/colors'
import { asPercentage } from 'src/common/utils'

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
  maxPointsPerWeek: number,
  minLengthNeededForPrediction: number
) => {
  const hasPrediction = averageScores.length >= minLengthNeededForPrediction
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
      formatter: function (): any {
        let header = `<strong>Sprint ${(this as any).x + 1}</strong>`

        if (hasPrediction && (this as any).x >= averageScores.length - 1) {
          header += ` <italic>(prediction)<italic>`
        }

        return (this as any).points.reduce((curr: string, point: any) => {
          curr += `<br/>`
          curr += `${point.series.name}: `
          curr += `<strong>${(point.y as number).toFixed(2)}%</strong>`

          return curr
        }, header)
      },
      shared: true,
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
            value: hasPrediction ? averageScores.length - 2 : averageScores.length,
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
          data: line.data.map((x) => asPercentage(x ?? 0, maxPointsPerWeek)),
        })),
    ],
  }
}

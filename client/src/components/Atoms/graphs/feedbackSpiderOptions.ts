import { AgreementType } from 'src/lib/enums'
import { ILineData } from './feedbackPointsOptions'
import { grey } from '@material-ui/core/colors'
import { asPercentage } from 'src/common/utils'

export const getFeedbackSpiderOptions = (
  typesUsed: AgreementType[],
  averageScores: number[],
  lineData: ILineData[],
  maxPointsPerWeek: number[],
  showAll: boolean,
  userInfo: any
) => {
  return {
    chart: {
      polar: true,
      type: 'spline',
    },

    pane: {
      size: '90%',
    },

    xAxis: {
      categories: typesUsed,
      labels: {
        formatter: function (): any {
          const type = AgreementType[(this as any).value]
          return type
        },
      },
      tickmarkPlacement: 'on',
      lineWidth: 0,
    },

    yAxis: {
      gridLineInterpolation: 'polygon',
      visible: false,
      min: 0,
      max: 100,
    },

    tooltip: {
      shared: true,
      headerFormat: '',
      pointFormat: '{series.name} <strong>{point.y:,.0f}%</strong><br>',
    },
    series: [
      {
        name: 'Average',
        data: averageScores,
        color: grey[600],
        pointPlacement: 'on',
      },
      ...lineData
        ?.filter((line) => showAll || (userInfo.id && line.id === userInfo.id))
        ?.map((line) => {
          return {
            name: showAll ? line.name : `You`,
            zones: line.zones,
            data: line.data.map((x, index) => asPercentage(x, maxPointsPerWeek[index])),
          }
        }),
    ],
  }
}

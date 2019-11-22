import IGuid from '../IGuid'
import { AgreementType } from 'src/lib/enums'

export interface IAgreement extends IGuid {
  type: AgreementType
  text: string
  points: number
}

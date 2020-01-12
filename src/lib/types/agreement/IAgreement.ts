import IGuid from '../IGuid'
import { AgreementType } from 'src/lib/enums'

export interface ITranslation {
  language: string
  text: string
}

export interface IAgreement extends IGuid {
  type: AgreementType
  translations: ITranslation[]
  points: number
}

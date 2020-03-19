import { AgreementType } from 'src/lib/enums'
import { IEntityBase } from '../IEntityBase'
import { IFeedback } from './IFeedback'

export interface ITranslation extends IEntityBase {
  language: string
  text: string
}

export interface IAgreement extends IEntityBase {
  type: AgreementType
  isBase: boolean
  points: number
  translations: ITranslation[]
  feedback: IFeedback[]
}

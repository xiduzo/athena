import { AgreementType } from 'src/lib/enums'
import { IEntityBase } from '../IEntityBase'

export interface ITranslation {
  language: string
  text: string
}

export interface IAgreement extends IEntityBase {
  type: AgreementType
  translations: ITranslation[]
  points: number
}

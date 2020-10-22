import { AgreementType } from 'src/lib/enums'
import { EntityBase } from './EntityBase'
import { Feedback } from './Feedback'

export interface Translation extends EntityBase {
  language: string
  text: string
}

export interface Agreement extends EntityBase {
  type: AgreementType
  isBase: boolean
  points: number
  translations: Translation[]
  feedback: Feedback[]
  parent?: Agreement
  children?: Agreement[]
}

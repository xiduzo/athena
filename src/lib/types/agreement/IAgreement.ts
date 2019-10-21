import IGuid from '../IGuid'

export enum AgreementType {
  ATTITUDE = 0,
  FUNCTIONING_WITHING_TEAM = 1,
  KNOWLEDGE_DEVELOPMENT = 2,
  ACCOUNTABILITY = 3,
}

export interface IAgreement extends IGuid {
  type: AgreementType
  text: string
  points: number
}

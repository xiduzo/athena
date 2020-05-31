import { IUser } from './IUser'
import { IAgreement } from './IAgreement'
import { IEntityBase } from './IEntityBase'

export interface IFeedback extends IEntityBase {
  from: IUser
  to: IUser
  rating: number
  agreement: IAgreement
  weekNum: number
}

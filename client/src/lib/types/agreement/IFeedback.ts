import { IUser } from '../user'
import { IAgreement } from '.'
import { IEntityBase } from '../IEntityBase'

export interface IFeedback extends IEntityBase {
  from: IUser
  to: IUser
  rating: number
  agreement: string
}

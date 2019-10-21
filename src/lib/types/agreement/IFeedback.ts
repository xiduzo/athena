import IGuid from '../IGuid'
import { IAgreement } from '.'
import { IUser } from '../user'

export interface IFeedback extends IGuid {
  from: IUser
  to: IUser
  rating: number
  agreement: IAgreement
}

import IGuid from '../IGuid'
import { IUser } from '../user'
import { IAgreement } from '.'

export interface IFeedback extends IGuid {
  from: IUser
  to: IUser
  rating: number
  agreement: IAgreement
}

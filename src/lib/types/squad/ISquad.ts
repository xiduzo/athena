import IGuid from '../IGuid'
import { IUser } from '../user'
import { IAgreement } from '../agreement'

export interface ISquad extends IGuid {
  trello_id?: number
  agreements: IAgreement[]
  members: IUser[]
  operation_duration: number // in weeks
}

import { IUser } from '../user'
import { IAgreement } from '../agreement'

export interface ISquad {
  guid: string
  name: string
  trello_id?: number
  agreements?: IAgreement[]
  members?: IUser[]
  operation_duration?: number // in weeks
}

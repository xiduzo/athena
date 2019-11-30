import { IUser } from '../user'
import { IAgreement } from '../agreement'

export interface ISquad {
  guid: string
  name: string
  trello_board?: string
  trello_done_list?: string

  agreements?: IAgreement[]
  members?: IUser[]
}

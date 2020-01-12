import { IUser } from '../user'
import { IAgreement } from '../agreement'

interface ITrelloSettings {
  board: string
  doneList: string
}

export interface ISquad {
  id: string
  name: string
  trello: ITrelloSettings

  agreements?: IAgreement[]
  members?: IUser[]
}

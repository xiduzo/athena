import { EntityBase } from './EntityBase'
import { Agreement } from './Agreement'
import { IUser } from './User'

interface ITrelloSettings {
  board: string
  doneList: string
}

export interface ISquad extends EntityBase {
  name: string
  agreements: Agreement[]
  members: IUser[]
}

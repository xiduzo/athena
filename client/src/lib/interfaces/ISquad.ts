import { IEntityBase } from './IEntityBase'
import { IAgreement } from './IAgreement'
import { IUser } from './IUser'

interface ITrelloSettings {
  board: string
  doneList: string
}

export interface ISquad extends IEntityBase {
  name: string
  agreements: IAgreement[]
  members: IUser[]
}

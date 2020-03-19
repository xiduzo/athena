import { IEntityBase } from './IEntityBase'
import { IAgreement } from './IAgreement'

interface ITrelloSettings {
  board: string
  doneList: string
}

export interface ISquad extends IEntityBase {
  name: string
  agreements: IAgreement[]
  members: any[]
}

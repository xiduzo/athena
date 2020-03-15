import { IEntityBase } from '../IEntityBase'
import { IAgreement } from '../agreement'

interface ITrelloSettings {
  board: string
  doneList: string
}

export interface ISquad extends IEntityBase {
  name: string
  agreements: IAgreement[]
  members: any[]
}

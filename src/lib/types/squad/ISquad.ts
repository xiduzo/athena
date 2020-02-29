import { IEntityBase } from '../IEntityBase'

interface ITrelloSettings {
  board: string
  doneList: string
}

export interface ISquad extends IEntityBase {
  name: string
  trello: ITrelloSettings

  // TODO: get this from seperate DB so we can have agreements only applicable for this squad
  // this way we can keep agreements even if the main ones are removed
  agreements: string[]
  feedback: string[]
  members: string[]
}

import { IEntityBase } from './IEntityBase'
import { ISquad } from './ISquad'

export interface ITribe extends IEntityBase {
  name: string
  squads: ISquad[]
  leaders: any[]
}

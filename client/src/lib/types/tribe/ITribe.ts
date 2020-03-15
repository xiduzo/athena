import { IEntityBase } from '../IEntityBase'
import { ISquad } from '../squad'

export interface ITribe extends IEntityBase {
  name: string
  squads: ISquad[]
  leaders: any[]
}

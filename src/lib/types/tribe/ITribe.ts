import { IEntityBase } from '../IEntityBase'

export interface ITribe extends IEntityBase {
  leaders: string[]
  squads: string[]
  name: string
}

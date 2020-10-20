import { neo4jDateObject } from 'src/common/utils'
import { IEntityBase } from './IEntityBase'
import { ISquad } from './ISquad'

export interface ITribe extends IEntityBase {
  name: string
  squads: ISquad[]
  leaders: any[]
  start: neo4jDateObject
  end: neo4jDateObject
}

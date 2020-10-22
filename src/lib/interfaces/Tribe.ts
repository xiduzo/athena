import { neo4jDateObject } from 'src/common/utils'
import { EntityBase } from './EntityBase'
import { ISquad } from './Squad'

export interface ITribe extends EntityBase {
  name: string
  squads: ISquad[]
  leaders: any[]
  start: neo4jDateObject
  end: neo4jDateObject
}

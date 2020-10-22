import { IUser } from './User'
import { Agreement } from './Agreement'
import { EntityBase } from './EntityBase'
import { neo4jDateObject } from 'src/common/utils'

export interface Feedback extends EntityBase {
  from: IUser
  to: IUser
  rating: number
  agreement: Agreement
  weekStart: neo4jDateObject
}

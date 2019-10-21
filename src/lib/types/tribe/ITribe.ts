import IGuid from '../IGuid'
import { ILecturer } from '../user'
import { ISquad } from '../squad'

export interface ITribe extends IGuid {
  guid: string
  leader: ILecturer
  squads: ISquad[]
}

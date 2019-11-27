import { ILecturer } from '../user'
import { ISquad } from '../squad'

export interface ITribe {
  guid: string
  leader: ILecturer | ILecturer[]
  squads: ISquad[]
  name: string
}

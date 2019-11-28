import { ISquad } from '../squad'
import { IUser } from '../user'

export interface ITribe {
  guid: string
  leaders: IUser[]
  squads: ISquad[]
  name: string
}

import { ISquad } from '../squad'
import { IUser } from '../user'

export interface ITribe {
  id: string
  leaders: IUser[]
  squads: string[]
  name: string
}

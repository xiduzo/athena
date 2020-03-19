import { IUser } from 'src/lib/interfaces'

export interface IUserCard {
  user: IUser
  onClick?: () => void
}

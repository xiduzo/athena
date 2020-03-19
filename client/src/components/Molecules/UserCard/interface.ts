import { IUser } from 'src/lib/interfaces/user'

export interface IUserCard {
  user: IUser
  onClick?: () => void
}

import { IUser } from 'src/lib/types/user'

export interface IUserCard {
  user: IUser
  onClick?: () => void
}

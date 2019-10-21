import { IUser } from 'src/lib/types/user'

export interface IUserState {
  is_logged_in: boolean
  user: IUser | null
}

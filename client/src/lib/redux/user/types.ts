import { UserActions } from './actions'
import { IUser } from 'src/lib/interfaces/user'

interface UserLoginAction {
  type: UserActions.userLogin
  payload: IUser
}

export type UserActionTypes = UserLoginAction

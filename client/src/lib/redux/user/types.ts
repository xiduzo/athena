import { UserActions } from './actions'
import { IUser } from 'src/lib/interfaces'

interface UserLoginAction {
  type: UserActions.userLogin
  payload: IUser
}

export type UserActionTypes = UserLoginAction

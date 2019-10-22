import * as actions from './actions'
import { IUser } from 'src/lib/types/user'

interface UserLoginAction {
  type: typeof actions.USER_LOGIN
  payload: IUser
}

export type UserActionTypes = UserLoginAction

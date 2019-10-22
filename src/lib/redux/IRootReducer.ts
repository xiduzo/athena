import { IUserState } from './user/IUserState'
import { IGlobalState } from './global/IGlobalState'

export interface IRootReducer {
  user: IUserState
  global: IGlobalState
}

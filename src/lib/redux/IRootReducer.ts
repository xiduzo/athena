import { IUserState } from './user/IUserState'
import { IGlobalState } from './global/IGlobalState'
import { IAgreementsState } from './agreements/agreementsReducer'

export interface IRootReducer {
  user: IUserState
  global: IGlobalState
  agreements: IAgreementsState
}

export interface IAction {
  type: string
  payload: any
}

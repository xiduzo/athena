import { IUserState } from './user/IUserState'
import { IGlobalState } from './global/IGlobalState'
import { IAgreementsState } from './agreements/agreementsReducer'
import { ITribesState } from './tribes/tribesReducer'
import { ISquadsState } from './squads/squadsReducer'

export interface IRootReducer {
  user: IUserState
  global: IGlobalState
  agreements: IAgreementsState
  tribes: ITribesState
  squads: ISquadsState
}

export interface IAction {
  type: string
  payload: any
}

export enum Status {
  loading = 0,
  success = 1,
  error = 2,
}

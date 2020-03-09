import { Dispatch } from 'react'
import { combineReducers } from 'redux'
import { agreementsReducer, IAgreementsState } from './agreementsReducer'
import { globalReducer, IGlobalState } from './globalReducer'
import { ISquadsState, squadsReducer } from './squadsReducer'
import { ITribesState, tribesReducer } from './tribesReducer'
import { userReducer } from './user'
import { IUserState } from './user/IUserState'

export interface IRootReducer {
  users: IUserState
  global: IGlobalState
  agreements: IAgreementsState
  tribes: ITribesState
  squads: ISquadsState
}

export interface IAction {
  type: string
  payload: any
}

export type DispatchAction = Dispatch<((dispatch: Dispatch<IAction>) => void) | IAction>

const reducers = {
  users: userReducer,
  global: globalReducer,
  agreements: agreementsReducer,
  tribes: tribesReducer,
  squads: squadsReducer,
}

export const rootReducer = combineReducers<IRootReducer>(reducers)

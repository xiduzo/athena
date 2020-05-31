import { Dispatch } from 'react'
import { combineReducers } from 'redux'
import { globalReducer, IGlobalState } from './globalReducer'

export interface IRootReducer {
  global: IGlobalState
}

export interface IAction {
  type: string
  payload: any
}

export type DispatchAction = Dispatch<((dispatch: Dispatch<IAction>) => void) | IAction>

const reducers = {
  global: globalReducer,
}

export const rootReducer = combineReducers<IRootReducer>(reducers)

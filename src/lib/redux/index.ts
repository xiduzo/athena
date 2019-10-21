import { combineReducers } from 'redux'
import { userReducer } from './user'
import { IUserState } from './user/IUserState'
export * from './middleware'

export interface IRootReducer {
  user: IUserState
}

export const rootReducer = combineReducers<IRootReducer>({ user: userReducer })

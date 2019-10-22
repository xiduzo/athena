import { IRootReducer } from './IRootReducer'
import { userReducer } from './user'
import { globalReducer } from './global'
import { combineReducers } from 'redux'

const initial_state = {
  user: userReducer,
  global: globalReducer,
}

export const rootReducer = combineReducers<IRootReducer>(initial_state)

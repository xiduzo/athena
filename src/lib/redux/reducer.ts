import { IRootReducer } from './IRootReducer'
import { userReducer } from './user'
import { globalReducer } from './global'
import { agreementsReducer } from './agreements/agreementsReducer'
import { combineReducers } from 'redux'

const initial_state = {
  user: userReducer,
  global: globalReducer,
  agreements: agreementsReducer,
}

export const rootReducer = combineReducers<IRootReducer>(initial_state)

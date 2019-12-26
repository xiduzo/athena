import { IRootReducer } from './IRootReducer'
import { userReducer } from './user'
import { globalReducer } from './global'
import { agreementsReducer } from './agreements/agreementsReducer'
import { combineReducers } from 'redux'
import { tribesReducer } from './tribes/tribesReducer'

const initial_state = {
  user: userReducer,
  global: globalReducer,
  agreements: agreementsReducer,
  tribes: tribesReducer,
}

export const rootReducer = combineReducers<IRootReducer>(initial_state)

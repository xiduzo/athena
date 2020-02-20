import { IRootReducer } from './IRootReducer'
import { userReducer } from './user'
import { globalReducer } from './global'
import { agreementsReducer } from './agreements/agreementsReducer'
import { combineReducers } from 'redux'
import { tribesReducer } from './tribes/tribesReducer'
import { squadsReducer } from './squads/squadsReducer'

const initial_state = {
  users: userReducer,
  global: globalReducer,
  agreements: agreementsReducer,
  tribes: tribesReducer,
  squads: squadsReducer,
}

export const rootReducer = combineReducers<IRootReducer>(initial_state)

import * as actions from './actions'
import { IGlobalState } from './IGlobalState'
import { GlobalActionTypes } from './types'

const initial_state: IGlobalState = {
  is_logged_in: false,
}

export const globalReducer = (
  state: IGlobalState = initial_state,
  action: GlobalActionTypes
): IGlobalState => {
  switch (action.type) {
    case actions.SELECT_SQUAD:
      return {
        ...state,
        selectedSquad: action.payload,
      }
    default:
      return state
  }
}

import * as actions from './actions'
import { IGlobalState } from './IGlobalState'
import { GlobalActionTypes } from './types'

const initial_state: IGlobalState = {}

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

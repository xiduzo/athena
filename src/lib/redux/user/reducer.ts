import * as actions from './actions'
import { IUserState } from './IUserState'
import { UserActionTypes } from './types'

const initial_state: IUserState = {}

export const userReducer = (
  state: IUserState = initial_state,
  action: UserActionTypes
): IUserState => {
  switch (action.type) {
    case actions.USER_LOGIN:
      return state
    default:
      return state
  }
}

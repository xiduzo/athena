import * as actions from './actions'
import { IUserState } from './IUserState'

const initial_state: IUserState = {
  is_logged_in: false,
  user: null,
}

export const userReducer = (state: IUserState = initial_state, action: any): any => {
  switch (action.type) {
    case actions.USER_LOGIN:
      return state
    default:
      return state
  }
}

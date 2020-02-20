import { UserActions } from './actions'
import { IUserState } from './IUserState'
import { UserActionTypes } from './types'

const initial_state: IUserState = {
  items: [],
}

export const userReducer = (state: IUserState = initial_state, action: UserActionTypes): IUserState => {
  switch (action.type) {
    case UserActions.userLogin:
      const { payload } = action
      console.log(payload)
      return state
    default:
      return state
  }
}

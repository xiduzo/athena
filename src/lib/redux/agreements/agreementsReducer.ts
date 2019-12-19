import { IAgreement } from 'src/lib/types/agreement'

export const SET_AGREEMENTS = 'SET_AGREEMENTS'

export interface IAgreementsState {
  status: string
  items: IAgreement[]
}

export interface IAction {
  type: string
  payload: any
}

const initial_state: IAgreementsState = {
  status: 'loading',
  items: [],
}

export const agreementsReducer = (
  state: IAgreementsState = initial_state,
  action: IAction
): IAgreementsState => {
  switch (action.type) {
    case SET_AGREEMENTS:
      return {
        ...state,
        items: action.payload,
      }
    default:
      return state
  }
}

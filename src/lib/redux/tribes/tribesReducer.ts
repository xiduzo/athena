import { ITribe } from 'src/lib/types/tribe'
import { IAction, Status } from '../IRootReducer'

export enum TribeActions {
  setTribes = 'setTribes',
}

export interface ITribesState {
  status: Status
  items: ITribe[]
}

const initial_state: ITribesState = {
  status: Status.loading,
  items: [],
}

export const tribesReducer = (state: ITribesState = initial_state, action: IAction): ITribesState => {
  switch (action.type) {
    case TribeActions.setTribes:
      return {
        ...state,
        status: Status.success,
        items: action.payload,
      }
    default:
      return state
  }
}

import { ITribe } from 'src/lib/types/tribe'
import { IAction, Status } from '../IRootReducer'

export enum TribeActions {
  setTribes = 'setTribes',
  setTribe = 'setTribe',
  updateTribe = 'updateTribe',
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
  const { type, payload } = action
  switch (type) {
    case TribeActions.setTribes:
      return {
        ...state,
        status: Status.success,
        items: payload,
      }
    case TribeActions.setTribe:
      return {
        ...state,
        status: Status.success,

        items: state.items.length
          ? state.items.map((item) => {
              if (item.id === payload.id) return payload as ITribe
              return item
            })
          : [ payload ],
      }
    default:
      return state
  }
}

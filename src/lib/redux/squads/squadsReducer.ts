import { IAction, Status } from '../IRootReducer'
import { ISquad } from 'src/lib/types/squad'

export enum SquadActions {
  setSquads = 'setSquads',
  setSquad = 'setSquad',
}

export interface ISquadsState {
  status: Status
  items: ISquad[]
}

const initial_state: ISquadsState = {
  status: Status.loading,
  items: [],
}

export const squadsReducer = (state: ISquadsState = initial_state, action: IAction): ISquadsState => {
  const { type, payload } = action
  switch (type) {
    case SquadActions.setSquads:
      return {
        ...state,
        status: Status.success,
        items: payload,
      }
    case SquadActions.setSquad:
      return {
        ...state,
        status: Status.success,
        items: state.items.map((item) => {
          if (item.id === payload.id) return payload as ISquad
          return item
        }),
      }
    default:
      return state
  }
}

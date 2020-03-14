import { ISquad } from 'src/lib/types/squad'
import { IAction } from './rootReducer'
import { Status } from './status'
import { getLocalItem, updateLocalItem } from '../utils/Managers/OfflineManager'

export interface ISquadsState {
  items: ISquad[]
  status: Status
}

export enum SquadActions {
  setSquads = 'setSquads',
  setSquad = 'setSquad',
  addSquad = 'addSquad',
}

const localStateName = 'ISquadsState'

const initial_state: ISquadsState = {
  status: Status.loading,
  items: [],
  ...getLocalItem<ISquadsState>(localStateName) as object,
}

export const squadsReducer = (state: ISquadsState = initial_state, action: IAction): ISquadsState => {
  const { type, payload } = action

  let newState: ISquadsState
  switch (type) {
    case SquadActions.setSquads:
      newState = {
        ...state,
        status: Status.success,
        items: payload,
      }

      return updateLocalItem<ISquadsState>(localStateName, newState)
    case SquadActions.addSquad:
      newState = {
        ...state,
        status: Status.success,
        items: state.items.find((item) => item.id === payload.id) ? state.items : state.items.concat(payload),
      }

      return updateLocalItem<ISquadsState>(localStateName, newState)
    case SquadActions.setSquad:
      newState = {
        ...state,
        status: Status.success,

        items: state.items.length
          ? state.items.map((item) => {
              if (item.id === payload.id) return payload as ISquad
              return item
            })
          : [ payload ],
      }

      return updateLocalItem<ISquadsState>(localStateName, newState)
    default:
      return state
  }
}

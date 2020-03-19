import { ITribe } from 'src/lib/interfaces/tribe'
import { IAction } from './rootReducer'
import { Status } from './status'
import { getLocalItem, updateLocalItem } from '../utils/Managers/OfflineManager'

export interface ITribesState {
  status: Status
  items: ITribe[]
}

export enum TribeActions {
  setTribes = 'setTribes',
  setTribe = 'setTribe',
  updateTribe = 'updateTribe',
}

const localStateName = 'ITribesState'

const initial_state: ITribesState = {
  status: Status.loading,
  items: [],
  ...getLocalItem<ITribesState>(localStateName) as object,
}

export const tribesReducer = (state: ITribesState = initial_state, action: IAction): ITribesState => {
  const { type, payload } = action

  let newState: ITribesState
  switch (type) {
    case TribeActions.setTribes:
      newState = {
        ...state,
        status: Status.success,
        items: payload,
      }

      return updateLocalItem<ITribesState>(localStateName, newState)
    case TribeActions.setTribe:
      newState = {
        ...state,
        status: Status.success,

        items: state.items.length
          ? state.items.map((item) => {
              if (item.id === payload.id) return payload as ITribe
              return item
            })
          : [ payload ],
      }

      return updateLocalItem<ITribesState>(localStateName, newState)
    default:
      return state
  }
}

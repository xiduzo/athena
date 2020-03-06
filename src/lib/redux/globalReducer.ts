import { IAction } from './rootReducer'
import { Status } from './status'
import { getLocalItem, updateLocalItem } from '../utils/Managers/OfflineManager'

export interface IGlobalState {
  hotkeysEnabled: boolean
  themeMode: string
  state: Status
}

export enum GlobalActions {
  setHotkeysEnabled = 'setHotkeysEnabled',
  setThemeMode = 'setThemeMode',
}

const localStateName = 'IGlobalState'

const initial_state: IGlobalState = {
  hotkeysEnabled: true,
  themeMode: 'light',
  state: Status.success,
  ...getLocalItem<IGlobalState>(localStateName) as object,
}

export const globalReducer = (state: IGlobalState = initial_state, action: IAction): IGlobalState => {
  const { type, payload } = action

  let newState: IGlobalState
  switch (type) {
    case GlobalActions.setHotkeysEnabled:
      newState = {
        ...state,
        hotkeysEnabled: payload,
      }

      return updateLocalItem<IGlobalState>(localStateName, newState)
    case GlobalActions.setThemeMode:
      newState = {
        ...state,
        themeMode: payload,
      }

      return updateLocalItem<IGlobalState>(localStateName, newState)
    default:
      return state
  }
}

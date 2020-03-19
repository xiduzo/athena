import { IAction } from './rootReducer'
import { Status } from './status'
import { getLocalItem, updateLocalItem } from '../../common/utils/offlineManager'
import i18n from 'src/i18n'

export interface IGlobalState {
  hotkeysEnabled: boolean
  themeMode: string
  language: string
  status: Status
}

export enum GlobalActions {
  setHotkeysEnabled = 'setHotkeysEnabled',
  setThemeMode = 'setThemeMode',
  setLanguage = 'setLanguage',
}

const localStateName = 'IGlobalState'

const initial_state: IGlobalState = {
  hotkeysEnabled: true,
  themeMode: 'light',
  language: i18n.language || i18n.languages ? i18n.languages[0] : 'nl',
  status: Status.success,
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
    case GlobalActions.setLanguage:
      newState = {
        ...state,
        language: payload,
      }

      return updateLocalItem<IGlobalState>(localStateName, newState)
    default:
      return state
  }
}

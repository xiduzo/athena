import i18n from 'src/i18n'
import { getLocalItem, updateLocalItem } from '../../common/utils/offlineManager'
import { IAction } from './rootReducer'

export interface IGlobalState {
  hotkeysEnabled: boolean
  themeMode: string
  language: string
  menuOpen: boolean
}

export enum GlobalActions {
  setHotkeysEnabled = 'setHotkeysEnabled',
  setThemeMode = 'setThemeMode',
  setLanguage = 'setLanguage',
  setMenuOpen = 'setMenuOpen',
}

const localStateName = 'IGlobalState'

const initial_state: IGlobalState = {
  hotkeysEnabled: true,
  themeMode: 'light',
  menuOpen: false,
  language: i18n.language || i18n.languages ? i18n.languages[0] : 'nl',
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
      break
    case GlobalActions.setThemeMode:
      newState = {
        ...state,
        themeMode: payload,
      }
      break
    case GlobalActions.setLanguage:
      newState = {
        ...state,
        language: payload,
      }

      i18n.changeLanguage(payload)
      break
    case GlobalActions.setMenuOpen:
      newState = {
        ...state,
        menuOpen: payload,
      }

      break
    default:
      return state
  }
  return updateLocalItem<IGlobalState>(localStateName, newState)
}

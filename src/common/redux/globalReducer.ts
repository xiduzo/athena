import i18n from 'src/i18n'
import { getLocalItem, updateLocalItem } from 'src/common/utils'
import { IAction } from './rootReducer'
import { IUser } from 'src/lib/interfaces'

export interface IGlobalState {
  hotkeysEnabled: boolean
  themeType: string
  language: string
  menuOpen: boolean
  user: IUser
  selectedTribe: string
  selectedSquad: string
}

export enum GlobalActions {
  setHotkeysEnabled = 'setHotkeysEnabled',
  setThemeType = 'setThemeType',
  setLanguage = 'setLanguage',
  setMenuOpen = 'setMenuOpen',
  setUser = 'setUser',
  setSelectedTribe = 'setSelectedTribe',
  setSelectedSquad = 'setSelectedSquad',
}

const localStateName = 'IGlobalState'

const initial_state: IGlobalState = {
  hotkeysEnabled: true,
  themeType: 'light',
  menuOpen: false,
  language: i18n.language || i18n.languages ? i18n.languages[0] : 'nl',
  user: {} as IUser,
  selectedTribe: '',
  selectedSquad: '',
  ...getLocalItem<IGlobalState>(localStateName) as object,
}

export const globalReducer = (state: IGlobalState = initial_state, action: IAction): IGlobalState => {
  const { type, payload } = action

  let newState: IGlobalState
  switch (type) {
    case GlobalActions.setUser:
      newState = {
        ...state,
        user: payload,
      }
      break
    case GlobalActions.setSelectedSquad:
      newState = {
        ...state,
        selectedSquad: payload,
      }
      break
    case GlobalActions.setSelectedTribe:
      newState = {
        ...state,
        selectedTribe: payload,
      }
      break
    case GlobalActions.setHotkeysEnabled:
      newState = {
        ...state,
        hotkeysEnabled: payload,
      }
      break
    case GlobalActions.setThemeType:
      newState = {
        ...state,
        themeType: payload,
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

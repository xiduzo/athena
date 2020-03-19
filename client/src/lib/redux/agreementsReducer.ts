import { IAgreement } from 'src/lib/interfaces'
import { IAction } from './rootReducer'
import { Status } from './status'
import { getLocalItem, updateLocalItem } from '../../common/utils/offlineManager'

export enum AgreementActions {
  setAgreements = 'setAgreements',
  patchAgreement = 'patchAgreement',
  addAgreement = 'addAgreement',
  removeAgreement = 'removeAgreement',
  loadAgreements = 'loadAgreements',
}

export interface IAgreementsState {
  status: Status
  items: IAgreement[]
}

const localStateName = 'IAgreementsState'

const initial_state: IAgreementsState = {
  status: Status.loading,
  items: [],
  ...getLocalItem<IAgreementsState>(localStateName) as object,
}

export const agreementsReducer = (state: IAgreementsState = initial_state, action: IAction): IAgreementsState => {
  const { type, payload } = action

  let newState: IAgreementsState
  switch (type) {
    case AgreementActions.loadAgreements:
      newState = {
        ...state,
        status: Status.loading,
      }
      return updateLocalItem<IAgreementsState>(localStateName, newState)

    case AgreementActions.setAgreements:
      newState = {
        ...state,
        status: Status.success,
        items: payload,
      }

      return updateLocalItem<IAgreementsState>(localStateName, newState)
    case AgreementActions.patchAgreement:
      newState = {
        ...state,
        items: state.items.map((item) => {
          if (item.id === payload.id) return payload
          return item
        }),
      }

      return updateLocalItem<IAgreementsState>(localStateName, newState)
    case AgreementActions.addAgreement:
      newState = {
        ...state,
        status: Status.success,
        items: state.items.find((item) => item.id === payload.id) ? state.items : state.items.concat(payload),
      }

      return updateLocalItem<IAgreementsState>(localStateName, newState)
    case AgreementActions.removeAgreement:
      newState = {
        ...state,
        items: state.items.filter((item) => item.id !== payload),
      }

      return updateLocalItem<IAgreementsState>(localStateName, newState)
    default:
      return state
  }
}

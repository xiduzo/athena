import { IAgreement } from 'src/lib/types/agreement'
import { Status, IAction } from '../IRootReducer'

export enum AgreementActions {
  setAgreements = 'setAgreements',
  patchAgreement = 'patchAgreement',
  addAgreement = 'addAgreement',
  removeAgreement = 'removeAgreement',
}

export interface IAgreementsState {
  status: Status
  items: IAgreement[]
}

const initial_state: IAgreementsState = {
  status: Status.loading,
  items: [],
}

export const agreementsReducer = (state: IAgreementsState = initial_state, action: IAction): IAgreementsState => {
  const { type, payload } = action

  switch (type) {
    case AgreementActions.setAgreements:
      return {
        ...state,
        status: Status.success,
        items: payload,
      }
    case AgreementActions.patchAgreement:
      return {
        ...state,
        items: state.items.map((item) => {
          console.log(item)
          if (item.id === payload.id) return payload
          return item
        }),
      }
    case AgreementActions.addAgreement:
      return {
        ...state,
        items: state.items.find((item) => item.id === payload.id) ? state.items : state.items.concat(payload), //state.items.concat(payload)
      }
    case AgreementActions.removeAgreement:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload),
      }
    default:
      return state
  }
}

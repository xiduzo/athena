import { IAgreement } from 'src/lib/types/agreement'
import { Status, IAction } from '../IRootReducer'

export enum AgreementActions {
  setAgreements = 'setAgreements',
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
    default:
      return state
  }
}

import * as request from 'superagent'
import { Dispatch } from 'react'
import { BACKEND_URL, AGREEMENTS_ENDPOINT } from '../constants'
import { IAgreement } from '../interfaces/agreement'
import { AgreementActions } from '../redux/agreementsReducer'
import { IAction } from '../redux/rootReducer'
import superagent, { generalCatchHandler } from '../../common/utils/superagentWrapper'
import { updateSquad } from './squads'
import { ISquad } from '../interfaces/squad'

export const getAgreements = (ids?: string[]) => (dispatch: Dispatch<IAction>) => {
  const suffix = !ids ? '' : `${`${ids.join('&')}`}`
  superagent
    .get(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}/${suffix}`)
    .then(
      (response) => {
        // console.log(response)
      }
      // dispatch({
      //   type: AgreementActions.setAgreements,
      //   payload: response.body,
      // })
    )
    .catch(generalCatchHandler)
}

export const addAgreement = (agreement: IAgreement) => (dispatch: Dispatch<IAction>) => {
  const baseAgreement = {
    ...agreement,
    isBase: true,
  }
  request
    .post(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}`)
    .send(baseAgreement)
    .then((response) =>
      dispatch({
        type: AgreementActions.addAgreement,
        payload: response.body,
      })
    )
    .catch(generalCatchHandler)
}

export const addSquadAgreement = (agreement: IAgreement, squad: ISquad) => (dispatch: Dispatch<IAction>) => {
  const squadAgreement: IAgreement = {
    ...agreement,
    isBase: false,
  }
  request
    .post(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}`)
    .send(squadAgreement)
    .then((response) => {
      dispatch({
        type: AgreementActions.addAgreement,
        payload: response.body,
      })
      updateSquad(squad, { agreements: [ ...squad.agreements, response.body.id ] })
    })
    .catch(generalCatchHandler)
}

export const removeAgreement = (id: string) => (dispatch: Dispatch<IAction>) => {
  request
    .del(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}/${id}`)
    .then(() =>
      dispatch({
        type: AgreementActions.removeAgreement,
        payload: id,
      })
    )
    .catch(generalCatchHandler)
}

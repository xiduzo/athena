import * as request from 'superagent'
import { Dispatch } from 'react'
import { BACKEND_URL, AGREEMENTS_ENDPOINT } from '../constants'
import { IAgreement } from '../types/agreement'
import { AgreementActions } from '../redux/agreementsReducer'
import { IAction } from '../redux/rootReducer'
import superagent from '../../common/utils/superagentWrapper'
import { updateSquad } from './squads'
import { ISquad } from '../types/squad'
import { snackbarWrapper } from '../utils/snackbarWrapper'
import { Response } from 'superagent'

export const getAgreement = (id: string) => (dispatch: Dispatch<IAction>) => {
  superagent
    .get(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}/${id}`)
    .then((response) =>
      dispatch({
        type: AgreementActions.addAgreement,
        payload: response.body,
      })
    )
    .catch((error) => {
      const { message, response } = error
      snackbarWrapper.error(message)
      // response.status
      console.log(error.message, response.status)
    })
}

export const getAgreements = () => (dispatch: Dispatch<IAction>) => {
  superagent
    .get(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}`)
    .then(
      (response) => {
        // console.log(response)
      }
      // dispatch({
      //   type: AgreementActions.setAgreements,
      //   payload: response.body,
      // })
    )
    .catch((error) => {
      console.log(error)
    })
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
    .catch((error) => {
      console.log(error)
    })
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
    .catch((error) => {
      console.log(error)
    })
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
    .catch((error) => {
      console.log(error)
    })
}

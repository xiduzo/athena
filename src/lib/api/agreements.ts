import * as request from 'superagent'
import { Dispatch } from 'react'
import { BACKEND_URL, AGREEMENTS_ENDPOINT, BEARER } from '../constants'
import { IAgreement } from '../types/agreement'
import { AgreementActions } from '../redux/agreementsReducer'
import { IAction } from '../redux/rootReducer'

export const getAgreement = (id: string) => (dispatch: Dispatch<IAction>) => {
  request
    .get(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}/${id}`)
    .set('Authorization', BEARER)
    .then((response) =>
      dispatch({
        type: AgreementActions.addAgreement,
        payload: response.body,
      })
    )
    .catch((error) => {
      throw error
    })
}

export const getAgreements = () => (dispatch: Dispatch<IAction>) => {
  request
    .get(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}`)
    .set('Authorization', BEARER)
    .then((response) =>
      dispatch({
        type: AgreementActions.setAgreements,
        payload: response.body,
      })
    )
    .catch((error) => {
      throw error
    })
}

export const addAgreement = (agreement: IAgreement) => (dispatch: Dispatch<IAction>) => {
  request
    .post(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}`)
    .send(agreement)
    .set('Authorization', BEARER)
    .then((response) =>
      dispatch({
        type: AgreementActions.addAgreement,
        payload: response.body,
      })
    )
    .catch((error) => {
      throw error
    })
}

export const removeAgreement = (id: string) => (dispatch: Dispatch<IAction>) => {
  request
    .del(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}/${id}`)
    .set('Authorization', BEARER)
    .then(() =>
      dispatch({
        type: AgreementActions.removeAgreement,
        payload: id,
      })
    )
    .catch((error) => {
      throw error
    })
}

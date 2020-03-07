import * as request from 'superagent'
import { Dispatch } from 'react'
import { BACKEND_URL, AGREEMENTS_ENDPOINT } from '../constants'
import { IAgreement } from '../types/agreement'
import { AgreementActions } from '../redux/agreementsReducer'
import { IAction } from '../redux/rootReducer'
import superagent from '../../common/utils/superagentWrapper'

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
      console.log(error)
    })
}

export const getAgreements = () => (dispatch: Dispatch<IAction>) => {
  superagent
    .get(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}`)
    .then((response) =>
      dispatch({
        type: AgreementActions.setAgreements,
        payload: response.body,
      })
    )
    .catch((error) => {
      console.log(error)
    })
}

export const addAgreement = (agreement: IAgreement) => (dispatch: Dispatch<IAction>) => {
  request
    .post(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}`)
    .send(agreement)
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

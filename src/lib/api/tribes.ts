import * as request from 'superagent'
import { BACKEND_URL, TRIBE_ENDPOINT, BEARER } from '../constants'
import { Dispatch } from 'react'
import { TribeActions } from '../redux/tribes/tribesReducer'
import { IAction } from '../redux/IRootReducer'
import { ITribe } from '../types/tribe'

export const getTribes = () => (dispatch: Dispatch<IAction>) => {
  request
    .get(`${BACKEND_URL}/${TRIBE_ENDPOINT}`)
    .set('Authorization', BEARER)
    .then((response) =>
      dispatch({
        type: TribeActions.setTribes,
        payload: response.body,
      })
    )
    .catch((error) => {
      throw error
    })
}

export const getTribeById = (id: string) => (dispatch: Dispatch<IAction>) => {
  request
    .get(`${BACKEND_URL}/${TRIBE_ENDPOINT}/${id}/`)
    .set('Authorization', BEARER)
    .then((response) =>
      dispatch({
        type: TribeActions.setTribe,
        payload: response.body as ITribe,
      })
    )
    .catch((error) => {
      throw error
    })
}

export const updateTribe = (tribe: ITribe, update: Partial<ITribe>) => (dispatch: Dispatch<IAction>) => {
  request
    .patch(`${BACKEND_URL}/${TRIBE_ENDPOINT}/${tribe.id}/`)
    .send(update)
    .then(() => {
      dispatch({
        type: TribeActions.setTribe,
        payload: { ...tribe, ...update },
      })
    })
    .catch((error) => console.error(error))
}

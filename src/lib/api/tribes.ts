import { BACKEND_URL, TRIBE_ENDPOINT } from '../constants'
import { Dispatch } from 'react'
import { TribeActions } from '../redux/tribesReducer'
import { ITribe } from '../types/tribe'
import { IAction } from '../redux/rootReducer'
import superagent from 'src/common/utils/superagentWrapper'

export const getTribes = () => (dispatch: Dispatch<IAction>) => {
  superagent
    .get(`${BACKEND_URL}/${TRIBE_ENDPOINT}`)
    .then((response) =>
      dispatch({
        type: TribeActions.setTribes,
        payload: response.body,
      })
    )
    .catch((error) => {
      console.log(error)
    })
}

export const getTribeById = (id: string) => (dispatch: Dispatch<IAction>) => {
  superagent
    .get(`${BACKEND_URL}/${TRIBE_ENDPOINT}/${id}/`)
    .then((response) =>
      dispatch({
        type: TribeActions.setTribe,
        payload: response.body as ITribe,
      })
    )
    .catch((error) => {
      console.log(error)
    })
}

export const updateTribe = (tribe: ITribe, update: Partial<ITribe>) => (dispatch: Dispatch<IAction>) => {
  superagent
    .put(`${BACKEND_URL}/${TRIBE_ENDPOINT}/${tribe.id}/`)
    .then(() => {
      dispatch({
        type: TribeActions.setTribe,
        payload: { ...tribe, ...update },
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

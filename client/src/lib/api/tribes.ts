import { BACKEND_URL, TRIBE_ENDPOINT } from '../constants'
import { Dispatch } from 'react'
import { TribeActions } from '../redux/tribesReducer'
import { ITribe } from 'src/lib/interfaces'
import { IAction } from '../redux/rootReducer'
import superagent, { generalCatchHandler } from 'src/common/utils/superagentWrapper'

export const getTribes = () => (dispatch: Dispatch<IAction>) => {
  superagent
    .get(`${BACKEND_URL}/${TRIBE_ENDPOINT}`)
    .then((response) =>
      dispatch({
        type: TribeActions.setTribes,
        payload: response.body,
      })
    )
    .catch(generalCatchHandler)
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
    .catch(generalCatchHandler)
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
    .catch(generalCatchHandler)
}

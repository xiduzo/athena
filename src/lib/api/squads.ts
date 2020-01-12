import * as request from 'superagent'
import { BACKEND_URL, SQUAD_ENDPOINT, BEARER } from '../constants'
import { SquadActions } from '../redux/squads/squadsReducer'
import { Dispatch } from 'react'
import { IAction } from '../redux'

export const getSquads = () => (dispatch: Dispatch<IAction>) => {
  request
    .get(`${BACKEND_URL}/${SQUAD_ENDPOINT}`)
    .set('Authorization', BEARER)
    .then((response) =>
      dispatch({
        type: SquadActions.setSquads,
        payload: response.body,
      })
    )
    .catch((error) => {
      throw error
    })
}

export const getSquadById = (id: string) => (dispatch: Dispatch<IAction>) => {
  request
    .get(`${BACKEND_URL}/${SQUAD_ENDPOINT}/${id}`)
    .set('Authorization', BEARER)
    .then((response) =>
      dispatch({
        type: SquadActions.setSquad,
        payload: response.body,
      })
    )
    .catch((error) => {
      throw error
    })
}

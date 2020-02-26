import * as request from 'superagent'
import { BACKEND_URL, SQUAD_ENDPOINT, BEARER } from '../constants'
import { SquadActions } from '../redux/squads/squadsReducer'
import { Dispatch } from 'react'
import { IAction } from '../redux'
import { ISquad } from '../types/squad'

// function typeGuard<T>(toBeDetermined: any): toBeDetermined is T {
//   if((toBeDetermined as T).type){
//     return true
//   }
//   return false
// }

export const getSquads = () => (dispatch: Dispatch<IAction>) => {
  request
    .get(`${BACKEND_URL}/${SQUAD_ENDPOINT}`)
    .set('Authorization', BEARER)
    .then((response) => {
      // TODO: check if body = ISquad[]
      dispatch({
        type: SquadActions.setSquads,
        payload: response.body,
      })
    })
    .catch((error) => {
      throw error
    })
}

export const getSquadById = (id: string) => (dispatch: Dispatch<IAction>) => {
  request
    .get(`${BACKEND_URL}/${SQUAD_ENDPOINT}/${id}`)
    .set('Authorization', BEARER)
    .then((response) =>
      // TODO: check if body = ISquad
      dispatch({
        type: SquadActions.addSquad,
        payload: response.body,
      })
    )
    .catch((error) => {
      throw error
    })
}

export const updateSquad = (squad: ISquad, update: Partial<ISquad>) => (dispatch: Dispatch<IAction>) => {
  request
    .patch(`${BACKEND_URL}/${SQUAD_ENDPOINT}/${squad.id}/`)
    .send(update)
    .then(() => {
      dispatch({
        type: SquadActions.setSquad,
        payload: { ...squad, ...update },
      })
    })
    .catch((error) => console.error(error))
}

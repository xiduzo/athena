import { BACKEND_URL, SQUAD_ENDPOINT } from '../constants'
import { SquadActions } from '../redux/squadsReducer'
import { Dispatch } from 'react'
import { ISquad } from '../types/squad'
import { IAction } from '../redux/rootReducer'
import superagent from 'src/common/utils/superagentWrapper'

// function typeGuard<T>(toBeDetermined: any): toBeDetermined is T {
//   if((toBeDetermined as T).type){
//     return true
//   }
//   return false
// }

export const getSquads = () => (dispatch: Dispatch<IAction>) => {
  superagent
    .get(`${BACKEND_URL}/${SQUAD_ENDPOINT}`)
    .then((response) => {
      // TODO: check if body = ISquad[]
      dispatch({
        type: SquadActions.setSquads,
        payload: response.body,
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export const getSquadById = (id: string) => (dispatch: Dispatch<IAction>) => {
  superagent
    .get(`${BACKEND_URL}/${SQUAD_ENDPOINT}/${id}`)
    .then((response) =>
      // TODO: check if body = ISquad
      dispatch({
        type: SquadActions.addSquad,
        payload: response.body,
      })
    )
    .catch((error) => {
      console.log(error)
    })
}

export const updateSquad = (squad: ISquad, update: Partial<ISquad>) => (dispatch: Dispatch<IAction>) => {
  superagent
    .patch(`${BACKEND_URL}/${SQUAD_ENDPOINT}/${squad.id}/`, update)
    .then(() => {
      dispatch({
        type: SquadActions.setSquad,
        payload: { ...squad, ...update },
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

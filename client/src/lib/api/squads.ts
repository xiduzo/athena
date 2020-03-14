import { BACKEND_URL, SQUAD_ENDPOINT } from '../constants'
import { SquadActions } from '../redux/squadsReducer'
import { Dispatch } from 'react'
import { ISquad } from '../types/squad'
import { IAction } from '../redux/rootReducer'
import superagent, { generalCatchHandler } from 'src/common/utils/superagentWrapper'

// function typeGuard<T>(toBeDetermined: any): toBeDetermined is T {
//   if((toBeDetermined as T).type){
//     return true
//   }
//   return false
// }

export const getSquads = (ids?: string[]) => (dispatch: Dispatch<IAction>) => {
  const suffix = !ids ? '' : `${`${ids.join('&')}`}`

  superagent
    .get(`${BACKEND_URL}/${SQUAD_ENDPOINT}/${suffix}`)
    .then((response) => {
      // TODO: check if body = ISquad[]
      dispatch({
        type: SquadActions.setSquads,
        payload: response.body,
      })
    })
    .catch(generalCatchHandler)
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
    .catch(generalCatchHandler)
}

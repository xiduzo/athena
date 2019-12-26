import * as request from 'superagent'
import { BACKEND_URL, TRIBE_ENDPOINT, BEARER } from '../constants'
import { ITribe } from '../types/tribe'
import { IUser } from '../types/user'
import { ISquad } from '../types/squad'
import { ITeam, mapSquad } from './squads'
import { Dispatch } from 'react'
import { TribeActions } from '../redux/tribes/tribesReducer'
import { IAction } from '../redux/IRootReducer'

export interface IWorld {
  course_duration: number
  gamemasters: any[]
  guilds: any[]
  id: string
  name: string
  start: Date
  trello_user_id: string
  url: string
}

export const mapTribe = (world: IWorld): ITribe => {
  const tribe: ITribe = {
    guid: world.id,
    leaders: world.gamemasters.map((gamemaster: any): IUser => gamemaster.user),
    squads: world.guilds.map((team: ITeam): ISquad => mapSquad(team)),
    name: world.name,
  }

  return tribe
}

export const getTribes = () => (dispatch: Dispatch<IAction>) => {
  request
    .get(`${BACKEND_URL}/${TRIBE_ENDPOINT}/v2-worlds/`)
    .set('Authorization', BEARER)
    .then((response) =>
      dispatch({
        type: TribeActions.setTribes,
        payload: response.body.map((world: IWorld) => mapTribe(world)),
      })
    )
    .catch((error) => {
      throw error
    })
}

export const GetTribeById = async (id: string): Promise<ITribe> => {
  return request
    .get(`${BACKEND_URL}/${TRIBE_ENDPOINT}/v2-worlds/${id}/`)
    .set('Authorization', BEARER)
    .then((response) => mapTribe(response.body))
    .catch((error) => {
      throw error
    })
}

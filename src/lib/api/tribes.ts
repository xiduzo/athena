import * as request from 'superagent'
import { BACKEND_URL, TRIBE_ENDPOINT, BEARER } from '../constants'
import { ITribe } from '../types/tribe'

const test_id = '25349a30-d90b-4453-8b74-8be7d132d3ae'

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
    leader: world.gamemasters,
    squads: world.guilds,
    name: world.name,
  }

  return tribe
}

export const GetTribes = async (): Promise<ITribe[]> => {
  return request
    .get(`${BACKEND_URL}/${TRIBE_ENDPOINT}/v2-worlds/`)
    .set('Authorization', BEARER)
    .then(response => response.body.map((world: IWorld) => mapTribe(world)))
    .catch(error => {
      throw error
    })
}

export const GetTribeById = async (): Promise<any> => {
  return request
    .get(`${BACKEND_URL}/${TRIBE_ENDPOINT}/v2-worlds/${test_id}/`)
    .set('Authorization', BEARER)
    .then(response => response.body)
    .catch(error => {
      throw error
    })
}

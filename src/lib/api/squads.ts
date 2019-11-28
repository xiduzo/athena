import * as request from 'superagent'
import { BACKEND_URL, SQUAD_ENDPOINT, BEARER } from '../constants'
import { ISquad } from '../types/squad'

export interface ITeam {
  id: string
  name: string
}

export const mapSquad = (team: ITeam): ISquad => {
  console.log(team)
  const squad: ISquad = {
    guid: team.id,
    name: team.name,
  }

  return squad
}

export const GetSquadById = async (id: string): Promise<ISquad> => {
  return request
    .get(`${BACKEND_URL}/${SQUAD_ENDPOINT}/guilds/${id}/`)
    .set('Authorization', BEARER)
    .then(response => mapSquad(response.body))
    .catch(error => {
      throw error
    })
}

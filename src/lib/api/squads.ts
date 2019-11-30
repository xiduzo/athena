import * as request from 'superagent'
import { BACKEND_URL, SQUAD_ENDPOINT, BEARER } from '../constants'
import { ISquad } from '../types/squad'
import { IUser } from '../types/user'

export interface ITeam {
  id: string
  name: string
  created_at?: Date
  trello_board?: string
  trello_done_list?: string
  members?: IUser[]
  rules?: any[]
  world?: any
}

export const mapSquad = (team: ITeam): ISquad => {
  // console.log(team)
  const squad: ISquad = {
    guid: team.id,
    name: team.name,
    trello_board: team.trello_board,
    members: team.members && team.members.map((member: any) => member.user),
    agreements: team.rules,
  }

  return squad
}

export const GetSquads = async (): Promise<ISquad[]> => {
  return request
    .get(`${BACKEND_URL}/${SQUAD_ENDPOINT}/guilds/`)
    .set('Authorization', BEARER)
    .then(response => response.body.map((team: ITeam) => mapSquad(team)))
    .catch(error => {
      throw error
    })
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

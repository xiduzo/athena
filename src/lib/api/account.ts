import superagent from 'src/common/utils/superagentWrapper'

import { BACKEND_URL, ACCOUNT_ENDPOINT } from '../constants'
import { IUser } from '../types/user'

export const GetUsers = async (): Promise<IUser[]> => {
  return superagent.get(`${BACKEND_URL}/${ACCOUNT_ENDPOINT}`).then((response) => response.body).catch((error) => {
    console.log(error)
  })
}

export const GetUserById = async (id: string): Promise<IUser> => {
  return superagent
    .get(`${BACKEND_URL}/${ACCOUNT_ENDPOINT}/${id}/`)
    .then((response) => response.body)
    .catch((error) => {
      console.log(error)
    })
}

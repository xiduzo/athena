import * as request from 'superagent'

import { BACKEND_URL, ACCOUNT_ENDPOINT, BEARER } from '../constants'
import { IUser } from '../types/user'

export const GetUsers = async (): Promise<IUser[]> => {
  return request
    .get(`${BACKEND_URL}/${ACCOUNT_ENDPOINT}/users/`)
    .set('Authorization', BEARER)
    .then(response => response.body)
    .catch(error => {
      throw error
    })
}

export const GetUserById = async (id: string): Promise<IUser> => {
  return request
    .get(`${BACKEND_URL}/${ACCOUNT_ENDPOINT}/users/${id}/`)
    .set('Authorization', BEARER)
    .then(response => response.body)
    .catch(error => {
      throw error
    })
}

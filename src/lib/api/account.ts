import * as request from 'superagent'

import { BACKEND_URL, ACCOUNT_ENDPOINT, BEARER } from '../constants'

export enum Gender {
  MALE = 0,
  FEMALE = 1,
}
export interface IUser {
  avatar_hash: string | null
  email: string
  first_name: string
  gender: Gender
  initials: string | null
  is_staff: boolean
  is_superuser: boolean
  student_number: number
  surname: string
  surname_prefix: string | null
  id: string
}

export const GetUsers = async (): Promise<any[]> => {
  return request
    .get(`${BACKEND_URL}/${ACCOUNT_ENDPOINT}/users/`)
    .set('Authorization', BEARER)
    .then(response => response.body)
    .catch(error => {
      throw error
    })
}

// function getLecturers(world) {
//   return $http({
//     url: REST_API_URL + 'user/users/',
//     method: 'GET',
//     params: {
//       is_staff: 1,
//     },
//   }).then(
//     function(response) {
//       return response.data
//     },
//     function(error) {
//       return error
//     }
//   )
// }

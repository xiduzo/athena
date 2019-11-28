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

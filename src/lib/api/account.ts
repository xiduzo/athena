import * as request from 'superagent'

import { BACKEND_URL, ACCOUNT_ENDPOINT, BEARER, LDAP_URL } from '../constants'

export const SignIn = async (user: any): Promise<void> => {
  const result = await request.get(LDAP_URL).send({})
  return JSON.parse(result.text)
}

import * as request from 'superagent'
import { BACKEND_URL, TRIBE_ENDPOINT } from '../constants'

const test_id = '25349a30-d90b-4453-8b74-8be7d132d3ae'
const bearer = `Basic ${btoa(
  `${process.env.REACT_APP_BACKEND_USER}:${process.env.REACT_APP_BACKEND_PASS}`
)}`

export const GetTribeById = async (): Promise<void> => {
  const result = await request
    .get(`${BACKEND_URL}/${TRIBE_ENDPOINT}/${test_id}/`)
    .set('Authorization', bearer)
  return JSON.parse(result.text)
}

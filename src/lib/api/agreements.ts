import * as request from 'superagent'
import { BACKEND_URL, AGREEMENTS_ENDPOINT, BEARER } from '../constants'
import { IAgreement } from '../types/agreement'

export const mapAgreement = (item: any) => {
  const agreement: IAgreement = {
    type: item.rule_type - 1,
    text: item.rule_eng,
    points: item.points,
    guid: item.id,
  }

  return agreement
}

export const GetAgreements = async (): Promise<void> => {
  const result = await request
    .get(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}/rules/`)
    .set('Authorization', BEARER)
  return JSON.parse(result.text)
}

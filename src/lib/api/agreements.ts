import * as request from 'superagent'
import { BACKEND_URL, AGREEMENTS_ENDPOINT, BEARER } from '../constants'
import { IAgreement } from '../types/agreement'

export interface IRule {
  rule_type: number
  rule: string
  rule_eng: string
  id: string
  points: number
}

export const mapAgreement = (rule: IRule): IAgreement => {
  const agreement: IAgreement = {
    type: rule.rule_type - 1, // We start with 0 in new interface
    text: rule.rule_eng,
    points: rule.points,
    guid: rule.id,
  }

  return agreement
}

export const GetAgreements = async (): Promise<IAgreement[]> => {
  return request
    .get(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}/rules/`)
    .set('Authorization', BEARER)
    .then(response => response.body.map((rule: IRule) => mapAgreement(rule)))
    .catch(error => {
      throw error
    })
}

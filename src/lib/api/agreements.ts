import * as request from 'superagent'
import { Dispatch } from 'react'
import { BACKEND_URL, AGREEMENTS_ENDPOINT, BEARER } from '../constants'
import { IAgreement } from '../types/agreement'
import { IAction } from '../redux'
import { AgreementActions } from '../redux/agreements/agreementsReducer'

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
    text: rule.rule,
    // text: rule.rule_eng,
    points: rule.points,
    guid: rule.id,
  }

  return agreement
}

export const getAgreements = () => (dispatch: Dispatch<IAction>) => {
  request
    .get(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}/rules/`)
    .set('Authorization', BEARER)
    .then((response) =>
      dispatch({
        type: AgreementActions.setAgreements,
        payload: response.body.map((rule: IRule) => mapAgreement(rule)),
      })
    )
    .catch((error) => {
      throw error
    })
}

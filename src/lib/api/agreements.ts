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
  id?: string
  points: number
}

export const mapAgreement = (rule: IRule): IAgreement => {
  const agreement: IAgreement = {
    type: rule.rule_type - 1, // We start with 0 in new interface
    text: rule.rule,
    text_eng: rule.rule_eng,
    points: rule.points,
    guid: rule.id || '',
  }

  return agreement
}

export const mapRule = (agreement: IAgreement): IRule => {
  const rule: IRule = {
    rule: agreement.text,
    rule_eng: agreement.text_eng,
    points: agreement.points,
    rule_type: agreement.type + 1,
  }
  return rule
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

export const addAgreement = (agreement: IAgreement) => (dispatch: Dispatch<IAction>) => {
  request
    .post(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}/rules/`)
    .send(mapRule(agreement))
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

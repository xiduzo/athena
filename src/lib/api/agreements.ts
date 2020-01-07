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
    type: rule.rule_type,
    translations: [
      {
        language: 'en',
        text: rule.rule_eng,
      },
      {
        language: 'nl',
        text: rule.rule,
      },
    ],
    points: rule.points,
    id: rule.id || '',
  }

  return agreement
}

export const mapRule = (agreement: IAgreement): IRule => {
  const eng = agreement.translations.find((translation) => translation.language === 'en')
  const nl = agreement.translations.find((translation) => translation.language === 'nl')
  const rule: IRule = {
    rule: nl ? nl.text : '',
    rule_eng: eng ? eng.text : '',
    points: agreement.points,
    rule_type: agreement.type,
  }
  return rule
}

export const getAgreements = () => (dispatch: Dispatch<IAction>) => {
  request
    .get(`${BACKEND_URL}/${AGREEMENTS_ENDPOINT}`)
    .set('Authorization', BEARER)
    .then((response) =>
      dispatch({
        type: AgreementActions.setAgreements,
        payload: response.body,
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

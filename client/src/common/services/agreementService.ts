import gql from 'graphql-tag'

export const GET_AGREEMENTS = gql`
  {
    Agreement(filter: { isBase: true }) {
      id
      points
      isBase
      type
      translations {
        language
        text
      }
    }
  }
`

export const CREATE_AGREEMENT = gql`
  mutation CreateAgreement($id: String!, $type: Int!, $isBase: Boolean!, $points: Int!) {
    CreateAgreement(id: $id, type: $type, isBase: $isBase, points: $points) {
      id
    }
  }
`

export const CREATE_TRANSLATION = gql`
  mutation CreateTranslation($id: String!, $language: String!, $text: String!) {
    CreateTranslation(id: $id, language: $language, text: $text) {
      id
    }
  }
`

export const ADD_AGREEMENT_TRANSLATION = gql`
  mutation AddAgreementTranslations($from: _AgreementInput!, $to: _TranslationInput!) {
    AddAgreementTranslations(from: $from, to: $to) {
      from {
        id
      }
      to {
        id
      }
    }
  }
`

export const DELETE_AGREEMENT = gql`
  mutation DeleteAgreement($id: String!) {
    DeleteAgreement(id: $id) {
      id
    }
  }
`

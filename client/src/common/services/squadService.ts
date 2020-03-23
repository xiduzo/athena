import gql from 'graphql-tag'

export const CREATE_SQUAD = gql`
  mutation CreateSquad($id: String!, $name: String!) {
    CreateSquad(id: $id, name: $name) {
      id
    }
  }
`

export const ADD_SQUAD_AGREEMENT = gql`
  mutation AddSquadAgreements($from: _SquadInput!, $to: _AgreementInput!) {
    AddSquadAgreements(from: $from, to: $to) {
      from {
        id
      }
      to {
        id
      }
    }
  }
`

export const REMOVE_SQUAD_AGREEMENT = gql`
  mutation RemoveSquadAgreements($from: _SquadInput!, $to: _AgreementInput!) {
    RemoveSquadAgreements(from: $from, to: $to) {
      from {
        id
      }
      to {
        id
      }
    }
  }
`

export const ADD_SQUAD_MEMBER = gql`
  mutation AddSquadMembers($from: _UserInput!, $to: _SquadInput!) {
    AddSquadMembers(from: $from, to: $to) {
      from {
        id
      }
      to {
        id
      }
    }
  }
`

export const REMOVE_SQUAD_MEMBER = gql`
  mutation RemoveSquadMembers($from: _UserInput!, $to: _SquadInput!) {
    RemoveSquadMembers(from: $from, to: $to) {
      from {
        id
      }
      to {
        id
      }
    }
  }
`

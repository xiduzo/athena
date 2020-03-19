import gql from 'graphql-tag'

export const GET_TRIBES = gql`
  query Tribe($filter: _TribeFilter) {
    Tribe(filter: $filter) {
      id
      name
      squads {
        id
        name
      }
      leaders {
        id
        displayName
      }
    }
  }
`

export const CREATE_TRIBE = gql`
  mutation CreateTribe($id: String!, $name: String!) {
    CreateTribe(id: $id, name: $name) {
      id
    }
  }
`

export const ADD_TRIBE_SQUAD = gql`
  mutation AddTribeSquads($from: _SquadInput!, $to: _TribeInput!) {
    AddTribeSquads(from: $from, to: $to) {
      from {
        id
      }
      to {
        id
      }
    }
  }
`

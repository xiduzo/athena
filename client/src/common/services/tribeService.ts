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

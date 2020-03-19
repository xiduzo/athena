import gql from 'graphql-tag'

export const CREATE_SQUAD = gql`
  mutation CreateSquad($id: String!, $name: String!) {
    CreateSquad(id: $id, name: $name) {
      id
    }
  }
`

import gql from 'graphql-tag'

export const MERGE_USER = gql`
  mutation MergeUser(
    $id: String!
    $email: String
    $displayName: String
    $avatarStyle: String
    $identityProviderReferenceNumber: String
  ) {
    MergeUser(
      id: $id
      email: $email
      displayName: $displayName
      avatarStyle: $avatarStyle
      identityProviderReferenceNumber: $identityProviderReferenceNumber
    ) {
      id
    }
  }
`

export const ADD_TRIBE_LEADER = gql`
  mutation AddTribeLeaders($from: _UserInput!, $to: _TribeInput!) {
    AddTribeLeaders(from: $from, to: $to) {
      from {
        id
      }
      to {
        id
      }
    }
  }
`

export const REMOVE_TRIBE_LEADER = gql`
  mutation RemoveTribeLeaders($from: _UserInput!, $to: _TribeInput!) {
    RemoveTribeLeaders(from: $from, to: $to) {
      from {
        id
      }
      to {
        id
      }
    }
  }
`

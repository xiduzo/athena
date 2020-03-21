import gql from 'graphql-tag'

export const MERGE_USER = gql`
  mutation MergeUser(
    $id: String!
    $email: String
    $displayName: String
    $avatarHash: String
    $identityProviderReferenceNumber: String
  ) {
    MergeUser(
      id: $id
      email: $email
      displayName: $displayName
      avatarHash: $avatarHash
      identityProviderReferenceNumber: $identityProviderReferenceNumber
    ) {
      id
    }
  }
`

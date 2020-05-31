import gql from 'graphql-tag'
import { IUser } from 'src/lib/interfaces'

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

export interface IGiveFeedbackData {
  User: IUser[]
}

export interface IGiveFeedbackDataVariables {
  userId: string
  squadId: string
}

export const USER_FEEDBACK = gql`
  query UserFeedback($userId: String!, $squadId: String!) {
    User(filter: { id: $userId }) {
      id
      squads(filter: { id: $squadId }) {
        name
        members {
          id
          displayName
          avatarStyle
        }
        agreements {
          id
          points
          translations {
            language
            text
          }
          feedback(filter: { from: { id: $userId } }) {
            id
            weekNum
            from {
              id
            }
            to {
              id
            }
            agreement {
              id
            }
            rating
          }
        }
      }
    }
  }
`

import gql from 'graphql-tag'

export interface IGiveFeedbackToUserVariables {
  feedbackId: string
  agreementId: string
  fromUserId: string
  toUserId: string
  weekNum: number
  rating: number
}

export const GIVE_FEEDBACK = gql`
  mutation GiveFeedbackToUser(
    $feedbackId: String!
    $agreementId: String!
    $fromUserId: String!
    $toUserId: String!
    $weekNum: Int!
    $rating: Float!
  ) {
    MergeFeedback(id: $feedbackId, rating: $rating, weekNum: $weekNum) {
      id
    }
    MergeFeedbackAgreement(from: { id: $feedbackId }, to: { id: $agreementId }) {
      from {
        id
      }
    }
    MergeFeedbackFrom(from: { id: $fromUserId }, to: { id: $feedbackId }) {
      from {
        id
      }
    }
    MergeFeedbackTo(from: { id: $feedbackId }, to: { id: $toUserId }) {
      from {
        id
      }
    }
  }
`

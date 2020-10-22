import gql from 'graphql-tag'

export interface IGiveFeedbackToUserVariables {
  feedbackId: string
  agreementId: string
  fromUserId: string
  toUserId: string
  rating: number
}

export const GIVE_FEEDBACK = gql`
  mutation GiveFeedbackToUser(
    $feedbackId: String!
    $agreementId: String!
    $fromUserId: String!
    $toUserId: String!
    $rating: Float!
  ) {
    MergeFeedback(id: $feedbackId, rating: $rating) {
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

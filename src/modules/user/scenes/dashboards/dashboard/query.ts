import gql from 'graphql-tag'

export const MEMBER_DASHBOARD_QUERY = gql`
  query MembersDashboardQuery($userId: String!, $squadId: String!) {
    User(filter: { id: $userId }) {
      squads(filter: { id: $squadId }) {
        name
        agreements {
          id
          points
          type
          feedback {
            from {
              id
            }
            to {
              id
            }
            rating
            weekStart {
              formatted
            }
          }
        }
      }
    }
  }
`

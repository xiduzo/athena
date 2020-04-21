import { CognitoUserSession } from 'amazon-cognito-identity-js'

export const getUserGroups = (session: CognitoUserSession): string[] => {
  return session.getAccessToken().payload['cognito:groups']
}

import * as request from 'superagent'
import { Auth } from 'aws-amplify'
import { Response } from 'superagent'
import { snackbarWrapper } from 'src/lib/utils/snackbarWrapper'

interface ISuperAgentWrapper {
  delete: (url: string) => Promise<Response>
  get: (url: string) => Promise<Response>
  post: (url: string) => Promise<Response>
  put: (url: string) => Promise<Response>
  patch: (url: string, update: any) => Promise<Response>
}

export interface IErrorResponse {
  response: Response
  message: string
}

const getToken = async (): Promise<string> => {
  const user = await Auth.currentSession()
  const token = user.getAccessToken().getJwtToken()
  return token || ''
}

export const generalCatchHandler = (error: IErrorResponse) => {
  const { message, response } = error

  // TODO: add logging to cloud watch
  console.log(response)
  // if (response.status === 404) return

  console.log(message, response)
  snackbarWrapper.error(message)
}

// const getToken = (): string => {
//   const clientId = process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
//   const user = window.localStorage.getItem(
//     `CognitoIdentityServiceProvider.${clientId}.LastAuthUser`
//   )
//   const token = window.localStorage.getItem(
//     `CognitoIdentityServiceProvider.${clientId}.${user}.accessToken`
//   )
//   return token || ''
// }

const superagentWrapper: ISuperAgentWrapper = {
  delete: async (url: string) => request.delete(url).set('Authorization', `Bearer ${await getToken()}`),
  get: async (url: string) => request.get(url).set('Authorization', `Bearer ${await getToken()}`),
  post: async (url: string) => request.post(url).set('Authorization', `Bearer ${await getToken()}`),
  put: async (url: string) => request.put(url).set('Authorization', `Bearer ${await getToken()}`),
  patch: async (url: string, update: any) =>
    request.patch(url).send(update).set('Authorization', `Bearer ${await getToken()}`),
}

export default superagentWrapper

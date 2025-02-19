import { ApolloError } from 'apollo-errors'
import { snackbarWrapper } from 'src/common/utils'

export const generalCatchHandler = (error: ApolloError): void => {
  const { message } = error

  // TODO: add logging to cloud watch
  console.log(error)
  // if (response.status === 404) return

  snackbarWrapper.error(message || ((error as unknown) as string))
}

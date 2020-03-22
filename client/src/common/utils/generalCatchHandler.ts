import { ApolloError } from 'apollo-errors'
import { snackbarWrapper } from 'src/common/utils/snackbarWrapper'

export const generalCatchHandler = (error: ApolloError) => {
  const { message } = error

  // TODO: add logging to cloud watch
  console.log(error)
  // if (response.status === 404) return

  snackbarWrapper.error(message || ((error as unknown) as string))
}

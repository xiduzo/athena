import { ApolloError, ErrorConfig } from 'apollo-errors'

interface IAuthorizationError {
  config: ErrorConfig
}

export class AuthorizationError implements IAuthorizationError {
  config: ErrorConfig = {} as ErrorConfig
  constructor(config: ErrorConfig) {
    throw new ApolloError('You are not authorized.', config, config)
  }
}

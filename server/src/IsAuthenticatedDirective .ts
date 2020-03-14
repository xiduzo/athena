// https://blog.grandstack.io/authorization-in-graphql-using-custom-schema-directives-eafa6f5b4658
import { SchemaDirectiveVisitor, AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { GraphQLDirective, DirectiveLocation } from 'graphql'
import { verify } from 'jsonwebtoken'

export class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName: any, schema: any) {
    return new GraphQLDirective({
      name: 'isAuthenticated',
      locations: [ DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT ],
    })
  }

  visitFieldDefinition(field: any) {
    field.resolve = async (result: any, args: any, context: any, info: any) => {
      if (!context || !context.headers || !context.headers.authorization) {
        throw new AuthenticationError('No authorization token.')
      }

      const token = context.headers.authorization

      try {
        const id_token = token.replace('Bearer ', '')
        const decode = verify(id_token, process.env.JWT_SECRET || '', { algorithms: [ 'RS256' ] })
        return result[field.name]
      } catch (_) {
        throw new ForbiddenError('You are not authorized for this resource')
      }
    }
  }

  visitObject(field: any) {
    field.resolve = async (result: any, args: any, context: any, info: any) => {
      if (!context || !context.headers || !context.headers.authorization) {
        throw new AuthenticationError('No authorization token.')
      }

      const token = context.headers.authorization

      try {
        const id_token = token.replace('Bearer ', '')
        const decode = verify(id_token, process.env.JWT_SECRET || '', { algorithms: [ 'RS256' ] })
        return result[field.name]
      } catch (_) {
        throw new ForbiddenError('You are not authorized for this resource')
      }
    }
  }
}

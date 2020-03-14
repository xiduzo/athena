import { AuthorizationError } from './errors'
import { IncomingMessage } from 'http'
import * as jwt from 'jsonwebtoken'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import {
  DirectiveLocation,
  GraphQLDirective,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
  GraphQLField,
} from 'graphql'

const verifyAndDecodeToken = ({ context }: { context: any }) => {
  const { req } = context
  if (
    (!req || !req.headers || (!req.headers.authorization && !req.headers.Authorization)) &&
    (!req.cookies && !req.cookies.token)
  ) {
    throw new AuthorizationError({ message: 'No authorization token.' })
  }

  const token = req.headers.authorization || req.headers.Authorization || req.cookies.token

  try {
    const id_token = token.replace('Bearer ', '')
    const { JWT_SECRET, JWT_NO_VERIFY } = process.env

    return jwt.decode(id_token)

    if (!JWT_SECRET && JWT_NO_VERIFY) {
      console.log(id_token)
      return jwt.decode(id_token)
    } else {
      return jwt.verify(id_token, JWT_SECRET || '', {
        algorithms: [ 'HS256', 'RS256' ],
      })
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AuthorizationError({
        message: 'Your token is expired',
      })
    } else {
      throw new AuthorizationError({
        message: 'You are not authorized for this resource',
      })
    }
  }
}

interface INameToValueMap {
  [key: string]: any
}

export class HasScopeDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName: any, schema: any) {
    return new GraphQLDirective({
      name: 'hasScope',
      locations: [ DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT ],
      args: {
        scopes: {
          type: new GraphQLList(GraphQLString),
          defaultValue: 'none:read',
        },
      },
    })
  }

  // used for example, with Query and Mutation fields
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const expectedScopes = this.args.scopes
    const next = field.resolve

    // wrap resolver with auth check
    field.resolve = (result: any, args: any, context: any, info: any) => {
      const decoded = verifyAndDecodeToken({ context }) as INameToValueMap

      // FIXME: override with env var
      const scopes = decoded['Scopes'] || decoded['scopes'] || decoded['Scope'] || decoded['scope'] || []

      if (expectedScopes.some((scope: any) => scopes.indexOf(scope) !== -1)) {
        return next && next(result, args, { ...context, user: decoded }, info)
      }

      throw new AuthorizationError({
        message: 'You are not authorized for this resource',
      })
    }
  }

  visitObject(obj: GraphQLObjectType) {
    const fields = obj.getFields()
    const expectedScopes = this.args.scopes

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName]
      const next = field.resolve
      field.resolve = (result: any, args: any, context: any, info: any) => {
        const decoded = verifyAndDecodeToken({ context }) as INameToValueMap

        // FIXME: override w/ env var
        const scopes = decoded['Scopes'] || decoded['scopes'] || decoded['Scope'] || decoded['scope'] || []

        if (expectedScopes.some((role: any) => scopes.indexOf(role) !== -1)) {
          return next && next(result, args, { ...context, user: decoded }, info)
        }
        throw new AuthorizationError({
          message: 'You are not authorized for this resource',
        })
      }
    })
  }
}

export class HasRoleDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName: any, schema: any) {
    return new GraphQLDirective({
      name: 'hasRole',
      locations: [ DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT ],
      args: {
        roles: {
          type: new GraphQLList(schema.getType('Role')),
          defaultValue: 'reader',
        },
      },
    })
  }

  visitFieldDefinition(field: GraphQLField<any, any>) {
    const expectedRoles = this.args.roles
    const next = field.resolve

    field.resolve = (result: any, args: any, context: any, info: any) => {
      const decoded = verifyAndDecodeToken({ context }) as INameToValueMap

      // FIXME: override with env var
      const roles = process.env.AUTH_DIRECTIVES_ROLE_KEY
        ? decoded[process.env.AUTH_DIRECTIVES_ROLE_KEY] || []
        : decoded['cognito:groups'] || decoded['Roles'] || decoded['roles'] || decoded['Role'] || decoded['role'] || []

      if (expectedRoles.some((role: any) => roles.indexOf(role) !== -1)) {
        return next && next(result, args, { ...context, user: decoded }, info)
      }

      throw new AuthorizationError({
        message: 'You are not authorized for this resource',
      })
    }
  }

  visitObject(obj: GraphQLObjectType) {
    const fields = obj.getFields()
    const expectedRoles = this.args.roles

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName]
      const next = field.resolve
      field.resolve = (result: any, args: any, context: any, info: any) => {
        const decoded = verifyAndDecodeToken({ context }) as INameToValueMap

        const roles = process.env.AUTH_DIRECTIVES_ROLE_KEY
          ? decoded[process.env.AUTH_DIRECTIVES_ROLE_KEY] || []
          : decoded['Roles'] || decoded['roles'] || decoded['Role'] || decoded['role'] || []

        if (expectedRoles.some((role: any) => roles.indexOf(role) !== -1)) {
          return next && next(result, args, { ...context, user: decoded }, info)
        }
        throw new AuthorizationError({
          message: 'You are not authorized for this resource',
        })
      }
    })
  }
}

export class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName: any, schema: any) {
    return new GraphQLDirective({
      name: 'isAuthenticated',
      locations: [ DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT ],
    })
  }

  visitObject(obj: GraphQLObjectType) {
    const fields = obj.getFields()

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName]
      const next = field.resolve

      field.resolve = (result: any, args: any, context: any, info: any) => {
        const decoded = verifyAndDecodeToken({ context }) // will throw error if not valid signed jwt
        return next && next(result, args, { ...context, user: decoded }, info)
      }
    })
  }

  visitFieldDefinition(field: GraphQLField<any, any>) {
    const next = field.resolve

    field.resolve = (result: any, args: any, context: any, info: any) => {
      const decoded = verifyAndDecodeToken({ context })
      return next && next(result, args, { ...context, user: decoded }, info)
    }
  }
}

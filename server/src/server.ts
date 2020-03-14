import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
// @ts-ignore
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import neo4j from 'neo4j-driver'
import { typeDefs } from './types'
import { IsAuthenticatedDirective, HasRoleDirective, HasScopeDirective } from './IsAuthenticatedDirective '
// @ts-ignore
// import { HasRoleDirective, HasScopeDirective, IsAuthenticatedDirective } from 'graphql-auth-directives'

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('athena', 'bierislekker'))

const schema = makeAugmentedSchema({
  typeDefs,
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
    hasRole: HasRoleDirective,
    hasScope: HasScopeDirective,
  },
})

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      driver,
      req,
    }
  },
})

const app = express()
server.applyMiddleware({ app })

const PORT = 5000
app.listen({ port: PORT }, () => console.log(`Now browse to http://localhost:${PORT}${server.graphqlPath}`))

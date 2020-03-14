import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
// @ts-ignore
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import neo4j from 'neo4j-driver'
import { AuthDirective } from 'graphql-directive-auth'
import { IsAuthenticatedDirective } from './IsAuthenticatedDirective '

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('athena', 'bierislekker'))

const typeDefs = `
  directive @isAuthenticated on FIELD_DEFINITION | OBJECT

  type Translation {
    id: String!
    language: String!
    text: String!
  }

  type Agreement @isAuthenticated {
    id: String!
    type: Int
    isBase: Boolean
    points: Int
    translations: [Translation] @relation(name: "HAS_TRANSLATION", direction: "OUT")
  }
`

const schema = makeAugmentedSchema({
  typeDefs,
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
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

import { ApolloServer } from 'apollo-server-express'
import * as dotenv from 'dotenv'
import * as express from 'express'
import neo4j from 'neo4j-driver'
// @ts-ignore
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import { HasRoleDirective } from './directives/HasRoleDirective'
import { HasScopeDirective } from './directives/HasScopeDirective'
import { IsAuthenticatedDirective } from './directives/IsAuthenticatedDirective'
import { typeDefs } from './types'
import { CreatedAtDirective } from './directives/createdAtDirective'

// Make sure we can use process.env variables
dotenv.config()

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('athena', 'bierislekker'))

const schema = makeAugmentedSchema({
  typeDefs,
  logger: { log: (e: any) => console.log(e) },
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
    hasRole: HasRoleDirective,
    hasScope: HasScopeDirective,
    createdAt: CreatedAtDirective,
  },
})

const server = new ApolloServer({
  schema,
  context: ({ req }: any) => {
    // TODO Need to fix token from apollo server
    if (req.headers.host === `localhost:5000`) {
      req.headers.authorization = `Bearer eyJraWQiOiI4SHZER0RKclJYcVZlVEdmNzk2TnZOV2gwQjllbnNMTklVRzM5eG9jRVVRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4MDRlZmM3MS1mNzJmLTRiNmItYTk1My1lOTRhMmYxMmI0MDMiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJldmVudF9pZCI6IjJmMWNmY2Y5LWU0NWMtNGFjNy04ODdmLTkxNDVjZjU0OWViYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1ODQyMTczMzQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX2xMaWJQN25BQiIsImV4cCI6MTU4NDMwNTEwOSwiaWF0IjoxNTg0MzAxNTA5LCJqdGkiOiI0MzNhMDBkMy01ZmU0LTQ2YTEtOTg2ZC1hMmE4MjQzZDczNGIiLCJjbGllbnRfaWQiOiJtdjh0dnR1MmllZjczbW1sNzlpMDc5dG9wIiwidXNlcm5hbWUiOiJtYWlsQHNhbmRlcmJvZXIubmwifQ.Okj6DEPJX5m_XvrqVxMrnTGl2d1PMyJ83NsT9EHIVwKyNwZlT40Zn6hvO2isZHoyckJ6hKgzYwvaDeMA0V29ZOhdAuJ_PkL0JLf0ijZNJybY_8DBUEiSOzeEXsb4ldsUbeky5LDYUkJXK9D0tQzkzYwYJMXgJ5xhvrH_deCbdugMPyh46ujlsGaZDCeJIuxjhYCtW1rLSKoeQ0ByYD1MYcBjWKnoA3NI9_tDRor7K8APqMGNSsyLpWAPf99c1AC3162oOuyvDw2h3Dx4iMjHWn8uhzcBPRYmfpWegT4DaM59gaSKECkETLnP4oppGGfabIWNJZ7ExLGFgo0GV3QFlA`
    }
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

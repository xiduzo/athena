import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
// @ts-ignore
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import neo4j from 'neo4j-driver'
import { typeDefs } from './types'
import { IsAuthenticatedDirective, HasRoleDirective, HasScopeDirective } from './IsAuthenticatedDirective '
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
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

let test: any = null
const server = new ApolloServer({
  schema,
  context: ({ req }: any) => {
    // TODO Need to fix token from apollo server
    if (req.headers.host === `localhost:5000`) {
      req.headers.authorization = `Bearer eyJraWQiOiI4SHZER0RKclJYcVZlVEdmNzk2TnZOV2gwQjllbnNMTklVRzM5eG9jRVVRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4MDRlZmM3MS1mNzJmLTRiNmItYTk1My1lOTRhMmYxMmI0MDMiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJldmVudF9pZCI6IjJmMWNmY2Y5LWU0NWMtNGFjNy04ODdmLTkxNDVjZjU0OWViYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1ODQyMTczMzQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX2xMaWJQN25BQiIsImV4cCI6MTU4NDIyNTE3OSwiaWF0IjoxNTg0MjIxNTc5LCJqdGkiOiI2ZTE0M2Q5OC00M2FmLTQwNDQtYTk0OC1hMDY5Mzg1YzhhZWYiLCJjbGllbnRfaWQiOiJtdjh0dnR1MmllZjczbW1sNzlpMDc5dG9wIiwidXNlcm5hbWUiOiJtYWlsQHNhbmRlcmJvZXIubmwifQ.B3z1WHS-snYE73N7z-O9KIngfHIWv1N0JIvaXuk4FPyNhqT-wAJT16PnjHN2uTt4WqKy2kaiJ36pUzakpk1N-NSBVlKpMWLk6rMfAj6wbZQbT0uSiDEBEoe1Uw-XCSe2m0Gv7xxWZF8dCL151LjPFU_kMiAk-cWbTjRjQuoxBP-d87N4iNGLdVf-IzIk3xvIbAyGMVkN37SdZWdqIm7SLpb-QU6nZz3P_4BDA4wEOlrUVYnC5KLxUY4bB1Yy_bo_d6kY4REy2whwq424_jhSIM57kk-rIjfTQfI6lsmxZpHmtpZHhX5uSeEGoMDuHKcztQDvb0rIf4b7mm4mtl4PZg`
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

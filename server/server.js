const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const typeDefs = gql`
  type Agreement {
    id: String!
  }

  type Query {
    getAgreements(ids: [String]): [Agreement]
  }
`

const resolvers = {
  Query: {
    getAgreements: (parent, args, context, info) => {
      const { ids } = args
      return [
        {
          id: '12adff',
        },
      ]
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => console.log('Now browse to http://localhost:4000' + server.graphqlPath))

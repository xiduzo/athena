"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const neo4j_graphql_js_1 = require("neo4j-graphql-js");
const neo4j_driver_1 = require("neo4j-driver");
const IsAuthenticatedDirective_1 = require("./IsAuthenticatedDirective ");
const types_1 = require("./types");
const driver = neo4j_driver_1.default.driver('bolt://localhost:7687', neo4j_driver_1.default.auth.basic('athena', 'bierislekker'));
const schema = neo4j_graphql_js_1.makeAugmentedSchema({
    typeDefs: types_1.typeDefs,
    schemaDirectives: {
        isAuthenticated: IsAuthenticatedDirective_1.IsAuthenticatedDirective,
    },
});
const server = new apollo_server_express_1.ApolloServer({
    schema,
    context: ({ req }) => {
        return {
            driver,
            req,
        };
    },
});
const app = express();
server.applyMiddleware({ app });
const PORT = 5000;
app.listen({ port: PORT }, () => console.log(`Now browse to http://localhost:${PORT}${server.graphqlPath}`));
//# sourceMappingURL=server.js.map
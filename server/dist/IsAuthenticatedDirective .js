"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("graphql");
const jsonwebtoken_1 = require("jsonwebtoken");
const errors_1 = require("./errors");
class IsAuthenticatedDirective extends apollo_server_express_1.SchemaDirectiveVisitor {
    static getDirectiveDeclaration(directiveName, schema) {
        return new graphql_1.GraphQLDirective({
            name: 'isAuthenticated',
            locations: [graphql_1.DirectiveLocation.FIELD_DEFINITION, graphql_1.DirectiveLocation.OBJECT],
        });
    }
    visitFieldDefinition(field) {
        console.log(true);
        field.resolve = (result, args, context, info) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(true);
            if (!context || !context.headers || !context.headers.authorization) {
                throw new apollo_server_express_1.AuthenticationError('No authorization token.');
            }
            const token = context.headers.authorization;
            try {
                const id_token = token.replace('Bearer ', '');
                const decode = jsonwebtoken_1.verify(id_token, process.env.JWT_SECRET || '', { algorithms: ['RS256'] });
                return result[field.name];
            }
            catch (_) {
                throw new errors_1.AuthorizationError({ message: 'You are not authorized for this resource' });
            }
        });
    }
    visitObject(field) {
        field.resolve = (result, args, context, info) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!context || !context.headers || !context.headers.authorization) {
                throw new apollo_server_express_1.AuthenticationError('No authorization token.');
            }
            const token = context.headers.authorization;
            try {
                const id_token = token.replace('Bearer ', '');
                const decode = jsonwebtoken_1.verify(id_token, process.env.JWT_SECRET || '', { algorithms: ['RS256'] });
                return result[field.name];
            }
            catch (_) {
                throw new apollo_server_express_1.ForbiddenError('You are not authorized for this resource');
            }
        });
    }
}
exports.IsAuthenticatedDirective = IsAuthenticatedDirective;
//# sourceMappingURL=IsAuthenticatedDirective .js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_errors_1 = require("apollo-errors");
exports.AuthorizationError = apollo_errors_1.createError('AuthorizationError', {
    message: 'You are not authorized.',
});
//# sourceMappingURL=errors.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = `
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
`;
//# sourceMappingURL=types.js.map
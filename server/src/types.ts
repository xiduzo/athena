export const typeDefs = `
  
directive @hasScope(scopes: [String]) on OBJECT | FIELD_DEFINITION
directive @hasRole(roles: [Role]) on OBJECT | FIELD_DEFINITION
directive @isAuthenticated on OBJECT | FIELD_DEFINITION

enum Role {
  reader
  user
  admin
}

  type Translation {
    id: String!
    language: String!
    text: String!
  }

  type Agreement @isAuthenticated{
    id: String! @hasRole(roles:[user])
    type: Int
    isBase: Boolean
    points: Int
    translations: [Translation] @relation(name: "HAS_TRANSLATION", direction: "OUT")
  }
`

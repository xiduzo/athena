export const typeDefs = `
  
  directive @hasScope(scopes: [String]) on OBJECT | FIELD_DEFINITION
  directive @hasRole(roles: [Role]) on OBJECT | FIELD_DEFINITION
  directive @isAuthenticated on OBJECT | FIELD_DEFINITION
  directive @createdAt on FIELD_DEFINITION

  enum Role {
    reader
    user
    admin
    testRole
  }

  type User {
    id: String!
    email: String!
    displayName: String!
    squads: [Squad] @relation(name: "HAS_MEMBER", direction: "IN")
    tribes: [Tribe] @relation(name: "IS_LEADER_OF", direction: "IN")
  }

  type Translation  {
    id: String!
    language: String!
    text: String!
  }

  type Feedback {
    id: String!
    from: User @relation(name: "GAVE_FEEDBACK", direction: "IN")
    to: User @relation(name: "GOT_FEEDBACK", direction: "OUT")
    rating: Int!
    weekNum: Int!
  }

  type Agreement @isAuthenticated {
    id: String! @hasRole(roles: [testRole])
    type: Int!
    isBase: Boolean!
    points: Int!
    translations: [Translation] @relation(name: "HAS_TRANSLATION", direction: "OUT")
    feedback: [Feedback] @relation(name: "ON", direction: "IN")
  }

  type Squad {
    id: String!
    name: String!
    agreements: [Agreement] @relation(name: "HAS_AGREED_TO", direction: "IN")
    members: [User] @relation(name: "HAS_MEMBER", direction: "OUT")
  }

  type Tribe {
    id: String!
    name: String!
    squads: [Squad] @relation(name: "IS_PART_OF", direction: "IN")
    leaders: [User] @relation(name: "IS_LED_BY", direction: "OUT")
  }
`

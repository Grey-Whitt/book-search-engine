// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: Int
    authors: [String]
    description: String 
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }


  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: Int!): User
  }

  input BookInput {
    description: String
    title: String
    bookId: Int
    image: String
    link: String
    authors: [String]
  }
`;

// export the typeDefs
module.exports = typeDefs;
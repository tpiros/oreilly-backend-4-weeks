const { gql } = require('apollo-server-hapi');

module.exports = gql`
  extend type Query {
    countries: [Country]
    country(code: String!): Country
  }
  type Country {
    Code: String
    Name: String
    Population: Int
    citylist: [City]
  }
`;

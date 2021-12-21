const { gql } = require('apollo-server-hapi');

module.exports = gql`
  extend type Query {
    cities: [City]
    city(id: Int!): City
  }
  type City {
    ID: String
    Name: String
    District: String
    Population: Int
    CountryCode: String
    CountryInfo: Country
  }
`;

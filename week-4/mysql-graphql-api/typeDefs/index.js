const { gql } = require('apollo-server-hapi');

const citySchema = require('./city');
const countrySchema = require('./country');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
`;

module.exports = [linkSchema, citySchema, countrySchema];

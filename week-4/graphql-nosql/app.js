import { ApolloServer, gql } from 'apollo-server';

import resolvers from './resolvers.js';

const typeDefs = gql`
  type Employee {
    name: String
    salary: String
  }

  type Query {
    employees: [Employee]
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

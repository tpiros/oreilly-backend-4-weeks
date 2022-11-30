const express = require('express');
const app = express();
const data = require('./data');

const { graphqlHTTP } = require('express-graphql');

const { buildSchema } = require('graphql');
const schema = buildSchema(`
  type Query {
    people: [Person]
    person(id: Int!): Person
  }

  type Person {
    id: Int,
    name: String,
    age: Int
  }
`);

const root = {
  people: () => data,
  person: ({ id }) => {
    const [person] = data.filter((d) => d.id === id);
    return person;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

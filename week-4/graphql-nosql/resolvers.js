import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');
client.connect();
const db = client.db('project');
const employees = db.collection('employees');

const resolvers = {
  Query: {
    async employees(parent, args, context, info) {
      const query = {};
      const cursor = await employees.find(query);
      return cursor.toArray();
    },
  },
};

export default resolvers;

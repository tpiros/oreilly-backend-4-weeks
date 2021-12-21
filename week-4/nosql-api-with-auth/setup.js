const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { user, db } = require('./settings');
const mongo_uri = `mongodb://${db.host}:${db.port}`;

const client = new MongoClient(mongo_uri);

async function hashPassword(user) {
  const password = user.password;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function init() {
  try {
    await client.connect();
    const database = await client.db(db.name);
    const collection = await database.collection('users');
    const queryResult = await collection.findOne({ username: user.username });
    if (!queryResult) {
      const hashedPassword = await hashPassword(user);
      user.password = hashedPassword;
      await collection.insertOne(user);
      console.log('Setup complete, user inserted');
    } else {
      console.log('"Admin" user already inserted');
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
init();

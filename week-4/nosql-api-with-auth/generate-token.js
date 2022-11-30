const { MongoClient } = require('mongodb');
const { user, db } = require('./settings');
const mongo_uri = `mongodb://${db.host}:${db.port}`;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function run() {
  const client = await MongoClient.connect(mongo_uri);
  const database = await client.db(db.name);
  const collection = await database.collection('users');
  const document = await collection.findOne({ username: user.username });

  const validPassword = await bcrypt.compare(user.password, document.password);

  if (validPassword) {
    const payload = {
      username: user.username,
      isAdmin: true,
    };
    const secret = 's3cr3t'; // never store a secret in file, use .env
    const expiresIn = 60;
    const token = jwt.sign(payload, secret, { expiresIn });
    console.log(token);
    process.exit(1);
  } else {
    console.log('Unsuccessful authentication');
  }
}

run();

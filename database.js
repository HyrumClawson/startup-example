const mongodb= require('mongodb');
const MongoClient= mongodb.MongoClient;
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const repository = db.collection('repository');
const chats = db.collection('chats');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}





async function addFootageLink (newFootage){
  const result = await repository.insertOne(newFootage);
  return result;
}

function getRepository () {
  console.log("in the actual getRepository"); 
  const cursor = repository.find({});
  return cursor.toArray();
}

function getChats() {
  const cursor = chats.find({});
  return cursor.toArray();
}

async function addChat(newChatObject){
  const result = await chats.insertOne(newChatObject);
  return result;
}

async function addNewMessage(messageObject){
  const result = await chats.updateOne(
    {chatTopic: messageObject.chatname} ,
    { $push: { messageArray: { messageObject } }  }
    )

  return result;
}

module.exports = { 
  getUser,
  getUserByToken,
  createUser,
  addFootageLink, 
  getRepository, 
  getChats, 
  addChat, 
  addNewMessage
};


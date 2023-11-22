const mongodb= require('mongodb');
const MongoClient= mongodb.MongoClient;

const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
//const db = client.db('rental');
const db = client.db('startup');
const repository = db.collection('repository');
/*const*/  const chats = db.collection('chats');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addFootageLink (newFootage/* new Footage Link */){
  const result = await repository.insertOne(newFootage);
  return result;
}

function getRepository () {
  console.log("in the actual getRepository");
  // const query = {url: {}}; // according to the website this will return all the stuffs. 
  // const options = {
  //   sort: {},
  // }; // find the options that wil return all 
  const cursor = repository.find({});
  //console.log(cursor.toArray());
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
  //const result = await chats.findOne(messageObject.chatname).push(messageObject);
  //const result = await chats.find({}).toArray();
  // const cursor = chats.find({});
  // let array = cursor.toArray();


  
  // let array = [];
  // console.log("Here we are in addNewMessage");
  // await chats.find( {"chatTopic": messageObject.chatname}).forEach( element =>{
  //   console.log("inside the foreach loop");
  //   console.log(element.chatTopic);
  //   console.log(element.messageArray);

  //   array = element.messageArray.push(messageObject);
  //   console.log(array);
  // })

  

  // let object = await chats.find( {"chatTopic": messageObject.chatname}).//toArray();
  // console.log("here's what the object is");
  // console.log(object);
  // console.log(object.keys("messageArray"));
  // let array = object.keys('messageArray');
  // object.
  // console.log(array);
  // array = array.push(messageObject);
  //console.log(array);
  const result = await chats.updateOne(
    {chatTopic: messageObject.chatname} ,
    { $push: { messageArray: { messageObject } }  }
    )

//   db.students.updateOne(
//     { name: messageObject.chatname },
//     { $push: { messageArray: { messageObject } } }
//  )
 //$each: [ 90, 92, 85 ]

  // $set: {
  //   messageArray: array,
  // },
  // $currentDate: {lastUpdated: true}

  // result.forEach(element => {
  //   if (element.chatTopic === messageObject.chatname){
  //     element.messageArray.push(messageObject);
  //   }
  // });
  // chats = JSON.stringify(result);

  return result;
}

module.exports = { addFootageLink, getRepository, getChats, addChat, addNewMessage};
//module.exports = {addNewMessage, getChats};
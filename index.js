const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//get Repository of footage links
apiRouter.get('/repository', async (_req, res) => {
  //console.log("inside of get repository");
  const repository = await DB.getRepository();
  //console.log(repository);
  //console.log("made it past the await statement");
  res.send(repository);
  });

//upload a link for the repository 
apiRouter.post('/footageInfo', async (req, res) => {
  //console.log(repository);
  DB.addFootageLink(req.body);
    //repository = updateRepository(req.body, repository);
    const repository = await DB.getRepository();
    //repository = JSON.parse(repository);
    //console.log(repository);
    res.send(repository);
  });

  //I guess this will send the chat map to the api 
apiRouter.get('/Chats', async (_req, res)=> {
  const chats = await DB.getChats();
  res.send(chats);
  //res.send(JSON.stringify(Array.from(chats.entries())));
})

apiRouter.post('/newChat', async (req, res) => {
  console.log("in the post part of adding a new chat to the array");
  //chats = addNewChat(req.body, chats);
  DB.addChat(req.body);
  chats = await DB.getChats();
  res.send(chats);
})

apiRouter.post('/chatMessage', async (req, res) => {
  //chats = updateChats(req.body, chats);
  //console.log(typeofchats);
  DB.addNewMessage(req.body);
  chats = await DB.getChats();
  console.log(chats);
  res.send(chats);
})



  
  app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });








let chats = [];

let repository = [];
function updateRepository(newFootage, repository){
  //repository = array(repository);
    //console.log("Here's the repository");
    
    repository.push(newFootage);
    console.log(repository);

    
    
    

    return repository;
}

function addNewChat(newChatObject, chatMap){
  let ChatArray = [];
  //chatMap.set(newTopic, chatArray);
  // let chatObject = {
  //   chatTopic: newTopic,
  //   messageArray: ChatArray,
  // }
  chatMap.push(newChatObject);

  return chatMap;

}

function updateChats(newMessageObject, chatMap) {
  
  chatMap.forEach ( element => {
    if (element.chatTopic === newMessageObject.chatname){
      element.messageArray.push(newMessageObject);
    }
  })


  // let key = newMessageObject.chatName.value;
  // let array = chatMap.get(key);
  // array.push(newMessageObject);
  // chatMap.set(key, array);

  return chatMap;

}
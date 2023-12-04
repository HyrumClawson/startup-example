const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());


//use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);
    

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  console.log("Trying to output the authToken");
  console.log(authToken);
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});



//get Repository of footage links
secureApiRouter.get('/repository', async (req, res) => {
  const repository = await DB.getRepository();
  res.send(repository);
  });

//upload a link for the repository 
secureApiRouter.post('/footageInfo', async (req, res) => {
  const footageObject = { ...req.body, ip: req.ip};
  await DB.addFootageLink(footageObject);
    const repository = await DB.getRepository();
    res.send(repository);
  });

  //I guess this will send the chat map to the api 
secureApiRouter.get('/Chats', async (req, res)=> {
  const chats = await DB.getChats();
  res.send(chats);
  //res.send(JSON.stringify(Array.from(chats.entries())));
})

secureApiRouter.post('/newChat', async (req, res) => {
  console.log("in the post part of adding a new chat to the array");
  const newChat = { ...req.body, ip: req.ip};
  await DB.addChat(newChat);
  //DB.addChat(req.body);
  const chats = await DB.getChats();
  res.send(chats);
})

secureApiRouter.post('/chatMessage', async (req, res) => {
  const newMessage = { ...req.body, ip:req.ip};
  await DB.addNewMessage(newMessage);
  const chats = await DB.getChats();
  console.log(chats);
  res.send(chats);
})


// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});
// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

  
  // app.listen(port, () => {
  //   console.log(`Listening on port ${port}`);
  // });


  const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  peerProxy(httpService);






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
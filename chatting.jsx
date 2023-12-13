import React from 'react';
import './chatting.css';



export function Chatting() {
  const [chats, setChats]= React.useState([]);
  const [chatInput, setChatInput] = React.useState('');
  const[selectChat, setSelectChat] = React.useState('DifferentChats');
  const [newmessage, setMessage] = React.useState('');
  const [messageArray, setMessageArray] = React.useState([]);

//   console.log("Here's the current selectedChat");

  
const changeTopic = event => {
  setSelectChat(event.target.value);
  console.log("Here's the current value of selectChat");
  console.log(selectChat);
  GenerateMessages();
}

// setSelectChat(selectChat);
// function doIt() {
//   console.log("here's the thing in the other function");
//   console.log(selectChat);
//   //GenerateMessages();
// }



  const handleChange = event => {
    const newMessage = event.target.value;
    setMessage(newMessage);
  };

  const chatChange = event => {
    const newChat = event.target.value;
    setChatInput(newChat);
  }

  

    
  const click = () => {
    AddNewChat();

  }
  const add = () => {
    AddNewMessage();
  }











 
  let ChatArray = [];


async function AddNewChat(){
  let map = [];
    console.log("inside AddNewChat");

    try{
        const response = await fetch('api/Chats');
        map = await response.json();
        setChats(map);
    }
    catch {
        //if there was an error then just use the last saved chatmap
        if(localStorage.DifferentChats){
            map = JSON.parse(localStorage.DifferentChats);
            }
        else {
            map = [];
            }
        setChats(map);

    }
    
    let x = false;

    chats.forEach( element =>  {  
        if(element.chatTopic === chatInput ){
            x = true;
        }
    });

    if (x) {
        console.log('already exists');
        //output message to the DOM "Chat already exists" wait 2 seconds 
        //and then reload window
        //window.location.href = "chatting.html";
        alert("Chat Topic Exists");
        return;
    }

    else{
        let chatObject = {
            chatTopic: chatInput,
            messageArray: ChatArray,
        }
        
        try {
            const response = await fetch('/api/newChat', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                //should be the entire chatObject
                body: JSON.stringify(chatObject),
                
            });
            console.log("outside the try");
            console.log(chatObject.chatTopic);
            const chatMap = await response.json();
            setChats(chatMap);
            //localStorage.DifferentChats = JSON.stringify(Array.from(chatMap.entries()));
            localStorage.DifferentChats = JSON.stringify(chatMap);
        }
        catch {
            chats.push(chatObject);
            console.log(newChatNameEl.value);
            localStorage.DifferentChats = JSON.stringify(chats);

        }


    }
    

    //now manipulate the DOM so the list of chat array 
    window.location.href = "chatting";
    //refresh();
}
function refresh () {
   //window.location.href = "chatting.html";
}

// create a map 




async function AddNewMessage() {
 
    let message = {
        contributor: localStorage.getItem("userName"),
        message:  newmessage,
        chatname: selectChat,
        //date: 
    }

    try {
        const response = await fetch('/api/chatMessage', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            //should be the entire chatObject
            body: JSON.stringify(message),
            
        });
        console.log("Here's what the chatname is registering for the new message");
        console.log(selectChat);
        
        const chatMap = await response.json();
        setChats(chatMap);
        localStorage.DifferentChats = JSON.stringify(chatMap);
    }
    catch {
        chats.forEach (element => {
            if (element.chatTopic === message.chatname){
                element.messageArray.push(message);
            }
        })
        localStorage.DifferentChats = JSON.stringify(map);

    }

    document.querySelector("#message").value= "";

    //window.location.href = "chatting";
    

    //GenerateMessages();


}

async function GenerateMessages() {
    let map = [];
    console.log("Inside of Generate Messages");
    console.log(selectChat);


    try {
        const response = await fetch('api/Chats');
        map = await response.json();
        setChats(map);
        JSON.stringify(DifferentChats, map);
    }
    catch{
        map = JSON.parse(localStorage.DifferentChats);
        setChats(map);
    }

    let arrayOfMessages = [];
    
    chats.forEach ( element => {
        if(element.chatTopic === selectChat){
            arrayOfMessages = element.messageArray;

        }
    })
    setMessageArray(arrayOfMessages);

  
}
const ArrayOfMessages = [];
let i = 0;
messageArray.forEach ( element => {
  ArrayOfMessages.push(
    <tr key={i} id="tr">
      <td> {element.messageObject.contributor}</td>
      <td> {element.messageObject.message}</td>
      <td>Today</td>
    </tr>
  )
  i++;
});




React.useEffect ( () => {
  fetch('api/Chats')
  .then((response) => response.json())
  .then((chats) => {
    setChats(chats);
    localStorage.setItem('DifferentChats', JSON.stringify(chats));
  })
  .catch(() => {
    const chatsText = localStorage.getItem('DifferentChats');
    if (chatsText) {
      setChats(JSON.parse(chatsText));
    }
    else{
      setChats([]);
    }
  });
}, []);


const chatArray = [];


chats.forEach( (element => {
  chatArray.push(
    <option key ={i}id = "output">{element.chatTopic}</option>
  );
  i++;
}))


















  return (
    <main id="main">
      <h1>
      <label >Choose a Chat Topic</label> 
    <select  name="ChatTopics" id="ChatTopics" 
    
    /*onChange={(e) => setSelectChat(e.target.value) }*/
    onChange={changeTopic} value={selectChat} 
    // onClick={changeTopic} 
    > 
        {chatArray}
    </select>
    </h1>

    <div>
  
      <table>
        <thead>
          <tr>
            <th className = "t1">Name</th>
            <th className = "t1">Message</th>
            <th className = "t1">Date</th>
          </tr>
        </thead>
        <tbody id = "tbody">
          {ArrayOfMessages}
        </tbody>
      </table>
      </div>
      <div>

        <div>

          <label>Compose a new message</label>
          <input type="text" id="message" name="message" placeholder ="New Message"
          onChange={handleChange} />

          <button className="btn btn-primary" 
          onClick={add} >Send</button>
  
          
        </div>
        
        <div>
          <label id="chattopic">Start A New Chat Topic</label>
          <input type="text" id="chattopic" name="chattopic" placeholder ="New Chat Topic" 
          onChange={chatChange} 
          />
          <button className="btn btn-primary" onClick= {click} >Start</button>
        </div>
        

      </div>


    </main>
  );
}
// Window.onload = showChats();

let ChatArray = [];
//let map = new Map([]);
let map = [];


let DifferentChats = new Map([
    ["Favorite Films", ChatArray] 
  ]);


let chatMap = JSON.stringify(DifferentChats);
localStorage.setItem("chattopics", chatMap);



async function AddNewChat(){
    console.log("inside AddNewChat");
    //let map = new Map([]);
    // this is where map was declared before;

    try{
        // get the latest map from the service
        const response = await fetch('api/Chats');
        //console.log("This is what the response is returning");
        //console.log(response.json());
        //let array = [];
        //array = await response.json();
        //console.log("This is what's in the array");
        //console.log(array[0].chatName.value);
        map = await response.json();
    }
    catch {
        //if there was an error then just use the last saved chatmap
        if(localStorage.DifferentChats){
            map = JSON.parse(localStorage.DifferentChats);
            }
        else {
            map = [];
            }

    }
    
    const newChatNameEl = document.querySelector("#chattopic");

    let chatname = newChatNameEl.value;

    //let x = map.has(newChatNameEl);
    let x = false;

    map.forEach( element =>  {  
        //console.log(element);
        console.log(element.chatTopic);
        console.log(chatname);
        if(element.chatTopic === chatname ){
            x = true;
        }
    });

    if (x) {
        console.log('already exists');
        //output message to the DOM "Chat already exists" wait 2 seconds 
        //and then reload window
        window.location.href = "chatting.html";
        return;
    }

    else{
        let chatObject = {
            chatTopic: chatname,
            messageArray: ChatArray,
        }
        //map.push(chatObject);
        //map.set(chatname, ChatArray); // adds the new chat with empty array to map

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
            //localStorage.DifferentChats = JSON.stringify(Array.from(chatMap.entries()));
            localStorage.DifferentChats = JSON.stringify(chatMap);
        }
        catch {
            //map.set(newChatNameEl.value, ChatArray);
            map.push(chatObject);
            console.log(newChatNameEl.value);
           // let chatMap = JSON.stringify(map);
            localStorage.DifferentChats = JSON.stringify(map);

        }

    }
    
    
//     else{
//         map.set(newChatNameEl.value, ChatArray);
//         console.log(newChatNameEl.value);
//         let chatMap = JSON.stringify(map);
//         localStorage.DifferentChats = JSON.stringify(Array.from(map.entries()));
//    }

    //DifferentChats = JSON.parse(localStorage.getItem("chattopics"));

    // for (let [key, value] of newMap) {
    //     console.log(key + " is " + value);
    // }

//actually I probably could just have it add the new chat topic to the DOm instead of going through the entire list and adding it. 
    // map.forEach( (values,keys) =>  {  
    //     AddChatArraytoDom(keys);
    // });
    console.log(typeof(map));
    map.forEach( element => {
        AddChatArraytoDom(element.chatTopic);
    })

    //now manipulate the DOM so the list of chat array 

    refresh();

   
}

function refresh () {
    window.location.href = "chatting.html";
}

// create a map 


  function AddChatArraytoDom(keys){
    console.log("made it into AddChatArraytoDom");

    const list = document.getElementById('ChatTopics');
    var newOp = document.createElement("option");
    newOp.text = keys;
    console.log(keys);
    newOp.value = keys;
    //newOp.onclick = GenerateMessages();
    newOp.id = "output";
    list.options.add(newOp);



   // const start = document.getElementById("output");
   // const ChatTopics = document.getElementById("ChatTopics");
    //const output = document.createElement("option");

    //<option value="directors">Best Directors</option>

    //const content = document.createTextNode(`<a href= "${element.url}">${element.title}</a>`);

    //output.appendChild(content);
    //output.innerHTML = "Hello World";

   // output.innerHTML = '<option value ="${keys}"> ${keys} </option>;


   // output.innerHTML = `<a href= "${element.url}">${element.title}</a>;
    ///** value="${element.value}"**/

   // ChatTopics.insertBefore(output, start);
}

async function AddNewMessage() {
    // now I just have to add the api stuff in here and then we'll be good to go. 


    console.log("made it into AddNewMessage");
    const outputEl = document.querySelector("#output");
    const chatOptions = document.querySelector("#ChatTopics");
    console.log(chatOptions.value);

    const messageEl = document.querySelector("#message");

    console.log(messageEl.value);

    try {
        const response = await fetch('api/Chats');
        map = await response.json();
        JSON.stringify(DifferentChats, map);

    }
    catch {
        //if there's an error just get it from the local storage
        map = JSON.parse(localStorage.DifferentChats);
    }
    //map = new Map(JSON.parse(localStorage.DifferentChats));
    //map = JSON.parse(localStorage.DifferentChats);

    let message = {
        contributor: localStorage.getItem("userName"),
        message:  messageEl.value,
        chatname: chatOptions.value,
        //date: 
    }

    try {
        const response = await fetch('/api/chatMessage', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            //should be the entire chatObject
            body: JSON.stringify(message),
            
        });
        
        const chatMap = await response.json();
        localStorage.DifferentChats = JSON.stringify(chatMap);
    }
    catch {
        map.forEach (element => {
            if (element.chatTopic === message.chatname){
                element.messageArray.push(message);
            }
        })
        localStorage.DifferentChats = JSON.stringify(map);

    }




    // map.forEach ( element => {
    //     if(element.chatTopic === chatOptions.value){
    //         element.messageArray.push(message);
    //     }
    // })

    // let key = chatOptions.value;
    // let array = map.get(key);

    // array.push(message);
    // map.set(key, array);

    //localStorage.DifferentChats = JSON.stringify(Array.from(map.entries()));
    //localStorage.DifferentChats = JSON.stringify(map);
refresh();
}

async function GenerateMessages(e) {
    // essentially 
    console.log("If it's working then this will show up");
    const outputEl = document.querySelector("#output");
    const chatOptions = document.querySelector("#ChatTopics");
    console.log(chatOptions.value);

    //map = new Map(JSON.parse(localStorage.DifferentChats));
    try {
        const response = await fetch('api/Chats');
        map = await response.json();
        JSON.stringify(DifferentChats, map);
    }
    catch{
        map = JSON.parse(localStorage.DifferentChats);
    }

    //arrayOfMessages = map.get(chatOptions.value);
    let arrayOfMessages = [];
    map.forEach ( element => {
        if(element.chatTopic === chatOptions.value){
            arrayOfMessages = element.messageArray;
            // element.messageArray.forEach ( el => {
            //     manipulateMessages(el);
            // })

        }
    })

    let parent = document.getElementById('tbody')
    parent.innerHTML = "";

    arrayOfMessages.forEach( element =>  {  
        // if element.chatTopic == 
        console.log(element);
        manipulateMessages(element);
    });

    //refresh();

    // add the manipulation of the dom after this
    


}

function manipulateMessages (element) {
    const start = document.getElementById("tr")
    const main = document.getElementById("tbody");
    const output = document.createElement("tr");
    console.log("in manipulating messages");
    console.log(element);
    console.log(element.messageObject.contributor);
    console.log(element.message);
    output.innerHTML = `<td>  ${element.messageObject.contributor}  </td><td>  ${element.messageObject.message}  </td><td>  Today  </td>`;

    main.insertBefore(output, start);
    //document.getElementById("heading").innerHTML = `Hello, ${name}!`;


    // const start1 = document.getElementById("td1");
    // const start2 = document.getElementById("td2");
    // const start3 = document.getElementById("td3");
    // //const main = document.getElementById("tr");
    // const output1 = document.createElement("td");
    // const output2 = document.createElement("td");
    // const output3 = document.createElement("td");

    // console.log(element.contributor);
    // let name = element.contributor;
    // output1.innerHTML = "name";
    // output2.innerHTML = "message";
    // output3.innerHTML = "today";
    //'<td>${name}</td><td>"${element.message}"</td><td>"Nothing</td>';

   // output.innerHTML = `<a href= "${element.url}">${element.title}</a>`;
    
    // main.insertBefore(output1, start1);
    // main.insertBefore(output2, start2);
    // main.insertBefore(output3, start3);


    // const list = document.getElementById('tr');
    // var newRow = document.createElement("tr");
    // newRow.td1 = element.contributor;
    // newRow.td2 = element.message;
    // newRow.td3 = "today";
    // //newOp.onclick = GenerateMessages();
    // //newOp.id = "output";
    // list.tr.add(newRow);

}


async function showChats () {
    console.log("into showChats");
    let ChatArray = [];

    // let DifferentChats = new Map([
    //     ["Favorite Films", ChatArray] 
    //   ]);
    // localStorage.DifferentChats = JSON.stringify(Array.from(DifferentChats.entries()));
    
    console.log(localStorage.DifferentChats);

    try {
        const response = await fetch('api/Chats');
        map = await response.json();

        JSON.stringify(DifferentChats, map);

    }
    catch{
        if (localStorage.DifferentChats){
        }
        else{
            let DifferentChats = [];
            localStorage.DifferentChats = JSON.stringify(map);
        }
        //map = new Map(JSON.parse(localStorage.DifferentChats));
        map = JSON.parse(localStorage.DifferentChats);
    }
    

    // map.forEach( (values,keys) =>  {  
    //     console.log(keys);
    //     AddChatArraytoDom(keys);
    // });
    
    map.forEach( (element => {
        console.log("This is what the element is");
        console.log(JSON.stringify(element.chatTopic));
        AddChatArraytoDom(element.chatTopic);
    }))


 }
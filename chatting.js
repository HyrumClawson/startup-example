// Window.onload = showChats();

let ChatArray = [];



let DifferentChats = new Map([
    ["Favorite Films", ChatArray] 
  ]);


  let chatMap = JSON.stringify(DifferentChats);
    localStorage.setItem("chattopics", chatMap);

//   let userMessage = {
//     message : "Nothing was written",
//     contributor : localStorage.getItem("userName"),

//   }

//   DifferentChats.get("genres").push(userMessage)

//document.body.onload = "";

// function anything(){
//     console.log("it went into anything");
// }

function AddNewChat(){
    console.log("inside AddNewChat");


    
    //localStorage.DifferentChats = JSON.stringify(Array.from(DifferentChats.entries()));
    if(localStorage.DifferentChats){
    map = new Map(JSON.parse(localStorage.DifferentChats));
    }
    else {
    map = new Map([
          ]);
    }

    const newChatNameEl = document.querySelector("#chattopic");


    //let map = JSON.parse(localStorage.getItem("chattopics"));
    //var newMap = new Map(existingMap)

    let chatname = newChatNameEl.value;
    let x = map.has(chatname);
    
    if (x) {
        console.log('already exists');
        //output message to the DOM "Chat already exists" wait 2 seconds 
        //and then reload window
        window.location.href = "chatting.html";
        return;
    }
    else{
        map.set(newChatNameEl.value, ChatArray);
        console.log(newChatNameEl.value);
        let chatMap = JSON.stringify(map);
        localStorage.DifferentChats = JSON.stringify(Array.from(map.entries()));
   }
    //DifferentChats = JSON.parse(localStorage.getItem("chattopics"));

    // for (let [key, value] of newMap) {
    //     console.log(key + " is " + value);
    // }

//actually I probably could just have it add the new chat topic to the DOm instead of going through the entire list and adding it. 
    map.forEach( (values,keys) =>  {  
        AddChatArraytoDom(keys);
    });

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

function AddNewMessage() {
    console.log("made it into AddNewMessage");
    const outputEl = document.querySelector("#output");
    const chatOptions = document.querySelector("#ChatTopics");
    console.log(chatOptions.value);

    const messageEl = document.querySelector("#message");

    console.log(messageEl.value);

    map = new Map(JSON.parse(localStorage.DifferentChats));

    let message = {
        contributor: localStorage.getItem("userName"),
        message:  messageEl.value,
        //date: 
    }
    let key = chatOptions.value;
    let array = map.get(key);

    array.push(message);
    map.set(key, array);

    localStorage.DifferentChats = JSON.stringify(Array.from(map.entries()));


    refresh();
}

function GenerateMessages(e) {
    console.log("If it's working then this will show up");
    const outputEl = document.querySelector("#output");
    const chatOptions = document.querySelector("#ChatTopics");
    console.log(chatOptions.value);

    map = new Map(JSON.parse(localStorage.DifferentChats));

    arrayOfMessages = map.get(chatOptions.value);

    let parent = document.getElementById('tbody')
    parent.innerHTML = "";

    arrayOfMessages.forEach( element =>  {  
        console.log(element);
        manipulateMessages(element);
    });

   // refresh();

    // add the manipulation of the dom after this
    


}

function manipulateMessages (element) {
    const start = document.getElementById("tr")
    const main = document.getElementById("tbody");
    const output = document.createElement("tr");

    output.innerHTML = `<td>  ${element.contributor}  </td><td>  ${element.message}  </td><td>  Today  </td>`;

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


function showChats () {
    console.log("into showChats");
    let ChatArray = [];

    // let DifferentChats = new Map([
    //     ["Favorite Films", ChatArray] 
    //   ]);
    // localStorage.DifferentChats = JSON.stringify(Array.from(DifferentChats.entries()));
    
    console.log(localStorage.DifferentChats);

    
    if (localStorage.DifferentChats){
    }
    else{
    let DifferentChats = new Map([
        ["Favorite Films", ChatArray] 
      ]);
    localStorage.DifferentChats = JSON.stringify(Array.from(map.entries()));
    }

    map = new Map(JSON.parse(localStorage.DifferentChats));

    map.forEach( (values,keys) =>  {  
        console.log(keys);
        AddChatArraytoDom(keys);
    });


 }
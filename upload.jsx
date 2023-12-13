import React from 'react';
import "./upload.css";

//import {Contributors} from './contributors';
//import { OtherSocketStuff } from './otherSocketStuff';


export function Upload(props) {
  let ArrayofFootage = [];

  const [repository, setRepository] = React.useState([]);
  const [footageObject, setFootageObject] = React.useState({});
  const [url, setUrl] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [contributor, setContributor] = React.useState('');
  const [description, setDescription] = React.useState('');


  const newTitle = event => {
    setTitle(event.target.value);
  }
  const newUrl = event => {
    setUrl(event.target.value);
  }

  const newContributor = event => {
    setContributor(event.target.value);
  }

  const newDescription = event => {
    setDescription(event.target.value);

  }

  const loadUp = () => {
    upload();
  }

  const click = () =>{
    generateRepository();
  }






// const GameEndEvent = 'gameEnd';
// const GameStartEvent = 'gameStart';



// function configureWebSocket() {
//   console.log("In the configure WebSocket function");
//   const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
//   this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
//   this.socket.onopen = (event) => {
//     this.displayMsg('system', 'repository', 'connected');
//   };
//   this.socket.onclose = (event) => {
//     this.displayMsg('system', 'repository', 'disconnected');
//   };
//   this.socket.onmessage = async (event) => {
//     const msg = JSON.parse(await event.data.text());
//     console.log("does it make it into the onmessage part?");
//     if (msg.type === GameEndEvent) {
//       this.displayMsg('contributor', msg.from, `added ${msg.value.title} to the repository`);
//     } else if (msg.type === GameStartEvent) {
//       this.displayMsg('contributor', msg.from, `started a new game`);
//     }
//   };
// }

// function displayMsg(cls, from, msg) {
//   //switch the query selector to the thing in the html
//   const chatText = document.querySelector('#player-messages');
//   chatText.innerHTML =
//     `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
// }

// function broadcastEvent(from, type, value) {
//   console.log("in the broadcast event");
//   const event = {
//     from: from,
//     type: type,
//     value: value,
//   };
//   // might need to include  this before the socket
//   this.socket.send(JSON.stringify(event));
// }




// // this code was just meant to check if the object was actually being added to the array
// function printToConsole () {
//     let array = JSON.parse(localStorage.getItem("array"));
//     array.forEach(element => {
//       console.log(element.url)
//       console.log(element.title)
//       console.log(element.description)
//     })
//   }
  

//   window.addEventListener("load", configureWebSocket() ); 







// essentially make an array

// then create the object

// then push the object to the back of the array 

// then later make a page where the stuffs can be displayed. 


//put the array in local storage

async function upload() {
  console.log("in upload");
  // calling the configure web socket function
  //configureWebSocket();
    const urlEl = document.querySelector("#url");
    const titleEl = document.querySelector("#title");
    const descriptionEl = document.querySelector("#description")
    localStorage.setItem("url", urlEl.value);
    localStorage.setItem("title", titleEl.value);
    localStorage.setItem("description", descriptionEl.value);

   
    //create a footage object 
    let footageInfo = {
        url: url,
        title: title,
        description: description,
        contributor: localStorage.getItem("userName"),
    }

    try {
      const response = await fetch('/api/footageInfo', {
        method: 'POST',
        headers: {'content-type': 'application/json'}, //this tells it that it's goning to be in JSON
        body: JSON.stringify(footageInfo),
      });
      console.log(response);
      console.log("Got past the post");


      // Let other contributors know you've contributed 
      //you might have to change up the footageInfo thing
      // might have to come back and fix this 
      this.broadcastEvent(localStorage.getItem("userName"), GameEndEvent, footageInfo);

      // Store what the service gave us as the repository

      const repositoryArray = await response.json();
      setRepository(repositoryArray);
      localStorage.setItem('array', JSON.stringify(repository));

    } catch {
      // If there was an error then just get and set the repository locally
      updateRepositoryLocal(footageInfo);
      console.log("IN the catch");

    }

    function updateRepositoryLocal(footageInfo){
      let stringFootage = JSON.stringify(footageInfo);
      localStorage.setItem("footageObject", stringFootage);

    //this should grab the array that's locatd in local storage, and then push the footage info 
    //object onto the array and then set the array back out to local storage
      if(localStorage.array){
        ArrayofFootage = JSON.parse(localStorage.getItem("array"));
        ArrayofFootage.push(footageInfo);
      }
      else{
        ArrayofFootage.push(footageInfo);
      }
      let arrayString = '';
      arrayString = JSON.stringify(ArrayofFootage);
      localStorage.setItem("array", arrayString);
      
    }
   
//potentially fixx this 
   //window.location.href = "upload.html";
  document.querySelector("#url").value= "";
  document.querySelector("#title").value="";
  document.querySelector("#description").value="";

  }





  // Now i just have to add the DOM manipulation stuff so that the array will output all it's info
  // so that people can look at the list. 



  async function generateRepository() {
    // I need to change this so that it draws from the API
    let repositoryArray = [];
    try {
      // Get the latest updated repository from the service
      const response = await fetch('/api/repository');
      repositoryArray = await response.json();
      setRepository(repositoryArray);
  
      // Save the repository in case we go offline in the future
      localStorage.setItem('array', JSON.stringify(repositoryArray));
    } catch {
      // If there was an error then just use the last saved scores
      //const RepositoryText = localStorage.getItem('array');
      //if (RepositoryText) {
        repositoryArray = JSON.parse(localStorage.getItem("array"));
        setRepository(repositoryArray);
     // }
    }

    
  }

  let RepoArray = [];
    repository.forEach(element => {
      RepoArray.push(
        <div>
          <a href= {element.url}>{ element.title}</a> : {element.description}
        </div>
      )

    })









 








  return (
    <main className = "main">
      {/* <Contributors userName={props.userName}/>
      <OtherSocketStuff userName={props.userName}/> */}
      <div></div>
      <div id="player-messages"></div>
      <h2>Upload Film Footage URL</h2>

      <div>
        <div>
        <label className="stuff" for="url">URL of Footage</label>
        <input type="text" id="url" placeholder="URL Here" 
        onChange={newUrl}/>
        </div>
        
        <div>
        <label for="title">Title</label>
        <input type="text" id="title" placeholder="Give Footage a Title" 
        onChange={newTitle}/>
        </div>

       <div>
        <label for="description">Description</label>
        <input type="text" id="description" placeholder="Describe the Footage" 
        onChange={newDescription}/>
        </div>

        <button type="submit" className="btn btn-primary" 
        onClick = {loadUp}
        /*onclick = "upload()"*/ >Upload
        </button>
      </div>
      
      <div>
        <button className="btn btn-primary" 
        onClick = {click}
        /*onclick="generateRepository()"*/>Look At Repository</button>
      </div>

      <div id="output" className = "divStyle">{RepoArray}</div>
     
    </main>
  );
}
let ArrayofFootage = [];

// this code was just meant to check if the object was actually being added to the array
function printToConsole () {
    let array = JSON.parse(localStorage.getItem("array"));
    array.forEach(element => {
      console.log(element.url)
      console.log(element.title)
      console.log(element.description)
    })
  }

// essentially make an array

// then create the object

// then push the object to the back of the array 

// then later make a page where the stuffs can be displayed. 


//put the array in local storage

async function upload() {
  console.log("in upload");
    const urlEl = document.querySelector("#url");
    const titleEl = document.querySelector("#title");
    const descriptionEl = document.querySelector("#description")
    localStorage.setItem("url", urlEl.value);
    localStorage.setItem("title", titleEl.value);
    localStorage.setItem("description", descriptionEl.value);

   
    //create a footage object 
    let footageInfo = {
        url: urlEl.value,
        title: titleEl.value,
        description: descriptionEl.value,
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

      // Store what the service gave us as the repository

      const repositoryArray = await response.json();
      localStorage.setItem('array', JSON.stringify(repositoryArray));

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
      arrayString = JSON.stringify(ArrayofFootage);
      localStorage.setItem("array", arrayString);
      
    }
   

   window.location.href = "upload.html";

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

      //repositoryArray = JSON.parse(localStorage.getItem("array"));
  
      // Save the repository in case we go offline in the future
      localStorage.setItem('array', JSON.stringify(repositoryArray));
    } catch {
      // If there was an error then just use the last saved scores
      //const RepositoryText = localStorage.getItem('array');
      //if (RepositoryText) {
        repositoryArray = JSON.parse(localStorage.getItem("array"));
     // }
    }

    repositoryArray.forEach(element => {

        outputData(element);

    })
  }







  function outputData(element) {
    
    console.log(element);
    
    const start = document.getElementById("output");
    const main = document.getElementById("main");
    const output = document.createElement("div");

    output.innerHTML = `<a href= "${element.url}">${element.title}</a>`;
    
    main.insertBefore(output, start);


  }
  


  
  


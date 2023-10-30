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

function upload() {
    const urlEl = document.querySelector("#url");
    const titleEl = document.querySelector("#title");
    const descriptionEl = document.querySelector("#description")
    localStorage.setItem("url", urlEl.value);
    localStorage.setItem("title", titleEl.value);
    localStorage.setItem("description", descriptionEl.value);

   
    //create a footage object 
    footageInfo = {
        url: urlEl.value,
        title: titleEl.value,
        description: descriptionEl.value,
        contributor: localStorage.getItem("userName"),
    }

    console.log(footageInfo);
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

    console.log(JSON.parse(localStorage.getItem("array")).length);

    console.log("This is what is in the array in local storage");
    printToConsole();

    // just circle back to the upload page after they click the button
    window.location.href = "upload.html";
    // console.log("Length of Array Stored in local storage")
    // console.log(JSON.parse(localStorage.getItem("array").length));
  }

  // Now i just have to add the DOM manipulation stuff so that the array will output all it's info
  // so that people can look at the list. 



  function generateRepository() {
    let array = JSON.parse(localStorage.getItem("array"));
    array.forEach(element => {

        //console.log(element);
        outputData(element);

    })

  }

  function outputData(element) {
    //document.createElement("div").innerHTML = `<a href= "${localStorage.getItem("url")}">${localStorage.getItem("title")}</a>`;
    
    
    const start = document.getElementById("output");
    const main = document.getElementById("main");
    const output = document.createElement("div");

    //const content = document.createTextNode(`<a href= "${element.url}">${element.title}</a>`);

    //output.appendChild(content);
    output.innerHTML = `<a href= "${element.url}">${element.title}</a>`;
    
    main.insertBefore(output, start);

    //output.innerHTML = `<a href= "${localStorage.getItem("url")}">${localStorage.getItem("title")}</a>`;
    // document.body.appendChild("output");
    //output.appendChild(output);
  }
  

  //<a class="nav-link active" href="index.html">Home</a>
  
  


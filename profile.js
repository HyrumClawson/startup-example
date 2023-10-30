let username = document.getElementById("Username")
username.innerText = localStorage.getItem("userName")


function getUserInfo() {
    return localstorage.getItem("userInfo")
}

getUserInfo.password


// okay I assume that'll grab the user'sInfo 
// now just got to manipulate the DOM or whatever so that "user's name" is replace with the actual username 
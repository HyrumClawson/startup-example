import React from 'react';
import './profile.css';

export function Profile() {
let username = '';
const name = localStorage.getItem("userName");
if(name){
  username = name;
}
else{
  username = "Not Logged In";
}

  return (
    <main>
      
      <div id="picture" className="picture-box"><img className = "image" width="200px" src="ClassicFilm.jpg" alt="User'sProfilePic" /></div>
      <div>
      <p id ="Username" className = "text">{username}</p>
      </div>
      

    </main>
  );
}
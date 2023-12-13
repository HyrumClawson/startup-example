import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import './main.css';
import './index.css';
import { AuthState } from './login/authState';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Upload } from './upload/upload';
import { About } from './about/about';
import { Chatting } from './chatting/chatting';



export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  
    return (
      <BrowserRouter className = 'styling'>
        <div className = "styling">
        <header className ="container-fluid fixed-top bg-dark">
    
      <nav className="navbar  navbar-dark">
        <div className="navbar-brand title">FilmDefined<sup>&reg;</sup></div>
        <menu className="navbar-nav">
          <li className ="nav-item">
            <NavLink className="nav-link active" to=''>Home</NavLink>
          </li>
          <li className ="nav-item">
            <NavLink className="nav-link active" to='upload'>Upload</NavLink>
          </li>
          <li className ="nav-item">
            <NavLink className="nav-link active" to='chatting'>Chats</NavLink>
          </li>
          <li className ="nav-item">
            <NavLink className="nav-link active" to='profile'>Profile</NavLink>
          </li>
          <li className ="nav-item">
            <NavLink className="nav-link active" to='about'>About Us</NavLink>
          </li>
        </menu>
      </nav>
    </header>

  <Routes >
    <Route 
     path='/'
     element={
       <Login
         userName={userName}
         authState={authState}
         onAuthChange={(userName, authState) => {
           setAuthState(authState);
           setUserName(userName);
         }}
       />
     }
     exact />
    <Route path='/upload' element={<Upload />} />
    <Route path='/chatting' element={<Chatting />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/about' element={<About />} />
    <Route path='*' element={<NotFound />} />
  </Routes>


    <footer className="bg-dark text-white-50">
      <div className="container-fluid">
        <span className="text-reset">Author Name(s)</span>
        <a className="text-reset" href="https://github.com/HyrumClawson/startup-example.git">myGitHub</a>
      </div>
    </footer>

    </div>
    </BrowserRouter>
    );
  //return <div className='body bg-dark text-light'>App will display here</div>;
}


function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
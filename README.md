# startup-example
an example start up project

Change from my development environment 

Change from GitHub

This [Link](https://github.com/HyrumClawson/startup-example/blob/main/notes.md) will take you to my notes.md


# Startup-Outline - FilmDefined

## Description Deliverable

### Elevator Pitch

Have you ever been enjoying a film, taking in the gorgeous visuals, and wondered what type of techniques the director and cinematographer used to create the specific scene you're watching? Or perhaps you're hoping to go into video production and would like to get some ideas of how to shoot a scene more tastefully? Well now you can thanks to "hyrumcstartup.click" (we're still working on the name), an application where users can create personal accounts and then find, share, and save links to scenes or footage that visually define different filmic concepts. Users can involve themselves in chatgroups that discuss important film ideas, or vote for scenes that demonstrate a film quality the best. So open up a tab and navigate to "hyrumcstartup.click" today! Gee willikers that was a bit cheesy wasn't it? 

### Design
![Design1](https://github.com/HyrumClawson/startup-example/assets/144285497/c1d9cf11-9c55-48cf-a6b9-e6f12aed4256)

![Design2](https://github.com/HyrumClawson/startup-example/assets/144285497/bce47b78-288a-4cbd-ac47-7f3aedd541d3)



### Key Features
* Creation of personal accounts
* Secure login to account through https
* Ability to upload footage links with text description
* Chatting on different film ideas
* Archiving of other users' uploaded links to personal archive through persistent storage
* Ability of admin to block/delete certain chats

### Technologies
* HTML - Correctly use HTML to give structure to my application. At the moment I'm planning on using 4 different HTML pages
  * A home page
  * A user's profile page
  * Uploading link page
  * Group chat page  
* CSS - I will use CSS to give style to my HTML pages through different use of colors, borders, and visuals. 
* JavaScript - Will provide login code along with displaying group chat input of others as well as the user. 
* Service - Backend service for:
  *  Login
  *  uploading footage links with description
  *  searching archive for footage links
* DB - stores user's footage links, login information, and chat responses
* Login - will allow user to access their account and their stored information. Information will not be stored unless the user has an account. 
* WebSocket - Users using group chat will see other users' input broadcast into the chat
* React - All of this will operate within the React web framework


## HTML Deliverable

### Accomplished So Far

* Index.html - added the title of my website to the top. Links to the different pages, and a place for the user to login so they can go to their profile
* about.html - has description of my website's functionalities and an image of classic hollywood era film "Casablanca" which is just a placeholder image for the moment. Will change the img and the quote every time page is reloaded randomly
* chatting.html - given the basic layout in simple format as to how chats will be used and selected. Also included a place in which to create a new chat topic
* profile.html - created a place where after either logging in or creating an account the user will be directed to their profile page. This includes links to the uploading page and the chatting page which only people with an account can use. Also has placeholder image where profile pic will be.
* signup.html - very similar to the login page, but this is where people can create their account. After making an account they will be directed to their newly created profile page.
* upload.html - this is where users can upload url links to scenes/footage of different filmic concepts as well as input a title and a description.

## CSS Deliverable

### Accomplished So Far

* main.css - applied the main.css to the different html pages of my web application to give it padding, margins, and flex.
* bootstrap - used various bootstrap css attributes throughout the web application.
* Each html page got a css page that often times had very simplistic css to give various design to the pages.


## JavaScript Deliverable

### Accomplished So Far

* First off can I just say what an absolute pain it was typing up all this code, and debugging, and testing. Howver, after all of that I've now got some very rudimentary functions for your web browsing pleasure. These include...
* login.js/profile.js - The ability to "login" to a profile. Very simple. You input your username and your password (which I'll incorporate later) and then you are directed to your "profile" where your username will be displayed thus signifying that you are on your profile page. How exciting. 
* upload.js - the ability to upload a url link to a repository stored on the local storage. You need to type in the link of the scene you want to upload followed by a title, and then a description. If you then click the "look at repository" button the DOM will be modified to show links that others have uploaded to the website that when clicked will take you to the footage if the url was input correctly.
* chatting.js - the ability to write some messages into the various different chats that are stored underneath the "choose a chat topic" dropdown menu list. You can even start your own chat **gasp** if you input some chat title into the "start a new chat topic" block. In order to see the messages that are in the chat for the topic you need to select the topic from the dropdown menu and then the DOM will be manipulated to see all the messages that have been put into that particular chat and even the person who wrote the message. I'll actually add the date code at a later time though don't you fret.
* Just to note when you write a message into a particular chat and press the "send" button the page will reload and the chat will disappear for a time, but don't you worry! Just simply select the chat topic that you wrote your message into and you'll see your message proudly displayed there waiting for others to make rude and deprecating comments on. I'll iron it out later so that the messages will continue to display even when you send your message into it.
* And yeah hopefully that'll do the trick for satisfying everything. 


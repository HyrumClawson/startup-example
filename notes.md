# Notes.md

## Day 1 (of using the Notes.md)

### What We Learned

Frankly I learned quite a bit from messing around with the git commit. I'm still a little fuzzy about using in VS code because there are so many random tabs and it looks so confusing. But I mostly have got it down. 

**Man oh man is it sort of a headache, but it'll be so cool when all of this becomes second nature**

Some basic Git commands are:
```
git status - 
git add
git commit
```

This [link](https://github.com/webprogramming260/.github/blob/main/profile/essentials/gitHub/gitHub.md) takes you to some more commands and explanations/examples of ```git commands``` 


## Creating My Web Server
### My public IP address
http://52.21.167.206

**Command to SSH into my Web Server**
```
 ssh -i [key pair file] ubuntu@[ip address]
```

## Cascading Style Sheets (notes from the github repository)
* With CSS a web programmer can animate the page, deploy custom fonts, respond to user actions, and dynamically alter the entire layout of the page based on the size of a device and its orientation.

```
p {
  font-family: sans-serif;
  font-size: 2em;
  color: navy;
  text-shadow: 3px 3px 1px #cccccc;
}
```
* The selector p selects all paragraph elements in the HTML document. The four specified declarations then: 1) change the font to use a sans-serif font, 2) increase the font size to be twice as big as the default font, 3) change the text color to be navy, and 4) create a gray shadow for the text. The result looks like this.

![image](https://github.com/HyrumClawson/startup-example/assets/144285497/d21d05f1-8657-44d4-b7e6-c3729d90a1a2)


### Associating CSS with HTML

There are three ways that you can associate CSS with HTML. The first way is to use the style attribute of an HTML element and explicitly assign one or more declarations.

```
<p style="color:green">CSS</p>
```

The next way to associate CSS is to use the HTML style element to define CSS rules within the HTML document. The style element should appear in the head element of the document so that the rules apply to all elements of the document.

```
<head>
  <style>
    p {
      color: green;
    }
  </style>
</head>
<body>
  <p>CSS</p>
</body>
```
The final way to associate CSS is to use the HTML link element to create a hyperlink reference to an external file containing CSS rules. The link element must appear in the head element of the document.

```
<link rel="stylesheet" href="styles.css" />
```
styles.css
```
p {
  color: green;
}
```

All of the above examples are equivalent, but using the link element usually is the preferred way to define CSS.

### Cascading Styles

Because elements inherit the rules applied to their parents you often end up with the same declaration property applied to a single element multiple times. For example, we might set color property for all body elements to be red, and then paragraph elements to be green, and then span elements to be blue, and finally use a style element on a specific span to be black.

In this case, the rules cascade down from the highest nodes in the DOM tree to the lowest level. Any declaration property defined at a lower level will override the higher declaration. You can see this happening if you use the browser's debugger.

### The Box Model 

CSS defines everything as boxes. When you apply styles, you are applying them to a region of the display that is a rectangular box. Within an element's box there are several internal boxes. The innermost box holds the element's content. This is where things like the text or image of an element is displayed. Next comes the padding. The padding will inherit things like the background color. After padding is the border, which has properties like color, thickness and line style. The final box is the margin. The margin is considered external to the actual styling of the box and therefore only represents whitespace. It is important to understand each of these boxes so that you can achieve the desired visual result by applying the proper CSS declaration.

![image](https://github.com/HyrumClawson/startup-example/assets/144285497/3192d429-bb8a-4a5e-b804-bdbeaee21208)

By default, the width and height of an element is defined by the width and height of the content box. You can change the box-sizing CSS property from the default value of content-box to border-box in order to redefine the width and height to also include the padding and the border. This often makes it easier to style elements when their visual size matches their actual size.

## CSS Declarations

This [link](https://github.com/webprogramming260/.github/blob/main/profile/css/introduction/introduction.md) 
takes you to some different declarations within CSS as well as some explanations. 



## CSS Fonts

Choosing appropriate fonts is a key web application design characteristic. A beautiful modern font will make your application enjoyable to use. Picking a hard to read font, an overused font, or using too many fonts will turn users away.

The CSS font-family property defines what fonts should be used. The property value represents an ordered list of fonts. The first font in the list that is available will be used. This ability to select from a list of fonts is important because different operating systems have different default fonts and your first choice may not be available.

In addition to referencing standard fonts found on the user's computer you can specify a font that you provide with your application. That way your application is guaranteed to always look the same. In order to have the browser load a font you use the @font-face rule and provide the font name and source location.

```
@font-face {
  font-family: 'Quicksand';
  src: url('https://cs260.click/fonts/quicksand.woff2');
}

p {
  font-family: Quicksand;
}
```

If you do not want to host font files on your server, then you can load them from a font provider. For example, Google provides a large selection of open source fonts that you can use without paying any royalties. The easiest way to use Google fonts is to use a CSS import statement to reference the Google Font Service. This will automatically generate the CSS for importing the font.

```
@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');

p {
  font-family: 'Rubik Microbe';
}
```


## CSS Animation

Using CSS to animate your components is an easy way to make your application feel alive and interactive. You create CSS animations using the animation properties and defining keyframes for what the element should look like at different times in the animation. Let's walk through an example.

We have a paragraph of centered text and we want it to zoom in until its size is 20% of the view height.

```
p {
  text-align: center;
  font-size: 20vh;
}
```

To make this happen we specify that we are animating the selected elements by adding the animation-name property with a value of demo. This name refers to the name of the keyframes that we will specify in a minute. The keyframes tell what CSS properites should be applied at different key points in the animation sequence. We also add an animation-duration property in order to specify that the animation should last for three seconds.

```
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
}
```
Now we are ready to create the keyframes. We don't have to define what happens at every millisecond of the animation. Instead we only need to define the key points, and CSS will generate a smooth transition to move from one keyframe to another. In our case we simply want to start with text that is invisible and have it zoom into the full final size. We can do this with two frames that are designated with the keywords from and to.

```
@keyframes demo {
  from {
    font-size: 0vh;
  }

  to {
    font-size: 20vh;
  }
}
```
That's everything we need to do. However, let's make one more addition. It would look better if towards the end, the paragraph bounced out a little bigger than its final size. We can accommodate that by adding another key frame that happens 95 percent through the animation.

```
@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 21vh;
  }

  to {
    font-size: 20vh;
  }
}
```

Animation is not just for pushing buttons or making text float around. Here is an example of animating a watch using only HTML and CSS.

![image](https://github.com/HyrumClawson/startup-example/assets/144285497/d8e52ebe-15f0-4484-81b6-9e1a8faefa35)


## Responsive Design

Modern web applications are expected to run well on a large variety of computing devices

This ability to reconfigure the interface so the application accommodates and takes advantage of the screen's size and orientation is called responsive design.

Much of HTML and CSS is already fluid due to the fact that it responds to the browser window being resized. For example a paragraph element will resize when the browser window is resized. However, the following features can completely change the layout of the application based on the device's size and orientation.


We can demonstrate the different CSS display property values with the following HTML that contains a bunch of div elements. By default div elements have a display property value of block.

```
<div class="none">None</div>
<div class="block">Block</div>
<div class="inline">Inline1</div>
<div class="inline">Inline2</div>
<div class="flex">
  <div>FlexA</div>
  <div>FlexB</div>
  <div>FlexC</div>
  <div>FlexD</div>
</div>
<div class="grid">
  <div>GridA</div>
  <div>GridB</div>
  <div>GridC</div>
  <div>GridD</div>
</div>
```
![image](https://github.com/HyrumClawson/startup-example/assets/144285497/ab254947-4ec1-4ba6-b05c-1993bcfa8009)

If we modify the display property associated with each element with the following CSS, then we get a totally different rendering.

```
.none {
  display: none;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
  flex-direction: row;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```
![image](https://github.com/HyrumClawson/startup-example/assets/144285497/671d1045-2f6c-411b-b820-e60f64fffbe1)


### Viewport Meta Tag

Mobiile devices are used to browse websites. However, the websites were optimized for desktop displays and not little tiny mobile screens. To solve this mobile browsers automatically started scaling the website so that it looked better on a small screen. Unfortunately, as web applications started being responsive to the screen size, the mobile browser's scaling got in the way. The solution is to include a meta tag in the head element of all your HTML pages. This tells the browser to not scale the page.

```
<meta name="viewport" content="width=device-width,initial-scale=1" />
```

### FLoat

The float css property moves an element to the left or right of its container element and allows inline elements to wrap around it. For example, if we had an aside element followed by a large paragraph of text, we could create the following CSS rule in order to cause the text to wrap around the aside.

```
aside {
  float: right;
  padding: 3em;
  margin: 0.5em;
  border: black solid thin;
}
```
![image](https://github.com/HyrumClawson/startup-example/assets/144285497/8574ec92-e8f8-4d7a-a397-4315373a8836)

### Media Queries

One of the main CSS features for creating responsive applications is the @media selector. This selector dynamically detects the size and orientation of the device and applies CSS rules to represent the structure of the HTML in a way that accommodates the change.

We can use the @media selector to tell us which side of the screen (technically the viewport) is the longest. A media query takes one or more predicates separated by boolean operators. In our case we simply want to know if the screen is oriented in portrait mode (short side on top) or not. If it is then we transform all of our div elements by rotating them 270 degrees.

```
@media (orientation: portrait) {
  div {
    transform: rotate(270deg);
  }
}
```

![image](https://github.com/HyrumClawson/startup-example/assets/144285497/1112378c-0506-4bac-9b4b-8a13ca6b587c)

You can also use media queries to make entire pieces of your application disappear, or move to a different location. For example, if we had an aside that was helpful when the screen is wide, but took up too much room when the screen got narrow, we could use the following media query to make it disappear.

```
@media (orientation: portrait) {
  aside {
    display: none;
  }
}
```
![image](https://github.com/HyrumClawson/startup-example/assets/144285497/99c92423-0c16-4c89-b618-ce6e8dfda76b)


### Grid and Flexbox

The final two responsive technologies that we want to discuss are Grid and Flexbox. These are both CSS display modes that automatically respond to screen sizes to position and resize their child elements. We will discuss each of these in detail in the following instruction.


## CSS Grid

The grid display layout is useful when you want to display a group of child elements in a responsive grid. We start with a container element that has a bunch of child elements.

```
<div class="container">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</div>
```
We turn this into a responsive grid by including a CSS display property with the value of grid on the container element. This tells the browser that all of the children of this element are to be displayed in a grid flow. The next property, grid-template-columns, specifies the layout of the grid columns. In this example we say that we want to repeatedly define each column to auto-fill the parent element's width with children that are resized to a minimum of 300 pixels and a maximum of one equal fractional unit (1fr) of the grid width. A fractional unit is dynamically computed by splitting up the parent element's width into equal parts for each of the children.

We finish off the grid configuration by saying that we want all rows to be exactly 300 pixels high with the grid-auto-rows property and the use the grid-gap property to say that we want at least a 1 em gap between our grid items.

```
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}
```

![image](https://github.com/HyrumClawson/startup-example/assets/144285497/d14d44fb-f9c8-4381-8abb-683e669d3c1b)











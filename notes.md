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





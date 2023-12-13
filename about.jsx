import React from 'react';
import "./about.css";

export function About(props) {
  const [imageUrl, setImageUrl] = React.useState('');
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  React.useEffect(() => {
    const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#picture');

        const width = containerEl.offsetWidth;
        const height = containerEl.offsetHeight;
        const apiUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
        setImageUrl(apiUrl);
      })
      .catch();

    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setQuoteAuthor(data.author);
      })
      .catch();
  }, []);

  let imgEl = '';

  if (imageUrl) {
    imgEl = <img src={imageUrl} alt='stock background' />;
  }



  return (
    <main >
    <div class = "center">
      <div id='picture' className='picture-box'>
          {imgEl}
        </div>

    <p>
      FilmDefined is a web application as designed by Hyrum Clawson a student at Brigham Young University. It's purpose
      is to allow users to create profiles and then upload url links to footage clips that demonstrate filmic concepts, as well as save
      url links to their profile and chat with other users about film. 
    </p>

    <p>
      The name FilmDefined isn't a registered trademark of anything. It was just the first name that came to my mind...

    </p>
    <div className='quote-box bg-light text-dark'>
          <p className='quote'>{quote}</p>
          <p className='author'>{quoteAuthor}</p>
        </div>
      </div>
  </main>

  );
}
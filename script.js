const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const bild = document.getElementById("image");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  showLoadingSpinner();

  const apiUrl = "https://thesimpsonsquoteapi.glitch.me/quotes";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    // If Author is blank, add 'Unknown'
    if (data[0].character === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data[0].character;
    }

    // Reduce font size for long quotes

    if (data[0].quote.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data[0].quote;

    // Picture
    bild.src = data[0].image;

    removeLoadingSpinner();
  } catch (error) {
    // getQuote();
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();

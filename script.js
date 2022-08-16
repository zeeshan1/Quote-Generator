const loader = document.getElementById("loader");
const quoteText = document.getElementById("quote");
const author = document.getElementById("author");
const generateQuoteBtn = document.getElementById("new-quote");
const tweetQuoteBtn = document.getElementById("twitter");

function generateQuots(data) {
    let quoteIndex = Math.floor(Math.random() * data.count)
    quoteText.innerHTML = data.quotes[quoteIndex].text;
    if (data.quotes[quoteIndex].text.length > 130) {
        quote.classList.add('long-quote')
    } else {
        quote.classList.remove('long-quote')
    }
    author.innerHTML = data.quotes[quoteIndex].author
}

async function getQuots() {
    loader.setAttribute('style', 'display: inline-block');
    const apiURL = 'https://goquotes-api.herokuapp.com/api/v1/all/quotes';
    try {
        const data = await fetch(apiURL)
        const res = await data.json();
        generateQuots(res);
        loader.setAttribute('style', 'display: none')

    } catch (error) {
        console.error(error)
    }
}

function tweetQuote() {
    const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`
    window.open(tweetURL, '_blank')
}
getQuots()
generateQuoteBtn.addEventListener('click', getQuots)
tweetQuoteBtn.addEventListener('click', tweetQuote)
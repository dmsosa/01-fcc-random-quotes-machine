import { useEffect, useState } from "react";
import { getQuoteArray } from "../service/quotesService";
import { FaTumblr, FaTwitter } from "react-icons/fa";
import { THEMES_LENGTH } from "../App";

function changeTheme(setTheme) {
    const randInt = Math.ceil(Math.random() * (THEMES_LENGTH - 1) );
    setTheme(`theme-${randInt}`);
}
function RandomQuotes({ setTheme }) {
    const [ { quoteArray, quoteIndex}, setQuoteState ] = useState({ quoteArray: undefined, quoteIndex: undefined });
    const [ status, setStatus ] = useState('loading');
    const { quote, author } = quoteArray ? quoteArray[quoteIndex] : {quote: undefined, author: undefined};
    useEffect(() => {

        setStatus('loading');

        getQuoteArray().then((data) => {
            
            const randIndex = Math.floor(Math.random() * (data.length));
            setQuoteState({quoteArray: data, quoteIndex: randIndex });
            setStatus('fulfilled');
        })
        .catch((error) => {
            console.log(error);
            setStatus('error');
        })
    }, [])

    const handleNewQuote = () => {
        setQuoteState((prevState) => {
            const prevIndex = prevState.quoteIndex;
            let nextIndex;
            if (prevIndex === quoteArray.length) {
                nextIndex = 0;
            } else {
                nextIndex = prevIndex + 1;
            }
            return ({...prevState, quoteIndex:  nextIndex})
        });
        changeTheme(setTheme);
    }

    return status === 'loading' ? 
        <div>Loading</div>
        :
        status === 'error' ?
        <div>Error </div>
        : 
        <div id="quote-box" className="container bg-2 border border-width-1 box-shadow-1 p-6">
            {/* Texte */}
            <div>
                <p id="text" className="h1 text-center">
                    {`" ${quote}`}
                </p>
                <span id="author" className="h4 d-block text-right my-4">{`- ${author}.`}</span>
            </div>
            {/* Knopfe */}
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <a id="tweet-quote" className="twitter-share-button" target="_blank" href={`https://twitter.com/intent/tweet?text=${`"${encodeURI(quote)}" -${author}`}&hashtags=quotes,fccQuotes,quotesAPI`}><FaTwitter ></FaTwitter></a>
                    <a id="tumblr-quote" className="tumblr-share-button" target="_blank" href={`https://tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,fccQuotes,quotesAPI&content=${encodeURI(quote)}&caption=${author}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons`}><FaTumblr></FaTumblr></a>
                </div>
                <button id="new-quote" className="btn btn-primary border-radius-0" onClick={handleNewQuote}>New quote</button>
            </div>
        </div>;
}

export default RandomQuotes; 
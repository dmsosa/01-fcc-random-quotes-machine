import axios from "axios";

const quotesApi = axios.create({ 
    baseURL: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
})

export async function getQuoteArray() {
    try {
        const { data } = await quotesApi.get('/', { headers: { "Accept":"application/json"}});
        const quoteArray = data.quotes;
        return quoteArray;
    } catch (error) {
        console.error(error);
    }
}
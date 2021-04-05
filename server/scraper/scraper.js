const axios = require("axios")
const cheerio = require("cheerio")

// const url = 'https://stackoverflow.com/questions/38884522/why-is-my-asynchronous-function-returning-promise-pending-instead-of-a-val'

let getData = html => {
    const $ = cheerio.load(html);
    // const title = /[^-]*/.exec($('title').first().text())[0]
    const title = $('title').first().text().trim()
    const site = /[^-]*$/.exec(title)[0].trim()
    const img = $('img').attr('src')

    return { urlSite: site, urlTitle: title, urlImage: img }
}

module.exports = async (url) => {
    let returnObject = {}
    await axios.get(url)
      .then(response => {
        const fetchedData = getData(response.data)
        returnObject = fetchedData
      })
      .catch(error => {
        console.log('scraper.js error', error)
      })
    
    console.log(returnObject)
    return returnObject
  }

// const $ = fetchURL(url)

// {fetchURL: fetchURL};
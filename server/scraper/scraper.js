const axios = require("axios")
const cheerio = require("cheerio")

const url = 'https://www.youtube.com/watch?v=5BfZn9HHKI0'

let getData = html => {
    data = {}
    const $ = cheerio.load(html);
    // const title = /[^-]*/.exec($('title').first().text())[0]
    const title = $('title').first().text().split(' - ', 1)[0]

    return title
}

async function fetchHTML(url) {
    await axios.get(url)
      .then(response => {
        console.log(getData(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }

const $ = fetchHTML(url)

module.exports = fetchHTML;
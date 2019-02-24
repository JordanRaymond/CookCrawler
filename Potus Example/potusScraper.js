const requestP =  require('request-promise-native')
const $ = require('cheerio')
const wikiUrl = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States'

const potusParse = require('./potusParse')

requestP(wikiUrl)
    .then(html => { 
        const urls = $('big > a', html)
        const wikiUrls = [] 
        
        for(let i = 0; i < 45; i++) {
            wikiUrls.push(urls[i].attribs.href)
        }

        return Promise.all(
            wikiUrls.map(url => {
                return potusParse('https://en.wikipedia.org/' + url)
            })
        )
    })
    .then(presidents => {
        console.log(presidents)
    })
    .catch(err => {
           console.log(err)
    })



    

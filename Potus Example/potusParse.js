const requestP = require('request-promise-native')
const $ = require('cheerio')

const potuseParse = (url) => {
    return requestP(url)
        .then(html => {
            return {
                name: $('.firstHeading', html).text(),
                birthday: $('.bday', html).text(),
            }
        })
        .catch(err => {
            console.log(err)
        });
}

module.exports = potuseParse
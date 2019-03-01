
const RicardoParser = require('./Parsers/ricardoParser.js')
const TroisfoisparjourParser = require('./Parsers/troisFoisParJourParser.js')


const domainMatchReg = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gi


class CookCrawler  {
    static getRecipeData(url) {
        const domain = url.match(domainMatchReg).toString()
        switch(domain) {
            case 'https://www.ricardocuisine.com':
                const ricardoParser = new RicardoParser()

                return ricardoParser.parseHtml(url)
            case 'https://www.troisfoisparjour.com':
                const troisfoisparjourParse = new TroisfoisparjourParser()
                
                return troisfoisparjourParse.parseHtml(url)
            default: 
                console.warn('No parser exist for ths domain or wrong url.')
                break
        }
    }
}

module.exports = CookCrawler
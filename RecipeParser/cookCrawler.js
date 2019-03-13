
const RicardoParser = require('./Parsers/ricardoParser.js')
const TroisfoisparjourParser = require('./Parsers/troisFoisParJourParser.js')


const domainMatchReg = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gi


class CookCrawler  {
    static getParsers() {
       return {
        'https://www.ricardocuisine.com': RicardoParser,
        'https://www.troisfoisparjour.com': TroisfoisparjourParser,
        }
    }

    static getRecipeData(url) {
        const domain = url.match(domainMatchReg).toString()
        if(CookCrawler.getParsers().hasOwnProperty(domain)) {
            const parser = CookCrawler.getParsers()[domain]
            return new parser().parseHtml(url)
        }
        console.warn('No parser exist for ths domain or wrong url.')
    }
}

module.exports = CookCrawler
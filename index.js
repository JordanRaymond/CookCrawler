const cookCrawler = require('./cookCrawler.js')
const testUrl = 'https://www.ricardocuisine.com/recettes/3011-filets-de-porc-glaces-a-l-erable'

const ricardoParse = require('./ricardoParse.js')

const info = new ricardoParse()
    .loadHtml(testUrl)
    .then(parse => {
        console.log(parse.title())
        console.log(parse.recipeInfo())
        console.log(parse.ingredients())
        console.log(parse.preparationSteps())
        console.log(parse.recipeImgUrl())
    })
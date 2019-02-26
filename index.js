const cookCrawler = require('./cookCrawler.js')
const ricardoUrl = 'https://www.ricardocuisine.com/recettes/8210-b-uf-braise-avec-salade-d-herbes'
const troisFoisUrl = 'https://www.troisfoisparjour.com/fr/recettes/plats-principaux/poulet-volaille/poulet-a-la-moutarde-herbes-fraiches-riz-a-la-ciboulette/'

const ricardoParse = require('./ricardoParse.js')
const troisFoisParse = require('./troisFoisParJourParse.js')

const info = new ricardoParse()
    .loadHtml(ricardoUrl)
    .then(parse => {
        console.log(parse.title())
        console.log(parse.recipeInfo())
        console.log(parse.ingredients())
        console.log(parse.preparationSteps())
        console.log(parse.recipeImgUrl())

        console.log(parse.recipeInfo()['portions'])
    })

const trois = new troisFoisParse().loadHtml(troisFoisUrl)
    .then(parse => {
        console.log(parse.title())
    })
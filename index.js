const cookCrawler = require('./cookCrawler.js')
const ricardoUrlWith2RecipeUrl = 'https://www.ricardocuisine.com/recettes/8210-b-uf-braise-avec-salade-d-herbes'
const ricardoNormalRecipeUrl = 'https://www.ricardocuisine.com/recettes/3011-filets-de-porc-glaces-a-l-erable'
const troisFoisUrl = 'https://www.troisfoisparjour.com/fr/recettes/plats-principaux/poulet-volaille/poulet-a-la-moutarde-herbes-fraiches-riz-a-la-ciboulette/'

const ricardoParse = require('./ricardoParse.js')
const troisFoisParse = require('./troisFoisParJourParse.js')

const info = new ricardoParse()
    .loadHtml(ricardoUrlWith2RecipeUrl)
    .then(parse => {
        console.log(parse.parse())
    })

const trois = new troisFoisParse().loadHtml(troisFoisUrl)
    .then(parse => {
        console.log(parse.parse())
    })
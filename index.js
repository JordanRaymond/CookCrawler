const cookCrawler = require('./RecipeParser/cookCrawler.js')

const ricardoUrlWith2RecipeUrl = 'https://www.ricardocuisine.com/recettes/8210-b-uf-braise-avec-salade-d-herbes'
const ricardoNormalRecipeUrl = 'https://www.ricardocuisine.com/recettes/3011-filets-de-porc-glaces-a-l-erable'
const troisFoisUrl = 'https://www.troisfoisparjour.com/fr/recettes/plats-principaux/poulet-volaille/poulet-a-la-moutarde-herbes-fraiches-riz-a-la-ciboulette/'

cookCrawler.getRecipeData(ricardoUrlWith2RecipeUrl).then(data => {
    console.log(data)
})

cookCrawler.getRecipeData(ricardoNormalRecipeUrl).then(data => {
    console.log(data)
})

cookCrawler.getRecipeData(troisFoisUrl).then(data => {
    console.log(data)
})
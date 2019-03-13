const fs = require('fs')
const cookCrawler = require('./RecipeParser/cookCrawler.js')

const ricardoUrlWith2Recipe = 'https://www.ricardocuisine.com/recettes/8210-b-uf-braise-avec-salade-d-herbes'
const ricardoNormalRecipeUrl = 'https://www.ricardocuisine.com/recettes/3011-filets-de-porc-glaces-a-l-erable'
const troisFoisUrl = 'https://www.troisfoisparjour.com/fr/recettes/plats-principaux/poulet-volaille/poulet-a-la-moutarde-herbes-fraiches-riz-a-la-ciboulette/'

const recipes = []

recipes.push(cookCrawler.getRecipeData(ricardoUrlWith2Recipe))
recipes.push(cookCrawler.getRecipeData(ricardoNormalRecipeUrl))
recipes.push(cookCrawler.getRecipeData(troisFoisUrl))

Promise.all(recipes).then( values => {
    values = JSON.stringify(values, null, 2)
    fs.writeFile('./Recipes.json', values, (err) => {
       if(err) throw err
       console.log('Recipes written to file') 
    })
})
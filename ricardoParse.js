const requestP = require('request-promise-native')
const cheerio = require('cheerio')
const timeParse = require('parse-duration')
const recipeUrl = 'https://www.ricardocuisine.com/recettes/8015-mijote-de-b-uf-et-legumes-verts'

const whiteSpaceRemReg = /[^\S\r\n]{2,}/g

const ricardoParse = (url) => {
    return requestP(url)
        .then(html => {
            const websiteUrl = url            
            const $ = cheerio.load(html)
            
            const recipeInfo = []
            $('.recipe-content dl dd').each((i, element) => {
                recipeInfo.push($(element).text().replace(whiteSpaceRemReg, ''))
            })

            const title = $('.recipe-content > h1').text()
            const preparationTime = timeParse(recipeInfo[0])
            const cookTime = timeParse(recipeInfo[1])
            const portion = recipeInfo[2]
            const imgUrl = $('.recipe-picture > a').attr('href')   

            const ingredients = []
            $('#formIngredients ul > li > label > span').each((i, element) => {
                ingredients.push($(element).text().replace(whiteSpaceRemReg, ''))    
            })
             console.log(title)
            return {
                recipeTitle : title,
            }
        })
        .catch(err => {
            console.log(err)
        });
}

ricardoParse(recipeUrl)
module.exports = ricardoParse
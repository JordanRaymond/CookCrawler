const requestP = require('request-promise-native')
const cheerio = require('cheerio')
const timeParse = require('parse-duration')

const whiteSpaceRemReg = /[^\S\r\n]{2,}/g

class RicardoParse {
    constructor() {
        this.recipe = {}
    }

    loadHtml(url) {
        return requestP(url)
        .then(html => {
            this.websiteUrl = url            
            this.$ = cheerio.load(html)

            return this
        })
        .catch(err => {
            console.log(err)
        });
    }

    title() {
        return {title: this.$('.recipe-content > h1').text()}
    }

    recipeInfo() {
        const recipeInfo = []
        this.$('.recipe-content > dl > dd').each((i, element) => {
            recipeInfo.push(this.$(element).text().replace(whiteSpaceRemReg, ''))
        })
    
        return {
             preparationTime: timeParse(recipeInfo[0]),
             cookTime: timeParse(recipeInfo[1]),
             portions: parseInt(recipeInfo[2])
        }
    }

    ingredients() {
        const ingredients = []
        this.$('#formIngredients ul > li > label > span').each((i, element) => {
            ingredients.push(this.$(element).text().replace(whiteSpaceRemReg, ''))    
        })
    
        return {ingredients: ingredients}
    }

    preparationSteps() {
        const preparation = []
        this.$('#preparation ol > li > span').each((i, element) => {
            preparation.push(this.$(element).text().replace(whiteSpaceRemReg, ''))    
        })

        return {preparationSteps: preparation}
    }

    recipeImgUrl() {
        return {imgUrl: this.$('.recipe-picture > a').attr('href')}   
    }
}

module.exports = RicardoParse
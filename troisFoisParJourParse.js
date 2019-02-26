const RecipeParser = require('./RecipeParser/recipeParser.js')
const timeParse = require('parse-duration')


class TroisFoisParJourParse extends RecipeParser {
    constructor() {
        super()
    }

    title() {
        return {title: this.whiteSpaceRemover(this.$('.article-recipe__content--top > h1').text())}
    }

    recipeInfo() {
        const recipeInfo = []
        this.$('.recipe-content > dl > dd').each((i, element) => {
            recipeInfo.push(this.whiteSpaceRemover(this.$(element).text()))
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
            ingredients.push(this.whiteSpaceRemover(this.$(element).text()))    
        })
    
        return {ingredients: ingredients}
    }

    preparationSteps() {
        const preparation = []
        this.$('#preparation ol > li > span').each((i, element) => {
            preparation.push(this.whiteSpaceRemover(this.$(element).text()))    
        })

        return {preparationSteps: preparation}
    }

    recipeImgUrl() {
        return {imgUrl: this.$('.recipe-picture > a').attr('href')}   
    }
}

module.exports = TroisFoisParJourParse
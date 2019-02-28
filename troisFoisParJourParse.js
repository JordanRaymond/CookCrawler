const RecipeParser = require('./RecipeParser/recipeParser.js')
const timeParse = require('parse-duration')

class TroisFoisParJourParse extends RecipeParser {
    constructor() {
        super()
    }

    getRecipeInfo(selector) {
        const recipeInfo = this.getTxtArrayFromElements(selector)
        console.log(recipeInfo)
        return {
             preparationTime: timeParse(recipeInfo[3]),
             cookTime: timeParse(recipeInfo[5]),
             portions: parseInt(recipeInfo[1])
        }
    }

    getIngredients() {
        const ingredients = []
        this.$('.recette').find('.ingredient').each((i, element) => {
            ingredients.push(this.whiteSpaceRemover(this.$(element).text()))    
        })

        return ingredients
    }

    getSteps() {
        const preparation = []
        this.$('.recette > div [itemprop="recipeInstructions"]').find('li').each((i, element) => {
            preparation.push(this.whiteSpaceRemover(this.$(element).text()))    
        })

        console.log(preparation)

        return preparation
    }

    getRecipeImgUrl() {
        return this.$('.article-recipe__image--element > img').attr('src')   
    }

    parse() {
        return {
            recipeUrl: this.recipeUrl,
            title: this.getTitle('.article-recipe__content--top > h1'),
            recipeInfo: this.getRecipeInfo('.general > ul > li > span'),
            ingredients: this.getIngredients(),
            steps: this.getSteps('#preparation ol > li > span'),
            recipeImgUrl: this.getRecipeImgUrl('.recipe-picture > a')
        }
    }
}

module.exports = TroisFoisParJourParse
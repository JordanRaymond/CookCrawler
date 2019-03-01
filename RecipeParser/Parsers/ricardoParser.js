const RecipeParser = require('../recipeParser.js')
const timeParse = require('parse-duration')

class RicardoParser extends RecipeParser {
    constructor() {
        super()
    }

    getRecipeInfo(selector) {
        const recipeInfo = this.getTxtArrayFromElements(selector)

        return {
             preparationTimeInMs: timeParse(recipeInfo[0]),
             cookTimeInMs: timeParse(recipeInfo[1]),
             portions: parseInt(recipeInfo[2])
        }
    }

    getIngredients() {
        // If the div #formIngredients have h3 in it, that mean the recipe have more than one recipe in it
        if(this.$('#formIngredients > h3').length) {
            let obj = {}
            this.$('#formIngredients > h3').each((i, element) => {
                    // For each title, assign the coresponding list of ingredients 
                    obj[this.$(element).text()] = (() => {
                        const ingredients = []
                        this.$(this.$('#formIngredients > ul ')[i]).find('li').each((j, ulElement) => {
                            ingredients.push(this.whiteSpaceRemover(this.$(ulElement).text()))
                        })

                        return ingredients
                })()
            })

            return obj
        } 
        else return this.getTxtArrayFromElements('#formIngredients ul > li > label > span')
    }


    getSteps() {
        // If the div #preparation have h3 in it, that mean the recipe have more than one recipe in it
        if(this.$('#preparation > h3').length) {
            let obj = {}
            this.$('#preparation > h3').each((i, element) => {
                    // For each title, assign the coresponding list of ingredients 
                    obj[this.$(element).text()] = (() => {
                        const ingredients = []
                        this.$(this.$('#preparation > ol ')[i]).find('li').each((j, ulElement) => {
                            ingredients.push(this.whiteSpaceRemover(this.$(ulElement).text()))
                        })

                        return ingredients
                })()
            })

            return obj
        }
        else return this.getTxtArrayFromElements('#preparation > ol > li > span')
    }

    parse() {
        return {
            recipeUrl: this.recipeUrl,
            title: this.getTitle('.recipe-content > h1'),
            recipeInfo: this.getRecipeInfo('.recipe-content > dl > dd'),
            ingredients: this.getIngredients(),
            steps: this.getSteps(),
            recipeImgUrl: this.getRecipeImgUrl('.recipe-picture > a')
        }
    }
}

module.exports = RicardoParser
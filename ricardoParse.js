const RecipeParser = require('./RecipeParser/recipeParser.js')
const timeParse = require('parse-duration')

class RicardoParse extends RecipeParser {
    constructor() {
        super()
    }

    getRecipeInfo(selector) {
        const recipeInfo = this.getTxtArrayFromElements(selector)

        return {
             preparationTime: timeParse(recipeInfo[0]),
             cookTime: timeParse(recipeInfo[1]),
             portions: parseInt(recipeInfo[2])
        }
    }

    getIngredients() {
        if(this.$('#formIngredients > h3').length) {
            let obj = {}
            this.$('#formIngredients > h3').each((i, element) => {
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

    getSteps(selector) {
        if(this.$('#preparation > h3').length) {
            let obj = {}
            this.$('#preparation > h3').each((i, element) => {
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
        else return this.getTxtArrayFromElements(selector)
    }

    parse() {
        return {
            recipeUrl: this.recipeUrl,
            title: this.getTitle('.recipe-content > h1'),
            recipeInfo: this.getRecipeInfo('.recipe-content > dl > dd'),
            ingredients: this.getIngredients(),
            steps: this.getSteps('#preparation ol > li > span'),
            recipeImgUrl: this.getRecipeImgUrl('.recipe-picture > a')
        }
    }
}

module.exports = RicardoParse
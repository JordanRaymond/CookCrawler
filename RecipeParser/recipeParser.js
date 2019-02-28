"use strict"

const requestP = require('request-promise-native')
const cheerio = require('cheerio')

const whiteSpaceRemReg = /[^\S\r]{2,}/g

class RecipeParser {
    constructor() {
      
    }

    async loadHtml(url) {
        this.recipeUrl = url;

        try {
            const recipeHtml = await requestP(url);
            // Load the virtual DOM 
            this.$ = cheerio.load(recipeHtml);

            return this;
        }
        catch (err) {
            console.log(err);
        }
    }

    getTitle(selector) {
        return this.whiteSpaceRemover(this.$(selector).text())
    }

    getRecipeInfo(selector) {        
        throw new Error('You have to implement the method getRecipeInfo!');
    }

    getIngredients(selector) {
        
        throw new Error('You have to implement the method getIngredients!');
    }

    getSteps(selector) {
        throw new Error('You have to implement the method getSteps!');
    }

    getRecipeImgUrl(selector) {
        return this.$(selector).attr('href')   
    }

    /**
     * Return the obj
     */
    parse() {
        return {
            recipeUrl: this.recipeUrl,
            title: this.getTitle(),
            recipeInfo: this.getRecipeInfo(),
            ingredients: this.getIngredients(),
            steps: this.getSteps(),
            recipeImgUrl: this.getRecipeImgUrl()
        }
    }

    getTxtArrayFromElements(selector) {
        const array = []
        this.$(selector).each((i, element) => {
            array.push(this.$(element).text())
        })

        return array
    }

    whiteSpaceRemover(string) {
        return string.replace(whiteSpaceRemReg, '')
    }
}

module.exports = RecipeParser
"use strict"

const requestP = require('request-promise-native')
const cheerio = require('cheerio')

const whiteSpaceRemReg = /[^\S\r\n]{2,}/g

class RecipeParser {
    constructor() {
        this.recipe = {}
        this.setUp()        
    }

    setUp(titleSelector, ) {
        this.titleSelector = titleSelector 
    }
    
    async loadHtml(url) {
        this.websiteUrl = url;

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

    whiteSpaceRemover(string) {
        return string.replace(whiteSpaceRemReg, '')
    }
}

module.exports = RecipeParser
'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');

const db = mongoose.connection;
let API_URL = process.env.API_URL;
let API_KEY = process.env.API_KEY;



async function getRecipes(req, res, next) {
    try {
        let test_ingredients = 'potato, chicken, broccoli';
        let recipes = await axios.get(`${API_URL}/findByIngredients`, {
            params: {
                apiKey: API_KEY,
                ingredients: test_ingredients, 
                number: 10
            }
        })
        res.status(200).send(recipes.data);
    } catch (error) {
        next(error);
    }
}

async function getOneRecipe(req, res, next) {
    try {
        let testId = 665261;
        let recipe = await axios.get(`${API_URL}/${testId}/information`, {
            params: {
                apiKey: API_KEY,
                includeNutrition: false
            }
        });
        res.status(200).send(recipe.data);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getRecipes: getRecipes,
    getOneRecipe: getOneRecipe
};

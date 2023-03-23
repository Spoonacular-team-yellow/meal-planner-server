'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const CustomRecipe = require('../models/customRecipes');

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);
const express = require('express');
const verifyUser = require('./auth');
const cors = require('cors');
const db = mongoose.connection;

async function getCustomRecipe(req, res, next) {

    verifyUser(req, async(err, user) => {
        if (err) {
            console.error(err);
            res.send('Invalid token');
        } else {

            try {
        
                let id = req.params.id
        
                let recipe = await CustomRecipe.findById(id)
        
                res.status(200).send(recipe);
        
        
        
            } catch (error) {
                next(error);
            }
        }
    })
}

async function createCustomRecipe(req, res, next) {

    verifyUser(req, async(err, user) => {
        if (err) {
            console.error(err);
            res.send('Invalid token');
        } else {

            try {
        
                let recipe = req.params.body
        
                /*let recipe = {
                    recipeId: 476338,
                    steps: ["1", 3, 4, 478323, "tsjdkjfj"], 
                    ingredients: [34, 4838],
                    imageUrl: "aslkdfjasklfj",
                    title: "new recipe",
                    sourceUrl: "alksdfjak",
                    sourceName: "the belly brothers"
                }*/
        
                let newRecipe = await CustomRecipe.create({
                    recipeId: recipe.recipeId,
                    steps: recipe.steps,
                    ingredients: recipe.ingredients,
                    imageUrl: recipe.imageUrl,
                    title: recipe.title,
                    sourceUrl: recipe.sourceUrl,
                    sourceName: recipe.sourceName
                });
        
                res.status(200).send(newRecipe);
        
            } catch (error) {
                next(error);
            }
        }
    })
}

async function updateCustomRecipe(req, res, next) {
    verifyUser(req, async(err, user) => {
        if (err) {
            console.error(err);
            res.send('Invalid token');
        } else {

            try {
        
        
                let id = req.params.id;
        
                let updatedRecipe = req.body;
                let recipeToUpdate = await CustomRecipe.findByIdAndUpdate(id, updatedRecipe, {new: true, overwrite: true});
                res.status(200).send(recipeToUpdate);
        
            } catch (error) {
                next(error);
            }
        }
    })
}

async function deleteCustomRecipe(req, res, next) {
    verifyUser(req, async(err, user) => {
        if (err) {
            console.error(err);
            res.send('Invalid token');
        } else {

            try {
        
                let id = req.params.id;
        
                await CustomRecipe.deleteOne({_id: id})
        
                res.status(200).send('Custom recipe deleted');
            } catch (error) {
                next(error);
            }
        }
    })
}

module.exports = {
    getCustomRecipe: getCustomRecipe,
    createCustomRecipe: createCustomRecipe,
    updateCustomRecipe: updateCustomRecipe,
    deleteCustomRecipe: deleteCustomRecipe
};

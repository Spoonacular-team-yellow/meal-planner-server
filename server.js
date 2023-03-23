'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//modules
const accountsMethods = require('./modules/accounts');
const recipesMethods = require('./modules/recipes');
const customRecipesMethods = require('./modules/customrecipes');

//Recipe methods
const getRecipes = recipesMethods.getRecipes;
const getOneRecipe = recipesMethods.getOneRecipe;

//Custom recipe methods
const getCustomRecipe = customRecipesMethods.getCustomRecipe;
const updateCustomRecipe = customRecipesMethods.updateCustomRecipe;
const createCustomRecipe = customRecipesMethods.createCustomRecipe;
const deleteCustomRecipe = customRecipesMethods.deleteCustomRecipe;

//Account methods
const createAccount = accountsMethods.createAccount;
const getAccount = accountsMethods.getAccount;

//List methods
const saveRecipe = accountsMethods.saveRecipe;
const removeRecipe = accountsMethods.removeRecipe;

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

//test if server is working
app.get('/test', (request, response) => {
    response.send('test request received');
});

app.get('/recipes', getRecipes);
app.get('/recipes/:id', getOneRecipe);

app.get('/customrecipes/:id', getCustomRecipe);
app.put('/customrecipes/:id', updateCustomRecipe);
app.post('/customrecipes', createCustomRecipe);
app.delete('/customrecipes/:id', deleteCustomRecipe);

app.post('/accounts', createAccount);

app.get('/accounts/:email', getAccount);

app.put('/accounts/list/save/:email', saveRecipe);
app.put('/accounts/list/remove/:email', removeRecipe);


app.get('*', (request, response) => {
    response.send('No resource found');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));


'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');

const db = mongoose.connection;

async function getRecipes(req, res, next) {
    try {
        console.log('yo');
        res.status(200).send('All Recipes');
    } catch (error) {
        next(error);
    }
}

async function getOneRecipe(req, res, next) {
    try {
        res.status(200).send('One Recipe');
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getRecipes: getRecipes,
    getOneRecipe: getOneRecipe
};

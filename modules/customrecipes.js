'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');

const db = mongoose.connection;

async function getCustomRecipe(req, res, next) {
    try {
        
        res.status(200).send('Custom Recipe');
    } catch (error) {
        next(error);
    }
}

async function createCustomRecipe(req, res, next) {
    try {
        res.status(200).send('Custom Recipe Created');
    } catch (error) {
        next(error);
    }
}

async function updateCustomRecipe(req, res, next) {
    try {
        res.status(200).send('Custom Recipe updated');
    } catch (error) {
        next(error);
    }
}

async function deleteCustomRecipe(req, res, next) {
    try {
        res.status(200).send('Custom recipe deleted');
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getCustomRecipe: getCustomRecipe,
    createCustomRecipe: createCustomRecipe,
    updateCustomRecipe: updateCustomRecipe,
    deleteCustomRecipe: deleteCustomRecipe
};

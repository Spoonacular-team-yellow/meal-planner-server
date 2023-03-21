'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');

const db = mongoose.connection;

async function getAccount(req, res, next) {
    try {
        res.status(200).send('Account');
    } catch (error) {
        next(error);
    }
}

async function createAccount(req, res, next) {
    try {
        res.status(200).send('Account created');
    } catch (error) {
        next(error);
    }
}

async function saveRecipe(req, res, next) {
    try {
        res.status(200).send('Recipe saved');
    } catch (error) {
        next(error);
    }
}

async function removeRecipe(req, res, next) {
    try {
        res.status(200).send('Recipe removed');
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAccount: getAccount,
    createAccount: createAccount,
    saveRecipe: saveRecipe,
    removeRecipe: removeRecipe
};

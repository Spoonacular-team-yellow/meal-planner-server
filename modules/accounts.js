'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');

const DATABASE_URL = process.env.DATABASE_URL;
const Account = require('../models/account');
const CustomRecipe = require('../models/customRecipes');

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

async function getAccount(req, res, next) {
    try {

        //from route params
        let email = req.params.email;
        let account = await Account.find({
            email: email
        })
        res.status(200).send(account);
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


        // get the recipe id from req.body
        let recipe = req.body
        console.log(recipe)
        // let account = await Account.findOneAndUpdate({
        //     email: testEmail
        // }, {
        //     $push: {"recipes": testRecipeId}
        // });
        // console.log(account)

        // account.push(account)
        // res.status(200).send(account);
        res.status(200).send("recipe saved");

    } catch (error) {
        next(error);
    }
}

async function removeRecipe(req, res, next) {
    try {


        let testEmail = "user1@gmail.com";
        // get the recipe id from req.body
        let testRecipeId = '641a0ac61b6f70be82ae3e71'

        let account = await Account.findOneAndUpdate({
            email: testEmail
        }, {
            $pull: {"recipes": testRecipeId}
        });

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

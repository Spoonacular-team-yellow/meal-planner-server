'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const verifyUser = require('./auth');

const DATABASE_URL = process.env.DATABASE_URL;
const Account = require('../models/account');
const CustomRecipe = require('../models/customRecipes');

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

async function getAccount(req, res, next) {
    verifyUser(req, async(err, user) => {
        if (err) {
            console.error(err);
            res.send('Invalid token');
        } else {
            try {

                //from route params
                let email = req.params.email;
                let account = await Account.find({
                    email: email
                });
                if (account.length > 0){
                    res.status(200).send(account);
                }
                else {
                    res.status(200).send(false);
                }
            } catch (error) {
                next(error);
            }
        }
    });
}

async function createAccount(req, res, next) {
    verifyUser(req, async(err, user) => {
        if (err) {
            console.error(err);
            res.send('Invalid token');
        } else {
            try {
                let createdAccount = await Account.create(req.body);
                res.status(200).send(createdAccount);
            } catch (error) {
                next(error);
            }
        }
    })
    
}

async function saveRecipe(req, res, next) {
    verifyUser(req, async(err, user) => {
        if (err) {
            console.error(err);
            res.send('Invalid token');
        } else {
            try {
                let recipe = req.body;
                let account = await Account.findOne({email: req.params.email});
                let gotSet = false;
                let newRecipes = [...account.recipes];
                console.log(newRecipes);
                for (let i = 0; i < account.recipes.length; i++) {
                    if (Object.prototype.hasOwnProperty.call(account.recipes[i], '_id')) {
                        if (account.recipes[i]._id === req.body._id) {
                            newRecipes[i] = recipe;
                            gotSet = true;
                        }
                    }
                }
                if (!gotSet) {
                    newRecipes.push(recipe);
                }
                console.log(newRecipes, 'this');
                let response = await Account.findOneAndUpdate({
                    email: req.params.email
                }, {$set: {"recipes": newRecipes}});
                res.status(200).send(response);
        
            } catch (error) {
                next(error);
            }
        }
    })
}

async function removeRecipe(req, res, next) {

    verifyUser(req, async(err, user) => {
        if (err) {
            console.error(err);
            res.send('Invalid token');
        } else {
            try {
                let param = Object.prototype.hasOwnProperty.call(req.body, '_id')
                ? {"recipes": {"_id": req.body._id}}
                : {"recipes": {"recipeId": req.body.id}};
                console.log(param);
                let account = await Account.findOneAndUpdate({
                    email: req.params.email
                }, {
                    $pull: param
                }, {new: true});
                console.log(account, 'yo');
                res.status(200).send(account);
            } catch (error) {
                next(error);
            }
        }
    });
}

module.exports = {
    getAccount: getAccount,
    createAccount: createAccount,
    saveRecipe: saveRecipe,
    removeRecipe: removeRecipe
};

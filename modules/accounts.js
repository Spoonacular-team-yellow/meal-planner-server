'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const verifyUser = require('./auth');

const DATABASE_URL = process.env.DATABASE_URL;
const Account = require('../models/account');

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
        
                /*let testEmail = "user1@gmail.com";
                // get the recipe id from req.body
                let testRecipeId = '641a0ac61b6f70be82ae3e71'*/
        
                let account = await Account.findOneAndUpdate({
                    email: req.params.email
                }, {
                    $push: {"recipes": req.body}
                });
        
                // account.push(account)
                res.status(200).send(account);
        
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
        
        
                /*let testEmail = "user1@gmail.com";
                // get the recipe id from req.body
                let testRecipeId = '641a0ac61b6f70be82ae3e71'*/
                let param = Object.hasOwn(req.body, '_id')
                ? {"recipes": {"_id": req.body._id}}
                : {"recipes": {"recipeId": req.body.id}};
                let account = await Account.findOneAndUpdate({
                    email: req.params.email
                }, {
                    $pull: param
                });
                res.status(200).send(account);
            } catch (error) {
                next(error);
            }
        }
    })
}

module.exports = {
    getAccount: getAccount,
    createAccount: createAccount,
    saveRecipe: saveRecipe,
    removeRecipe: removeRecipe
};

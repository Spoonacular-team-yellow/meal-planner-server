'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
console.log(process.env.D)
mongoose.connect(process.env.DATABASE_URL);

const Account = require('./models/account');

const CustomRecipes = require('./models/customRecipes');

async function seed(){

    await Account.create({
        username: "user 1",
        email: "user1@gmail.com",
        recipes: [23, 34, 56]
    });

    console.log('User 1 was created')

    await Account.create({
        username: "user 2",
        email: "user2@gmail.com",
        recipes: [34, 54, 9583]
    });

    console.log("User 2 created!")

    await Account.create({
        username: "user 3",
        email: "user3@gmail.com",
        recipes: [89, 756, 23, 837, 80]
    });

    // add in recipes

    await CustomRecipes.create({
        recipeId: 23,
        steps: ["1", 3, 4], 
        ingredients: [34, 345342],
        imageUrl: "aslkdfjasklfj",
        readyInMinutes: 35,
        title: "first recipe",
        sourceUrl: "alksdfjak",
        sourceName: "the belly sisters"
    });

    await CustomRecipes.create({
        recipeId: 24,
        steps: ["1", 3, 4, 478323], 
        ingredients: [34],
        imageUrl: "aslkdfjasklfj",
        readyInMinutes: 45,
        title: "second recipe",
        sourceUrl: "alksdfjak",
        sourceName: "the belly sisters"
    });

    console.log("User 3 was created!");
    mongoose.disconnect();
}

seed();

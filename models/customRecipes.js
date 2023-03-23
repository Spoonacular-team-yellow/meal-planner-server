const mongoose = require('mongoose');

const { Schema } = mongoose;

const customRecipesSchema = new Schema({
    recipeId: {type: Number, required: true},
    steps: {type: Array, required: true},
    ingredients: {type: Array, required: true},
    imageUrl: {type: String, required: true},
    title: {type: String, required: true},
    sourceUrl: {type: String, required: true},
    sourceName: {type: String, required: true},
});

const CustomRecipesModel = mongoose.model("CustomRecipes", customRecipesSchema);

module.exports = CustomRecipesModel;

# meal-planner-server

API server for meal-planner-client.

## Collaborators
***
Joel Myrtil, Daniel Yoon, Ahmed Mohamed, Phillip Chaplin

## Wireframe
***
[Wireframe](https://files.slack.com/files-pri/T039KG69K-F04V75R0XGR/screenshot_2023-03-20_at_1.11.46_pm.png)

## Domain Model
***
[Domain Model](https://files.slack.com/files-tmb/T039KG69K-F04UXKBHT60-03a11318ee/screen_shot_2023-03-20_at_3.23.21_pm_720.png)

## Database Schema
***

[Database Schema](https://files.slack.com/files-pri/T039KG69K-F04UV545H26/screen_shot_2023-03-20_at_3.16.58_pm.png)

Account
* This is to keep track of user accounts that have logged in through Auth0.
* It holds the list of recipes for each user.

Recipe
* This holds the ID of the recipe that exists on Spoonacular API.
* This also keeps track if the recipe is customizable or not.
* Has a relationship to the list of recipes in Account.
* Has a relationship to the RecipeMods collection, which has modifications for custom recipes.

RecipeMod
* This holds the custom modifications for a recipe that a user has made.
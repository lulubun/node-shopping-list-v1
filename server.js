
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {ShoppingList, Recipes} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to Recipes
// so there's some data to look at
ShoppingList.create('beans', true);
ShoppingList.create('tomatoes', false);
ShoppingList.create('peppers', false);

Recipes.create('tea', ['tea', 'hot water']);
Recipes.create('Omlet du Fromage', ['eggs', 'cheese']);
Recipes.create('hot dog', ['hot dog', 'bun', 'ketchup'] );

// when the root of this router is called with GET, return
// all current Recipes items
app.get('/shopping-list', (req, res) => {
  res.json(ShoppingList.get());
});

app.get('/recipes', (req, res) => {
  res.json(Recipes.get());
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

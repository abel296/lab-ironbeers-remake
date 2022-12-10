const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'))

// Endpoints

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/beers', async (req, res) => {
    res.render('beers', { beers: await punkAPI.getBeers() });
});

app.get('/random-beer', (req, res) => {
  res.render('random-beer');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

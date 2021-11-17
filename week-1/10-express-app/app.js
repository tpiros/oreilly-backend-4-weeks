const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
nunjucks.configure('views', {
  express: app,
  autoescape: true,
});
app.set('view engine', 'njk');

const products = [
  { id: 1, name: 'shoes', price: 100 },
  { id: 2, name: 'jeans', price: 25 },
  { id: 3, name: 'sunglasses', price: 18 },
];

app.get('/', function (req, res) {
  res.render('index', {
    products,
    title: 'Product Listing',
  });
});

app.listen(3000, () => console.log('Express started on port 3000'));

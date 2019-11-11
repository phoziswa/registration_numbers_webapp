const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://phoziswa:lubanzi25@localhost:5432/registration_numbers';

const pool = new Pool({
  connectionString,

});

const RegNumbersFactory = require('./registrations');

const handlebarSetup = exphbs({
  partialsDir: "./views/partials",
  viewPath: './views',
  layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

const instance = RegNumbersFactory(pool);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(flash());

app.get('/', async function (req, res, ) {
  var regnumbers = req.body.regnums;
  var list = await instance.getReg()

  if (regnumbers === "") {
    req.flash("info", "Please enter a registration number")
  }
  await instance.addingRegsToList(regnumbers)

  res.render('index', {
    regnumbers: list
  });
})

const PORT = process.env.PORT || 3014;
app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});



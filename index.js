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

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/registration_numbers';

const pool = new Pool({
  connectionString,
});

const RegNumbersFactory = require('./registrations');
// const regexFunc = require('./regex_check')

const handlebarSetup = exphbs({
  partialsDir: "./views/partials",
  viewPath: './views',
  layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

const instance = RegNumbersFactory(pool);
// const checkRegex = regexFunc()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(flash());

app.get('/', function (req, res) {
  res.render('index')
});

app.post('/reg_numbers', async function (req, res) {
  var regnumbers = req.body.regnums;

  var regex1 = /^([A-Z]){2}\s([0-9]){3}\s([0-9]){3}$/g;
  var regex3 = /^[A-Z]{2}\s[0-9]{3}$/g;
  var regex4 = /^([A-Z]){2}\s([0-9]){3}\S([0-9]){3}$/g;

  var reg1 = regex1.test(regnumbers);
  var reg3 = regex3.test(regnumbers);
  var reg4 = regex4.test(regnumbers);

  var error = await instance.addingRegsToList(regnumbers)

  if (regnumbers === '') {
    req.flash("info", "Please enter a registration number")
    return res.redirect('/')
  }

  if (reg1 === true || reg3 === true || reg4 === true) {
    await instance.addingRegsToList(regnumbers)
  }

  else {
    req.flash("info", "Invalid registration number, the valid starts with CA,CY and CX")
    return res.redirect('/')
  }

  if (!error) {
    req.flash("info", "Registration number already exits please enter another one")
    return res.redirect('/')
  }

  var list = await instance.getReg()

  res.render('index', {
    reg: list
  });
});

app.post('/clear', async function (req, res) {
  await instance.clearDatabase()
  res.render('index')
});

app.post('/filter', async function (req, res) {
  var town_radio_buttons = req.body.town_name;
  var filt = await instance.filter(town_radio_buttons);

  res.render('index', {
    filt
  });
});

const PORT = process.env.PORT || 3011;
app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});


















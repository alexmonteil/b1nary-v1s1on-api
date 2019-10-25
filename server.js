const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const entries = require('./controllers/entries');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'ph0t0nix',
        password : '',
        database : 'smart-brain'
    }
});

// MIDDLEWARE

app.use(cors());
app.use(bodyParser.json());

// ROUTES + CONTROLLERS

app.post('/signin', (req, res) => { signIn.controlSignIn(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.controlRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.controlProfileGet(req, res, db) });
app.put('/entries', (req, res) => { entries.controlEntries(req, res, db) });
app.post('/image', (req, res) => { image.controlAPICall(req, res) });

// CONFIRM SERVER LISTENING

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});



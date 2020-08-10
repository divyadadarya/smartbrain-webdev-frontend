const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const signin = require('./Controllers/signIn.js');
const register = require('./Controllers/register.js');
const profile = require('./Controllers/profile.js');
const image = require('./Controllers/image.js');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'divu1303',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


// const database = {
// 	users : [
// 	   {
// 	   	  id: '123',
// 	   	  name : 'Shubhendu',
// 	   	  email: 'shubhendusingh15@gmail.com',
// 	   	  password: 'divya',
// 	   	  entries: 0,
// 	   	  joined : new Date()

// 	   },
// 	   {
// 	   	  id: '124',
// 	   	  name : 'Divya',
// 	   	  email: 'divyadadarya@gmail.com',
// 	   	  password: 'shubhendu',
// 	   	  entries : 0,
// 	   	  joined : new Date()

// 	   }
// 	],
// 	login : [
// 	    {
// 	   	  id: '986',
// 	   	  hash: '',
// 	   	  email: 'shubhendusingh15@gmail.com'
// 	   	}
// 	]
// }


app.get('/', (req,res) => {
	res.send('this is working');
	// res.send(database.users);
})


app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(process.env.PORT || 5000, () => console.log(`app listening on port ${process.env.PORT}!`))

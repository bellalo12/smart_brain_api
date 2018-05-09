const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    connectinString : process.env.DATABASE_URL || "postgres://wezwijdwrhhhpb:ef1a222fa5b897f23a1f816ebc916b7bd1834a1c09d98387e1c0e51d9af65b03@ec2-54-83-204-6.compute-1.amazonaws.com:5432/d3epmn2s7vtnpa"
    ssl: true
  }
});

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res)=>{
  res.json('running success')
})

app.post('/signin', (req, res)=>signin.handleSignin(req, res, db, bcrypt))

app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res)=>(profile.handleProfile(req, res, db)))

app.put('/image', (req, res)=>(image.handleImage(req, res, db)))

app.post('/imageurl', (req,res)=>(image.handleApiCall(req, res)))



app.listen(process.env.PORT || 3000,()=>{
  console.log(`app is running on the port ${process.env.PORT}`)
})

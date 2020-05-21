const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./server/routes/api')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI|| 'mongodb://localhost/musicDB', { useNewUrlParser: true , useUnifiedTopology: true })

app.use('/', api)


const PORT = 8080
app.listen(process.env.PORT || PORT);

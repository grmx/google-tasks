const express = require('express')
const path = require('path')
var app = express()
app.use(express.static(__dirname + '/public/'))
app.listen(process.env.PORT || 8080)

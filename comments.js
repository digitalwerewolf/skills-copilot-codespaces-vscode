//Create web server
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs')
var comments = require('./comments.json')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Serve static files
app.use(express.static('public'))

//Get comments
app.get('/comments', function(req, res){
  res.json(comments)
})

//Post comments
app.post('/comments', function(req, res){
  comments.push(req.body)
  fs.writeFile('comments.json', JSON.stringify(comments, null, 2), function(err){
    if (err) {
      return console.log(err)
    }
    res.json(comments)
  })
})

//Delete comments
app.delete('/comments/:id', function(req, res){
  comments.splice(req.params.id, 1)
  fs.writeFile('comments.json', JSON.stringify(comments, null, 2), function(err){
    if (err) {
      return console.log(err)
    }
    res.json(comments)
  })
})

//Start server
app.listen(3000, function(){
  console.log('Server listening on port 3000')
})
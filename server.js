const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var mongoose = require('mongoose');
var Post = require('./app/models/post');
var morgan = require('morgan');
var config = require('config');

mongoose.connect(config.DBHost);

if(config.util.getEnv('NODE_ENV') !== 'test') { 
    app.use(morgan('combined'));
}

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.listen(3000, function() {
  console.log('listening on 3000')
})

app.get('/blog', function(req, res) {
    Post.find({'deleted': false}, function(err, posts) {
        if(err)
            res.send(err);
 
        res.json(posts);
    });
})

app.get('/blog/:id', function(req, res) {
    Post.findById(req.params.id, function(error, post) {
        if(error)
            res.send(error);
 
        res.json(post);
    });
})

app.post('/blog', function(req, res) {
    var post = new Post();

    post.title = req.body.title;
    post.date = req.body.date;
    post.body = req.body.body;
    post.author.name = req.body.author.name;
    post.author.picture = req.body.author.picture;
    post.deleted = false;

    post.save(function(error) {
        if(error){
            res.send(error);
        }else{
            res.json({ message: 'Post adicionado!' });
        }
 
    });
})

app.put('/blog/:id', function(req, res) {
    Post.findById(req.params.id, function(error, post) {
        if(error)
            res.send(error); 

        post.title = req.body.title;
        post.date = req.body.date;
        post.body = req.body.body;
        post.author.name = req.body.author.name;
        post.author.picture = req.body.author.picture;
        post.save(function(error) {
            if(error){
                res.send(error);
            }else{
                res.json({ message: 'Post atualizado!' });
            }
     
        });
    });
})

app.delete('/blog/:id', function(req, res) {
    Post.findById(req.params.id, function(error, post) {
        if(error)
            res.send(error); 
        
        post.deleted = true;

        post.save(function(error) {
            if(error){
                res.send(error);
            }else{
                res.json({ message: 'Post deletado!' });
            }
     
        });
    });
})


module.exports = app;
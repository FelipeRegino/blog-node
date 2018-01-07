const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const blog = require('./controllers/blog');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.listen(8000, function() {
  console.log('listening on 8000')
})

app.get('/', function(req, res){
    res.redirect('/blog');
})

app.get('/blog', blog.index)

app.get('/blog/:id', blog.post)

app.get('/update/:id', blog.update)

app.get('/add', blog.add)

app.post('/store', blog.store)

app.post('/refresh/:id', blog.refresh)

app.get('/delete/:id',  blog.erase)
const request = require('request');
var config = require('config');

function index(req, res) {
	request('http://'+config.IPAddress+':3000/blog', function(error, response, body){
	    if (error){
	        console.log(error)
	    }else{
	        console.log('statusCode:', response && response.statusCode);
	        console.log('body:', body);
	        res.render('index', {posts : JSON.parse(body)});
	    }
	})
}

function post(req, res) {
	request('http://'+config.IPAddress+':3000/blog/' + req.params.id, function(error, response, body){
	    if (error){
	        console.log(error)
	    }else{
	        console.log('statusCode:', response && response.statusCode);
	        console.log('body:', body);
	        res.render('post', {post : JSON.parse(body)});
	    }
	})
}

function add(req, res) {
	res.render('add');
}


function store(req, res) {

	var options = {
		uri: 'http://'+config.IPAddress+':3000/blog',
		method: 'POST',
		json:{
			"title": req.body.title,
			"date": req.body.date,
			"body": req.body.body,
			"author": {
				"name": req.body.name,
				"picture": req.body.picture
			} 
		}
	}

	request(options, function(error, response, body){
		if (error){
	        console.log(error);
	        res.redirect('/blog');
	    }else{
	        console.log('statusCode:', response && response.statusCode);
	        console.log('body:', body);
	        res.redirect('/blog');
	    }
	})
}


function refresh(req, res) {

	var options = {
		uri: 'http://'+config.IPAddress+':3000/blog/' + req.params.id,
		method: 'PUT',
		json:{
			"title": req.body.title,
			"date": req.body.date,
			"body": req.body.body,
			"author": {
				"name": req.body.name,
				"picture": req.body.picture
			} 
		}
	}

	request(options, function(error, response, body){
		if (error){
	        console.log(error);
	        res.redirect('/blog');
	    }else{
	        console.log('statusCode:', response && response.statusCode);
	        console.log('body:', body);
	        res.redirect('/blog');
	    }
	})

}


function update(req, res) {
	request('http://'+config.IPAddress+':3000/blog/' + req.params.id, function(error, response, body){
	    if (error){
	        console.log(error)
	    }else{
	        console.log('statusCode:', response && response.statusCode);
	        console.log('body:', body);
	        res.render('update', {post : JSON.parse(body)});
	    }
	})
}

function erase(req, res) {
	
	var options = {
		uri: 'http://'+config.IPAddress+':3000/blog/' + req.params.id,
		method: 'DELETE' 
	}
	
	request(options, function(error, response, body){
		if (error){
	        console.log(error);
	        res.redirect('/blog');
	    }else{
	        console.log('statusCode:', response && response.statusCode);
	        console.log('body:', body);
	        res.redirect('/blog');
	    }
	})
}

module.exports = {index, post, add, update, store, refresh, erase}
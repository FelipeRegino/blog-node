process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Post = require('../app/models/post');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

var post = new Post({
    title: "My First Post",
    date: "2018-01-03",
    body: "<h1>Esse o titulo</h1><p>esse é o corpo</p>",
    author: {
        name: "John Doe",
        picture: "https://images.com.br/foto.jpg"
    }
});

describe('Posts', function() {
    afterEach(function(done) {
        Post.remove({}, function(error) {
            done();
        });
    });

   	describe('/GET blog', function() {
        it('Deve retornar todos os posts', function(done) {
            chai.request(server)
            .get('/blog')
            .end(function(error, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
            });
        });
    });

    describe('/POST blog', function() {
        it('Não deve criar um post, uma vez que não foi definido o campo: body', function(done) {
     
            var post_e = {
                title: "My First Post",
                date: "2018-01-03",
                author: {
                    name: "John Doe",
                    picture: "https://images.com.br/foto.jpg"
                }
            }
            chai.request(server)
            .post('/blog')
            .send(post_e)
            .end(function(error, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('body');
                res.body.errors.body.should.have.property('kind').eql('required');
                done();
            });
        });

        it('Deve Criar um post', function(done) {
            chai.request(server)
            .post('/blog')
            .send(post)
            .end(function(error, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Post adicionado!');
            done();
            });
        });
    });

    describe('/GET/:id blog', function() {
        it('Deve retornar um post dado o id', function() {
            post.save(function(error, post) {
                chai.request(server)
                .get('/blog/' + post.id)
                .send(post)
                .end(function(error, res) {
                   res.should.be.a('object');
                   res.body.should.have.property('title');
                   res.body.should.have.property('date');
                   res.body.should.have.property('body');
                   res.body.should.have.property('author');
                   res.body.author.should.have.property('name');
                   res.body.author.should.have.property('picture');
                   res.body.should.have.property('_id').eql(post.id);
                done();
                });
            });
        });
    });

    describe('/PUT/:id blog', function() {
        it('Deve atualizar um post dado o id', function(done){
            post.save(function(error, post){
                chai.request(server)
                .put('/blog/' + post.id)
                .send({
                    title: "My First Post",
                    date: "2018-01-03",
                    body: "<h1>Outro titulo</h1><p>esse é o corpo</p>",
                    author: {
                        name: "John Doe",
                        picture: "https://images.com.br/foto.jpg"
                    }
                })
                .end(function(error, res){
                    res.body.should.have.property('message').eql('Post atualizado!');
                done();
                });
            });
        });
    });

    describe('/DELETE/:id blog', function() {
        it('Deve excluir um post dado o id', function(done){
            post.save(function(error, post){
                chai.request(server)
                .delete('/blog/' + post.id)
                .end(function(error, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Post deletado!');
                done();
                });
            });
        });
    });

});
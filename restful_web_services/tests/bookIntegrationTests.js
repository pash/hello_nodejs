var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app);

describe('Book Crud Test', function() {

  it('should allow a book to be posted and return a read and _id', function(done) {
    var bookPost = {title: 'New Book', author: 'Pat', genre: 'Fiction'};

    agent.post('/api/books')
         .send(bookPost)
         .expect(200)
         .end(function(err, results) {
           results.body.read.should.equal(false);
           results.body.should.have.property('_id');
           done(); // let's supertest know that this test is done so move on to the next thing
         })
  });

  afterEach(function(done) {
    Book.remove().exec();
    done(); // let's supertest know that this test is done so move on to the next thing
  })

});

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');
var should = chai.should();
var cheerio = require('cheerio');

chai.use(chaiHttp);

describe('About', function(){
  it('should display ABOUT html page on /about GET', function(done){
    chai.request(app)
      .get('/about')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.equal('about page');
        done();
      });
  });
});

describe('Weather', function(){
  it('should display INDEX html page on / GET', function(done){
    chai.request(app)
      .get('/')
      .end(function(err, res){
        var $ = cheerio.load(res.text);

        res.should.have.status(200);
        res.should.be.html;
        ($('h1').text()).should.equal('Welcome to Express-Weather');
        ($('legend').text()).should.equal('Weather');
        done();
      });
  });

  it('should list weather JSON data on /:postcode GET', function(done){
    this.timeout(10000);
    chai.request(app)
      .get('/90210')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.should.be.json;
        res.body.should.have.property('city');
        res.body.city.should.equal('Beverly Hills');
        done();
      });
  });

  it('should throw error if invalid postcode on /:postcode GET', function(done){
    this.timeout(10000);
    chai.request(app)
      .get('/2000')
      .end(function(err, res){

        res.should.have.status(404);
        res.should.be.html;
        res.text.should.equal('No location');
        done();
      });
  });
});

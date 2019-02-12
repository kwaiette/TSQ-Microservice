process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const TSQData = require('../models/TSQData')
const server = require('../app')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

describe('TSQ Data', () => {

  before(function (done) {
    mongoose.connect('mongodb://localhost/testTSQData');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  beforeEach(done => {
    TSQData.deleteMany( {}, err => {
        done();
    })
  })

	describe('/GET /', () => {
		it('should show return a status of 200', done => {
			chai.request(server)
				.get('/tsq/tsqData/')
				.end( (err, res) => {
					res.should.have.status(200);
					done()
			})
		})
	})

	describe('/GET TSQData', () => {
		it('should retrieve a technical skills questionaire entry by _id field', done => {
			const TSQ = new TSQData({
					_id: "5c5cc794972c11080ce18224",
					skillList: [ "test1", "test2", "test3" ],
					uKey: 'sldk3lk344l3kj45l'
			})

			TSQ.save((err, TSQ) => {
				chai.request(server)
				.get('/tsq/tsqData/?id=' + TSQ._id)
				.end( (err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('success').eql(true)
					let result = res.body.TSQData.id
					chai.assert(result == TSQ._id, 'API Result and DB Result do not match')
					done()
				})
			})
		})

		it('should return not found for a tsq that does not exist', done => {
			const fakeID = '5c5cc794972c11080ce18225'
			chai.request(server)
				.get('/tsq/tsqData/?id=' + fakeID)
				.end( (err, res) => {
					res.should.have.status(404)
					res.body.should.be.a('object')
					res.body.should.have.property('success').eql(false)
					done()
				})
		})

		it('should retrieve a technical skills questionaire entry by uKey field', done => {
			const TSQ = new TSQData({
					_id: "5c5cc794972c11080ce18224",
					skillList: [ "test1", "test2", "test3" ],
					uKey: 'sldk3lk344l3kj45l'
			})

			TSQ.save((err, TSQ) => {
				chai.request(server)
				.get('/tsq/tsqData/?key=' + TSQ.uKey)
				.end( (err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('success').eql(true)
					let result = res.body.TSQData.key
					chai.assert(result == TSQ.uKey, 'API Result and DB Result do not match')
					done()
				})
			})
		})


		it('should return not found for a tsq that does not exist', done => {
			const fakeKey = '5c5cc794972c11080ce18225'
			chai.request(server)
				.get('/tsq/tsqData/?key=' + fakeKey)
				.end( (err, res) => {
					res.should.have.status(404)
					res.body.should.be.a('object')
					res.body.should.have.property('success').eql(false)
					return done()
				})

		})


	})


	describe('/POST createTSQ', () => {
		it('should create a Technical Skills Questionaire Data Entry', done => {
			console.log('this test needs to be built')
			done()
		})
	})


	describe('/PUT updateTSQ', () => {
		it('should update an already existing Technical Skills Questionaire Data Entry', done => {
			console.log('this test needs to be built')
			done()
		})
	})


	describe('/DELETE removeTSQ', () => {
		it('should delete a Technical Skills Questionaire Data Entry', done => {
			console.log('this test needs to be built')
			done()
		})
	})
})

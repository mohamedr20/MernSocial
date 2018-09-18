// Endpoint tests

let expect = require('chai').expect;
let should = require('chai').should;
let chaiHttp = require('chai-http');
let server = require('../app');
let User = require('./user.model');

chai.use(chaiHttp);

describe('Create User',()=>{
    beforeEach((done)=>{
        User.remove({},(err)=>{
            console.log(err);
            done();
        })
    });

    describe('/POST Register User',()=>{
        it('it should register a user successfully',(done)=>{
            chai.request(server)
                .post('/api/user')
                .send()
        })
    })
})




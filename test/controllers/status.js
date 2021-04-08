const expect = require('chai').expect;
const mongoose = require('mongoose');

const User = require('../../models/user');
const statusController = require('../../controllers/status');

const DB_NAME = 'test-messages';
const mongoDbServer = 'mongodb://127.0.0.1:27017';
const DB_URL = `${mongoDbServer}/${DB_NAME}`;
const USER_ID = '60681c2144edc356e074d5f6';
const USER_STATUS = 'Hello';

describe('Status controller: getStatus', () => {

  before((done) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        const user = new User({
          email: 'test@test.com',
          name: 'test',
          posts: [],
          password: 'test',
          _id: USER_ID,
          status: USER_STATUS
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });


  it('should send response with valid user resp for existing user', (done) => {
    const req = { userId: USER_ID };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      }
    };

    statusController.getStatus(req, res, () => { })
      .then(() => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.userStatus).to.be.equal(USER_STATUS);
        done();
      })
      .catch(console.log);
  });


  after((done) => {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => { done(); })
  })
});
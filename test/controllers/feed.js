const expect = require('chai').expect;
const mongoose = require('mongoose');

const User = require('../../models/user');
const feedController = require('../../controllers/feed');

const DB_NAME = 'test-messages';
const mongoDbServer = 'mongodb://127.0.0.1:27017';
const DB_URL = `${mongoDbServer}/${DB_NAME}`;
const USER_ID = '60681c2144edc356e074d5f6';
const USER_STATUS = 'Hello';
const TITLE = 'title';
const CONTENT = 'content';
const IMAGE_URL = 'imageurl';

describe('Feed controller: createPost', () => {

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


  it('should add a post to the posts of the creator', (done) => {
    const req = {
      userId: USER_ID,
      file: {
        path: 'XYZ'
      },
      body: {
        title: TITLE,
        content: CONTENT,
        imageUrl: IMAGE_URL
      }
    };
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

    feedController
      .createPost(req, res, () => { })
      .then((savedUser) => {
        expect(savedUser).to.have.property('posts');
        expect(savedUser.posts).to.have.length(1);
        done();
      });

  });


  after((done) => {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => { done(); })
  })
});
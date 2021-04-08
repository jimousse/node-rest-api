const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const authMw = require('../../middlewares/is-auth');


describe('Auth middleware', function () {
  it('should throw an error if no Authorization header is present', function () {
    const req = {
      get: function () {
        return null;
      }
    };
    expect(authMw.bind(this, req, {}, () => { })).to.throw(
      'Not authenticated.'
    );
  });

  it('should yield a userId after decoding the token', function () {
    const req = {
      get: function () {
        return 'Bearer abcdefgh'; // header Authorization
      }
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc' });
    authMw(req, {}, () => { });
    expect(req).to.have.property('userId', 'abc');
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });

  it('should throw an error if the token cannot be verified', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';
      }
    };
    expect(authMw.bind(this, req, {}, () => { })).to.throw();
  });
});
exports.errorCatch = (err, next) => {
  if (!err.statusCode) err.statusCode = 500; // server side error
  next(err); // use of next because inside of a promise
}
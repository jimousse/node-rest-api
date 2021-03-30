exports.throwValidationError = (req) => {
  const error = new Error('Input validation failed.');
  error.statusCode = 422;
  throw error; // can use throw because not inside a promise
}
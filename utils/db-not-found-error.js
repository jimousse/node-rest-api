exports.throwNotFoundError = (id) => {
  const error = new Error('Record not found in database', id);
  error.statusCode = 422;
  throw error; // can use throw because not inside a promise
}
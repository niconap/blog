const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  firstname: { type: String, minLength: 3, maxLength: 100, required: true },
  lastname: { type: String, minLength: 3, maxLength: 100, required: true },
  username: { type: String, minLength: 3, maxLength: 100, required: true },
  password: { type: String, required: true },
})

// Create virtual value for the URL
AuthorSchema.virtual('url').get(() => {
  return '/blog/authors/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);
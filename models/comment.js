const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

var CommentSchema = new Schema({
  name: { type: String, minLength: 3, maxLength: 100, required: true },
  content: { type: String, minLength: 3, required: true },
  timestamp: { type: Date, required: true },
})

// Create virtual value for the URL
CommentSchema.virtual('url').get(() => {
  return '/blog/posts/comment/' + this._id;
});

// Create a better date format
CommentSchema.virtual('date').get(() => {
  return DateTime.fromJSDate(this.timestamp).toFormat('dd-MM-yyyy').toString();
});

module.exports = mongoose.model('Comment', CommentSchema);
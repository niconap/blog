const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

var PostSchema = new Schema({
  title: { type: String, minLength: 3, maxLength: 100, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  content: { type: String, minLength: 3, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  timestamp: { type: Date, required: true },
  status: {
    public: { type: Boolean, required: true },
  }
})

// Create virtual value for the URL
PostSchema.virtual('url').get(() => {
  return '/blog/posts/' + this._id;
});

// Create a better date format
PostSchema.virtual('date').get(() => {
  return DateTime.fromJSDate(this.timestamp).toFormat('dd-MM-yyyy').toString();
});

module.exports = mongoose.model('Post', PostSchema);
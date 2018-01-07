var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var PostSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    body: { type: String, required: true },
    author: {
    	name: { type: String, required: true },
    	picture: String
    },
    deleted: Boolean
});
 
module.exports = mongoose.model('Post', PostSchema);

// models/file.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: String,
    path: String,
    userProfile:String
});

module.exports = mongoose.model('File', fileSchema);

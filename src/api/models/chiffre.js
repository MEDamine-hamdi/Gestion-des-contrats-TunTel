const mongoose = require('mongoose');

const ChiffreSchema = new mongoose.Schema({
  objet: { type: Date, required: true },
  user: { type: String, required: true },
  chiffre: {
    type: Number,  // Make sure this field is defined as a Number
    required: true,
  },

});

const Chiffre = mongoose.model('Chiffre', ChiffreSchema);

module.exports = Chiffre;

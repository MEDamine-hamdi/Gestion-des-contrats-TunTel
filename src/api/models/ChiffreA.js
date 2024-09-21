

const mongoose = require('mongoose');

const ccB2BSchema = new mongoose.Schema({
    objet: String,
    nombre: String,
    montant: String,
    type: String,
    user: String,
    nom: String,
    id: String,
    duree: String,
    cc: String
}, { timestamps: true });

module.exports = mongoose.model('ccB2B', ccB2BSchema);

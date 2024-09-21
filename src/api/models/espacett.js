const mongoose = require('mongoose');

const espacettSchema = new mongoose.Schema({
    objet: Date,
    nombre: String,
    montant: String,
    type: String,
    user:String,
    nom:String,
    id:String,
    duree:String,
    cc:String
}, {
    collection: 'espacett_tmp'
});

const espacett = mongoose.model('espacett', espacettSchema);

module.exports = espacett;


const mongoose = require('mongoose');

const b2bSchema = new mongoose.Schema({
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
    collection: 'b2b'
});

const mainb2b = mongoose.model('mainb2b', b2bSchema);

module.exports = mainb2b;
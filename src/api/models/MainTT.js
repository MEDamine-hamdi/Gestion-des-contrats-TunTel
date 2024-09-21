const mongoose = require('mongoose');

const mainttSchema = new mongoose.Schema({
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
    collection: 'espacett'
});

const maintt = mongoose.model('maintt', mainttSchema);

module.exports = maintt;
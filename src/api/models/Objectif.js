const mongoose = require('mongoose');
const ObjectifSchema = new mongoose.Schema({
    date: Date,
    objectif_taux:Int32Array
});
const objectif = mongoose.model('Objectif',ObjectifSchema);
module.exports=objectif;
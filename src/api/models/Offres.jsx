const mongoose = require('mongoose');
const OffresSchema =new mongoose.Schema({
    type:String
},{
    collection:'Offres'
})
const Offres=mongoose.model('Offres',OffresSchema)
module.exports=Offres;
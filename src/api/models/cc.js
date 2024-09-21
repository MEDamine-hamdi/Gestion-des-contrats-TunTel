const mongoose = require('mongoose');

const ccSchema=new mongoose.Schema({
    cc:String,
},
    {collection: 'historique_cc'}
);

const cc =mongoose.model('cc',ccSchema);
module.exports=cc;
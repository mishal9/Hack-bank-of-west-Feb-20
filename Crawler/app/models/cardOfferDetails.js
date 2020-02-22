var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var DetailsSchema= new Schema({AllInfo :[{
        cardTitle:String,
        Offers:Array
    }]});

module.exports=mongoose.model('DSchema',DetailsSchema);

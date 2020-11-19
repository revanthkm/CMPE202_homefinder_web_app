const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var userSchema = new Schema({
    _id: {type: Schema.ObjectId, auto: true },
    email : {type: String, required: true},
    name : {type: String, required: true}, //To be unique for seller
    password : {type: String, required: true},
    role: {type: String, required: true},
    usertype: {type: String , enum : ['Renter','Landlord','Buyer','Seller']},
    address: {type: String},
    token:{type:String}
}
,
{
    versionKey: false
});


module.exports = mongoose.model('users', userSchema);
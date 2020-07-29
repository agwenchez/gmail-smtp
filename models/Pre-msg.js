const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MessagesSchema = new Schema({
name:{
    type:String,
    required:true,
    unique:true
},

category:{
    type:String,
    required:true  
},
message:{
    type:String,
    required:true  
}

})

module.exports = mongoose.model('Messages', MessagesSchema);
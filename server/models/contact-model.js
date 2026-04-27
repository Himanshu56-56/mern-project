const {Schema,model} = require("mongoose");
const { required } = require("../validators/auth-validators");
const ContactSchema = new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    message:{type:String,required:true},
});

//create a model or a collection
const Contact = new model("contact",ContactSchema);
module.exports=Contact;
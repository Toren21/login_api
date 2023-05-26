const mongo = require("mongoose")
const UserSchema = mongo.Schema;

const UsersSchema = new UserSchema({
    login:{type:String, unique:true},
    email:{type:String, unique:true},
    password:{type:String},
    register_time:{type:Date},
    last_login:{type:Date}
})
const User = mongo.model("User",UsersSchema);
module.exports = User
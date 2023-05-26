const mongo = require("mongoose");
const models = require("./models");

const connect = async (URL,params) =>{
    await mongo.connect(URL,params)
} 
module.exports = {
    connect,
    mongoose: mongo,
    ...models
}
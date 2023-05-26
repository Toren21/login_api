const _ = require("lodash");
const fs = require("fs")

const handlers = {}


const files = fs.readdirSync("./models");
const x = _.each(files, o => {
    if (o.match(/\.js$/gi) && o != "index.js")
        handlers[o.replace(".js","")] = require("./" + o)
});

module.exports = handlers;
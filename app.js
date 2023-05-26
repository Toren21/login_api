(async function (){
    const router = require("./routes")
    const logger = require("./logger")
    const db = require("./db");
    const conf = require("./config/local.js");
    const express = require("express");
    const bodyParser = require('body-parser');


    await db.connect(conf.db.mongo.host,{dbName: conf.db.mongo.database})
    let app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app = router(app,db,logger);
    
    app.listen(conf.api.port, function(){
      logger.info("Server is waiting..");
      logger.info("Listen on port: "+ conf.api.port);
    });


    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
    });
}
)()
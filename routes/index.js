const _ = require("lodash");
const fs = require("fs")

function getDir(path,internal) {
    const files = fs.readdirSync(path.replace("./",""));
    const x = _.each(files, o => {
        if (o.match(/\.js$/gi) && o != "index.js")
            internal[o.replace(".js","")] = require(path.replace("./routes","./") + "/" + o) 
        if(fs.statSync(path + '/' + o).isDirectory())
            internal[o] = getDir(path + "/" + o,{})
    });
    return internal;
}
function getRoutes(db,logger){
return function getChildPaths(obj, parentPath = '') {
        let childPaths = [];
      
        for (let key in obj) {
            if(typeof obj[key] === 'function')
                obj[key] = obj[key](db,logger);
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                const currentPath = parentPath ? `${parentPath}/${key}` : key;
             
                if(obj[key].handler)
                    childPaths.push({path: currentPath,internalPath: currentPath,...obj[key]});
                else
                    childPaths = childPaths.concat(getChildPaths(obj[key], currentPath));
            }
        }
      
        return childPaths;
      }
}


function router(express,db,logger){
    const childPaths = getRoutes(db,logger)(dirrections);
    childPaths.forEach(element => {
        try{
            if(element.path === "/")
                element.path = element.internalPath.substring(0,element.internalPath.lastIndexOf("/"))
            else if(element.path.startsWith('/'))
                element.path = element.internalPath + element.path;
            express[element.method]("/" + element.path,async (req,res) => {
                try{
                    if(element.validate)
                        await element.validate(req,res);
                }catch(err){   
                    res.status(409).send(err);
                    logger.error(err);
                    return;
                }
                try{
                    await element.handler(req,res);
                }catch(err){
                    res.status(500).send(err.message);
                    logger.error(err);
                }
            } );
        }
        catch(err){
            logger.warn(el.path + " | " + err);
        }
    });
    return express;
}
  
const dirrections = getDir("./routes",{});

  

module.exports = router;
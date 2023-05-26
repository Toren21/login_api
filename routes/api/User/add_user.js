module.exports = function(db,logger) {
    return {
        handler: async (req,res) =>{
            req.body.register_time = new Date();
            req.body.last_login = null;
            let user = new db.User(req.body);
            let result = await user.save();
          
            res.send(result); 
        },
        validate: (req,res) => {
            if (!req.body.email.includes('@')) {
                throw new Error('Email должен содержать символ "@"');
              }
            
              if (!/\.[a-zA-Z]{2,}$/.test(req.body.email)) {
                throw new Error('Недопустимое расширение домена');
              }
     
        },
        method: "post",
        path: "/"
    }
} 
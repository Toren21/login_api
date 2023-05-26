module.exports = function(db,logger) {
    return {
        handler: async (req,res) =>{
 
            const login= req.query.login;

            // if(login){
            //     // User by name
            //     const users = await db.User.find({ login });
            //     res.status(200).json(users);
            // }
            // else
            // {
                // All users
                  res.send(await db.User.find({})); 
            // }
        },
        validate: (req,res) => {
         
        },
        method: "get",
        path: "/"
    }
} 
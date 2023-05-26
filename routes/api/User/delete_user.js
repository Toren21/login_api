
module.exports = function(db,logger) {
    return {
        handler: async (req,res) =>{
            const login = req.query.login;
      
            let result = await db.User.deleteOne({ login  });
            res.status(200).json({ message: "User deleted successfully" });  
        },
        validate: (req,res) => {

        },
        method: "delete",
        path: "/"
    }
} 
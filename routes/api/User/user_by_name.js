module.exports = function(db,logger) {
    return {
        handler: async (req,res) =>{

            login = req.query.login;
            const users = await db.User.find({ login });
            res.status(200).json(users);
        },
        validate: (req,res) => {
       
        },
        method: "get",
    }
}
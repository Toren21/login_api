module.exports = function(db, logger) {
    return {
      handler: async (req, res) => {
       
          const count = await db.User.countDocuments().exec();
          res.end("Users in db: " + count.toString());
        
      },
      validate: (req, res) => {
     
      },
      method: "get",
    };
  };
  
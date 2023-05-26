module.exports = function(db,logger) {
    return {
        handler: async (req,res) =>{
         
            try {
                const { id } = req.params; 
                const { login, email, password } = req.body; 
        
                
                const updateFields = {};
                if (login) updateFields.login = login;
                if (email) updateFields.email = email;
                if (password) updateFields.password = password;
        
           
                await db.User.updateOne({ _id: id }, updateFields); 
        
                res.status(200).json({ message: 'Данные успешно обновлены' });
              } catch (error) {
                
                logger.error(error);
                res.status(500).json({ error: 'Произошла ошибка при обновлении данных' });
              }


        },
        validate: (req,res) => {
        },
        method: "post",
        path: "/:id"
    }
} 
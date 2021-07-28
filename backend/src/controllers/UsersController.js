const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async list (request, response){
        const users = await connection('users').select('*');
        
        return response.json(users);
    },
    async delete (request, response){
        const {email,password} = request.body;
       await connection('users').where('email', email).where('password',password).delete();
        
        return response.status(204).json('deletado com sucesso');

    },
     async listOne (request, response){
        const {email,password} = request.body;

        const user =  await connection('users').where('email', email).where('password', password).select('email', 'name');
        if(user == ''){
            return response.status(401).json('User does not exist');
        }
        return response.status(200).json(user);
        
     },

    async create(request, response){
        
        const {name,email,password} = request.body;
        
        const id = crypto.randomInt(2,10);
        
        await connection('users').insert({
                id,
                name,
                email,
                password,
        })
        
        const user =  await connection('users').where('id', id).first();

        if(user.id == id ){
            return response.json(201);
        }
        
    }
};


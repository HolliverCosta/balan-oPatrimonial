
const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async list (request, response){
        const owner =  parseInt(request.headers.authorization);

        const wallet =  await connection('wallet').where('owner', owner).select('*');
        
        return response.status(200).json(wallet);
     },
    async create (request,response){
        const {description,value,type} = request.body;
        
        const owner =  parseInt(request.headers.authorization);

        const id = crypto.randomInt(4);

        await connection('wallet').insert({
                id,
                description,
                value,
                owner,
                type,
        })
        
        const wallet =  await connection('wallet').where('id', id).first();

        if(wallet.id == id){
            return response.json(201);
        }

        
    },
    async delete (request,response){
        const {id} = request.params;
        const owner =  parseInt(request.headers.authorization);

       const wallet =  await connection('wallet').where('id', id).select('owner').first();

        if(wallet.owner != owner){
            return response.status(401).json({error: 'Operation not permitted'});
        }

        await connection('wallet').where('id', id).delete();

        return response.status(204).json('deletado com sucesso');
    }
};
const express = require('./node_modules/express');
//const crypto = require('crypto');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//const connection = require('./database/connection');

const routes = express.Router();

// routes.get('/ongs', async (request, response) => {
//     const ongs = await connection('ongs').select('*');

//     return response.json(ongs); //retorna um array
// });
    //criando sessão de login
    routes.post('/sessions', SessionController.create);

    routes.get('/ongs', OngController.index);
    routes.post('/ongs', OngController.create);

    routes.get('/profile', ProfileController.index);

    routes.get('/incidents', IncidentController.index);
    routes.post('/incidents', IncidentController.create);
    routes.delete('/incidents/:id', IncidentController.delete);

// routes.post('/ongs', async (request, response) => {
//     const { name, email, whatsapp, city, uf } = request.body;

//     const id = crypto.randomBytes(4).toString('HEX');

//     //node vai aguardar esse código finalizar pra continuar o resto
//     await connection('ongs').insert({
//         id,
//         name,
//         email,
//         whatsapp,
//         city,
//         uf,
//     })

//     //console.log(data);
//     //retorna só dps do insert
//     return response.json({ id });


//     //const params = request.params;
//     //console.log(params);
//     //const body = request.body;
//     //console.log(body);

//     // return response.json({
//     //     evento: 'Bla Bla',
//     //     aluno: 'eu mesma'
//     // });
// });

module.exports = routes;
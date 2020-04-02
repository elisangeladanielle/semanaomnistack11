const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;  //começa por 1 por padrão

        const [count] = await connection('incidents').count(); //retorna tds
        //console.log(count);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //comparando os ids, de cada incidente e traz os dados da ong relacionada com o incidente
            .limit(5)
            .offset((page - 1) * 5) //pular 5 registros por pg
            .select([
                'incidents.*', 
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization;
        //request.headers; //cabeçalho q guarda o contexto da requisição, como dados do idioma, autenticação...
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' }); //http status code: 401 = não autorizado
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); //204 = no content, deu sucesso, mas sem conteúdo
    }
};
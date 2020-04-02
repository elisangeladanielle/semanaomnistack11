const express = require('./node_modules/express'); //pacote
const cors = require('cors');
const routes = require('./routes'); //arquivo, por isso o ./

const app = express();

app.use(cors({
  //origin: 'http://meuapp.com'
})); //enviar origin
app.use(express.json());
//converte json em javascript = usa SEND no postman
app.use(routes);

/* Rota / Recurso */

/*Métodos HTTP:
GET: buscar/listar uma informação no back
POST: criar
PUT: alterar
DELETE: deletando
*/

/*Tipos de parâmetros:
Query Params: enviados nomeados na rota após "?" (ex: /users?name=Diego)
Route Params: utilizados para identificar recursos (users/:id = users/1 no postman)
Request Body: corpo da requisição, utilizado para criar ou alterar recursos (POST)
*/

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc (não relacionais) (tem a sua própria linguagem)
 */

 /**
  * Driver: SELECT * FROM users
  * Query Builder: table('users').select('*').where() (pode adicionar com javascript) (aceita qualquer banco SQL)
  */


app.listen(3333);
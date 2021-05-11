var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const bodyParser = require('body-parser')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const veiculosServiceProxy = httpProxy('http://localhost:3002');
const marcasServiceProxy = httpProxy('http://localhost:3003');

const login = (request, response, next) => {
    if (request.body.user === 'marvin' && request.body.password === '123') {
        //acertou usuário e senha
        const id = 1; //esse id viria do banco de dados
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expira em 5 minutos
        });
        return response.json({ auth: true, token: token });
    }
    response.status(500).json({ message: 'Login inválido!' });
}

function verificaJWT(request, response, next){
    const token = request.headers['x-access-token'];
    if (!token) return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return response.status(500).json({ auth: false, message: 'Erro ao autenticar o token.' });
      
      // Se o token for válido, salva no request para uso posterior
      request.userId = decoded.id;
      next();
    });
}
    
// Proxy request
// rota para veiculos e todos os métodos
app.all('/veiculos', verificaJWT, (req, res, next) => {
    veiculosServiceProxy(req, res, next);
})
// rota para veiculos e todos os métodos com um parâmetro ID
app.all('/veiculos/:id', verificaJWT, (req, res, next) => {
    veiculosServiceProxy(req, res, next);
})
// rota para marcas e todos os métodos
app.all('/marcas', verificaJWT, (req, res, next) => {
    marcasServiceProxy(req, res, next);
})
// rota para marcas e todos os métodos com um parâmetro ID
app.all('/marcas/:id', verificaJWT, (req, res, next) => {
    marcasServiceProxy(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.route("/login")
    .post(login)    

var server = http.createServer(app);
server.listen(3000);
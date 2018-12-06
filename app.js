var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var path = require('path'); // helpers para directorios

var routes = require('./routes');

// os middlwares têm de estar em cima de todas asa rotas
app.use((req, res, next) => {
    req.name = 'adicionei o nome na requisição usando o middleware';
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', function(req, res){
    res.send('Root');
});

app.get('/world', function(req, res){
   res.send('Hello World | ' + req.name);
});

// injectar a instancia de routes no express
app.use('/hello', routes);

app.use('/public', express.static(path.join(__dirname, 'public'))); // para poder aceder aos ficheiros estaticos da pagina public


// Middlware de tratamento de erros, usar como primeiro parametro o err;
// DEVE ESTAR SEMPRE NO FIM DE TODAS AS ROTAS
app.use((err, req, res, next) =>{
    res.status(500).json({
        message: 'Opps Erro',
        erro: err,
    });
});


// Criar o seervidor
http.createServer(app).listen(3000, function(){
    console.log('Server satarted');
});




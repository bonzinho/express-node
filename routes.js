var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
   next();
});


router.get('/', function(req, res, next){
   next(new Error('Cutom Error'));
});

//a?r a é opcional o r é obrigatorio, se tiver um ar tamb+em funciona
// a+r Ambos são obrigatorios
// a*r Posso ter quqlquer coisa entre a e r mas tem de começar em a e terminar em r
router.get('/a?r', function(req, res){
   res.send('router a?r');
});

router.get('/params/:name', (req, res) => {
    res.json({
        params: req.params,
        host: req.host,
        header: req.headers,
    })
});


// Para usar o .body instalar o npm install body-parser --save
router.post('/body', (req, res) => {
    res.json(req.body.name);
});

router.get('/res', (req, res) => {
    res.status(202).json({
        name: 'vitor',
        lastname: 'bonzinho'
    });
});

router.get('/template-engine', (req, res) => {
    res.render('nome-template-engine', {
        dados: 'Dados para oa tempalte',
    });
});




// tornar o modulo publico par apoder aceder noutras lados
module.exports = router;
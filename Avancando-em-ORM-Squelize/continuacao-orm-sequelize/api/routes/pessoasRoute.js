const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router
    // Requisições GET
    .get('/pessoas', PessoaController.pegaTodasAsPessoas)
    .get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
    .get('/pessoas/:id', PessoaController.pegaUmaPessoa)
    .get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)
    .get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas)
    .get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)
    .get('/pessoas/matricula/lotada', PessoaController.pegaTurmasLotadas)

    // Requisições POST
    .post('/pessoas', PessoaController.criaPessoa)
    .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
    .post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
    .post('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.restauraMatricula)
    .post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)
    
    // Requisições PUT 
    .put('/pessoas/:id', PessoaController.atualizaPessoa)
    .put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)

    // Requisições DELETE
    .delete('/pessoas/:id', PessoaController.apagaPessoa)
    .delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)

module.exports = router;
const express = require('express');
const contas = require('./controller/contas');

const routes = express();

routes.get('/contas',contas.listaContas);
routes.post('/contas', contas.cadastrarConta);
routes.put('/contas/:numero_conta/usuario', contas.editarConta);
routes.delete('/contas/:numero_conta/usuario', contas.excluirConta);
routes.post('/transacoes/depositar', contas.depositar);
routes.post('/transacoes/sacar', contas.sacar);
routes.post('/transacoes/transferir', contas.transferir);
routes.get('/contas',contas.verificarSaldo);
routes.get('/contas/', contas.extrato);
module.exports = { 
    
    routes


}
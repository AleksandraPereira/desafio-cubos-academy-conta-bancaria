const { contas } = require('../bancodedados');

const listaContas = (req, res) => {
    const {senha_banco} = req.query

        if (senha_banco === 'Cubos123Bank'){

            return res.status(200).json(contas);

        } else {

            return res.status(403).json({mensagem: "Senha inválida"})

        }
}

const cadastrarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!cpf){
        return res.status(400).json({mensagem: "Por favor, digite um cpf válido."});
    }

    if (!email){
        return res.status(400).json({mensagen:"Por favor, digite um email válido."});
    }

    const conta = {
        nome : nome,
        cpf : cpf,
        data_nascimento: data_nascimento,
        telefone: telefone,
        email: email,
        senha: senha

    }

    contas.push(conta);

    return res.status(201).json(conta);
}

const editarConta = (req, res) => {
    const {numero} = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome){
        return res.status(400).json({mensagem: "Por favor, preencha o campo Nome."});
    }

    if (!cpf){
        return res.status(400).json({mensagem: "Por favor, preencha o campo CPF."});
    }


    if (!data_nascimento){
        return res.status(400).json({mensagem: "Por favor, preencha o campo Data de Nascimento."});
    }

    if (!telefone){
        return res.status(400).json({mensagen:"Por favor, preencha o campo Telefone."});
    }
    
    if (!email){
        return res.status(400).json({mensagen:"Por favor, preencha o campo Email."});
    }

    const conta = contas.find((conta) => {
        return conta.numero === Number(numero);
    });

    if (!conta) {
        return res.status(404).json({mensagen: "Conta não encontrada."});
    }

    conta.nome = nome;
    conta.cpf = cpf;
    conta.data_nascimento = data_nascimento;
    conta.telefone = telefone;
    conta.email = email;
    conta.senha = senha;

    return res.status(203).send();
}

const excluirConta = (req, res) => {
    const { numero } = req.params;

    const conta = contas.find((conta) => {
        return conta.numero === Number(numero);
    });

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta bancária inexistente."});
    }

    contas = contas.filter((conta) => {
        return conta.numero =! Number(numero);
    });

    return res.status(204).send();
}

const depositar = (req, res) => {
    const {numero_conta, valor} = req.body;

    if (!numero_conta) {
        return res.status(404).json ({ mensagem: "O número da conta e o valor são obrigatórios." });
    }

    if (!valor) {
        return res.status(404).json ({ mensagem: "O número da conta e o valor são obrigatórios." });
    }

    const conta = {

       numero_conta: numero_conta,
       valor: valor
        
    }

    contas.push(conta);

    return res.status(201).json(conta);
}

const sacar = (req, res) => {
    const {numero_conta, valor, senha} = req.body;

    if (!numero_conta) {
        return res.status(404).json ({ mensagem: "O número da conta é inválido." });
    }

    if (!valor) {
        return res.status(404).json ({ mensagem: "O valor não pode ser menor que zero." });
    }

    if (!senha) {
        return res.status(401).json ({ mensagem: "Senha inválida." });
    }

    const conta = {

       numero_conta: numero_conta,
       valor: valor,
       senha: senha
        
    }

    contas.push(conta);

    return res.status(201).json(conta);
}


const transferir = (req, res) => {
    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body;

    let contaOrigem = contas.find(conta => conta.numero === numero_conta_origem);
    let contaDestino = contas.find(conta => conta.numero ===numero_conta_destino);

    if (!contaOrigem) {
        return res.status(401).json ({ mensagem: "Senha inválida." });
    }

    if (!contaOrigem.saldo < valor) {
        return res.status(400).json ({ mensagem: "O saldo é insuficiente." });
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const conta = {

       numero_conta_origem: numero_conta_origem,
       numero_conta_destino: numero_conta_destino,
       valor: valor,
       senha: senha
        
    }

    contas.push(conta);

    return res.status(201).json(conta);
}

const verificarSaldo = (req, res) => {
    const {numero_conta, senha_banco} = req.query;

    if (!numero_conta){
        return res.status(200).json(contas);
        
    } else if (senha_banco !== 'Cubos123Bank'){
        return res.status(403).json({mensagem: "Senha Inválida"});

    } else {
        return res.status(200).json(contas);
    }
}

const extrato = (req, res) => {
    const {numero_conta, senha_banco} = req.query

    if (!numero_conta) {
        return res.status(403).json ({ mensagem: "O número da conta é inválido." });
}
    if (!senha_banco) {
        return res.status(403).json({ mensagem: "Senha Inválida." });
    }

    const contaExiste = contas.find(conta => conta.numero_conta === numero_conta);

    if (!contaExiste) {
        return res.status(403).json({ mensagem: "A conta bancária informada não existe." });

    }

    if (contaExiste.senha_banco !== senha_banco){
        return res.status(403).json({ mensagem: "Senha inválida." });
    }

    return res.status(200).json(contaExiste.trasacoes);

    }



module.exports = {
    listaContas,
    cadastrarConta,
    editarConta,
    excluirConta,
    depositar,
    sacar,
    transferir, 
    verificarSaldo,
    extrato
}
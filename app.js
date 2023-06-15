
function verificarDado(dado){
    //verificando se há mais que 100 caracteres
    if(dado.length > 100) {
        alert("Deve ser digitado no máximo 100 caracteres.");
    }
}

function verificarCpf(cpf){
    //verificar se o CPF é valido

    //replace procura . e -, o g significa global, fazer isso em toda string, depois atribui vazio
    cpf = cpf.replace(/[.-]/g, "");

    //verificando se há apenas 11 caracteres
    if(cpf.length>11){
        alert("CPF inválido");
    }

    //transformando o cpf em número
    let digitos = cpf.toString().split("").map(Number);

    let soma = 0;
    let dig1 = 0;//variavel para o primeiro digito de verificação após o traço
    let dig2 = 0;//variavel para o segundo digito de verificação após o traço
    let j = 10;//recebe 10 pois irá multiplicar pelos digitos de trás para frente

    //laço para percorrer o cpf até o ultimo digito antes do traço
    for(let i=0; i<=8; i++){
        //resultado da multiplicação
        let mult = digitos[i] * j;
        //decrescendo para multiplicar pelo anterior
        j--;
        //somando o resultado das multiplicações
        soma=soma+mult;
        
    }

    //verificando se o resto da soma é menor que 2
    if(soma%11<2){
        dig1 = 0;
    }else{
        //se for maior, o digito1 recebe 11-o resto de soma dividido por 11
        dig1 = 11-(soma%11);
    }

    soma=0;//zerando soma para não ter valores anteriores
    j = 11;//recebe 10 pois irá multiplicar pelos digitos de trás para frente

    //laço para percorrer o cpf até o ultimo digito antes do traço
    for(let i=0; i<=9; i++){
        //resultado da multiplicação
        let mult = digitos[i] * j;
        //decrescendo para multiplicar pelo anterior
        j--;
        //somando o resultado das multiplicações
        soma=soma+mult;
    }

    //verificando se o resto da soma é menor que 2
    if(soma%11<2){
        dig2 = 0;
    }else{
        //se for maior, o digito1 recebe 11-o resto de soma dividido por 11
        dig2 = 11-(soma%11);
    }


    if(dig1!==digitos[9]&&dig2!==digitos[10]){
        alert("CPF inválido!");
    }

    console.log(dig1);
    console.log(dig2);
}

function verificarIdade(data_nasc){

    //cria objetos Date com as datas de nascimento e a data atual
    const dataNasc = new Date(data_nasc);
    const dataAtual = new Date();
    //retornando o mes das datas
    const mesNasc = dataNasc.getMonth();
    const mesAtual = dataAtual.getMonth();
    //calculo para descobrir idade
    let idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    //verificando se já fez aniversário
    if(mesAtual<mesNasc){
        idade--;
        document.getElementById('mensagem_idade').innerHTML = "Você ainda não fez aniversário";
    }

    document.getElementById('mensagem_idade2').innerHTML = "Sua idade é " + idade + " anos";
}

function verificarRenda(renda){
    //verificando se a renda está acima ou abaixo da media
    if(renda >= 2787.00){
        document.getElementById('mensagem_renda').innerHTML = "Sua renda está acima da média mensal do brasileiro";
    }else{
        document.getElementById('mensagem_renda').innerHTML = "Sua renda está abaixo da média mensal do brasileiro";
    }
}

function mostrarDados(dados) {
    for(let i=0; i<dados.length; i++){
        document.querySelector('#dados1').innerHTML = "Nome: " + dados[i].nome;
        document.querySelector('#dados2').innerHTML = "CPF: " + dados[i].cpf;
        document.querySelector('#dados3').innerHTML = "Endereço: " + dados[i].endereco;
        document.querySelector('#dados4').innerHTML = "Data de Nascimento: " + dados[i].data_nascimento;
        document.querySelector('#dados5').innerHTML = "Renda Mensal: " + dados[i].renda_mensal;
        document.querySelector('#dados6').innerHTML = "Profissão: " + dados[i].profissao;
    }
}

//array para armazenar dados do cliente
const clientes = [];

function pegarConteudo(){
    //função que irá armazenar os dados dentro da array

    event.preventDefault();//função que bloqueia o evento de recarregar a página quando clicado o button

    const formulario = document.getElementById('formulario');//armazenando dados inseridos dentro de uma variável
    const inputs = formulario.elements; //separando os elementos por nome

    //objeto contendo os dados do cliente
    const dadosCliente = {};

    //laço para percorrer elementos de inputs
    for(let i=0; i<inputs.length; i++){

        //atribundo dado do input a valor
        const valor = inputs[i];

        //verificando se o dado contem name (identificação)
        if(valor.name){

            if(valor.name === "nome" || valor.name === "endereco" || valor.name === "profissao"){
                //funcao para verificar quantidade de caracteres
                verificarDado(valor.value);
            }

            if(valor.name === "cpf"){
                //funcao para verificar se o CPF é valido
                verificarCpf(valor.value);
            }

            if(valor.name === "data_nascimento"){
                //função para dizer a idade com cliente e se já fez aniversário
                verificarIdade(valor.value);
            }

            if(valor.name === "renda_mensal"){
                //função para verificar se a renda está na media
                verificarRenda(valor.value);
            }

            //atribundo dado com propriedade e valor ao objeto dados do cliente
            dadosCliente[valor.name] = valor.value;
        }

    }

    const profissaoSelect = document.getElementById('profissao');
    const profissaoSelecionada = profissaoSelect.value;

    dadosCliente['profissao'] = profissaoSelecionada;

    //empurrando dados do cliente em uma array clientes
    clientes.push(dadosCliente);
    console.log(clientes);

    mostrarDados(clientes);

}

function mudarCor() {
    var botao = document.getElementById("cadastrar");
    botao.style.backgroundColor = "#233f5f";
}

function enviar() {
    var botao = document.getElementById("cadastrar");
    botao.innerHTML = "ENVIADO";
    botao.style.backgroundColor = "#5e7fa0";
}
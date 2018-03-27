function calcular() {
    let entradas = { x: document.querySelector('#x').value, y: document.querySelector('#y').value }
    let tipoOperacao = document.querySelector('select').value;

    let somatorioNeuronio1 = (entradas.x * -2) + (entradas.y * 2);
    let somatorioNeuronio2 = (entradas.x * 2) + (entradas.y * -2);

    let integracaoNeuronio1 = calculoDependendoDoTipo(tipoOperacao, somatorioNeuronio1);
    let integracaoNeuronio2 = calculoDependendoDoTipo(tipoOperacao, somatorioNeuronio2);

    let somatorioNeuronio3 = (integracaoNeuronio1 * 1) + (integracaoNeuronio2 * 1);
    let integracaoNeuronio3 = calculoDependendoDoTipo(tipoOperacao, somatorioNeuronio3);

    console.log(integracaoNeuronio3);
}

function calculoDependendoDoTipo(tipoOperacao, valor) {
    switch (tipoOperacao) {
        case "limiteRapido":
            return limiteRapido(valor);
            break;
        case "funcaoSigmoide":
            return funcaoSigmoide(valor);
            break;
        case "funcaoRampa":
            return funcaoRampa(valor);
            break;
    }
}

function limiteRapido(valor) {
    if (valor <= 0) return -1;
    if (valor > 0) return 1;
}

function funcaoRampa(valor) {
    if (valor < 0) return 0;
    if (valor >= 0 && valor <= 1) return valor;
    if (valor > 1) return 1;
}

function funcaoSigmoide(valor) {
    if (valor >= 0) {
        return 1 + -1 / (1 + valor);
    } else {
        return -1 + 1 / (1 - valor);
    }
}
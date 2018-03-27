//[tem olho,perna,rasteja]
const conjuntos = [
    {
        conjunto: [1, 1, 0],
        resultado: 0
    },
    {
        conjunto: [1, 0, 1],
        resultado: 1
    }, {
        conjunto: [1, 0, 0],
        resultado: 0
    },
    {
        conjunto: [0, 0, 0],
        resultado: 0
    }
];

let pesos = [-1, -1, -1];

let soma = (array, pesos) => {
    return array.reduce((acc, atual, index) => acc += atual * pesos[index], 0);
}

const calculoDependendoDoTipo = (tipoOperacao, valor, resultado) => {
    switch (tipoOperacao) {
        case "limiteRapido":
            return resultado(limiteRapido(valor));
            break;
        case "funcaoSigmoide":
            return resultado(funcaoSigmoide(valor));
            break;
        case "funcaoRampa":
            return resultado(funcaoRampa(valor));
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

let naoSatisfatorio = false;

do {
    naoSatisfatorio = false;

    conjuntos.forEach((conjunto) => {
        let somatorio = soma(conjunto.conjunto, pesos);
        calculoDependendoDoTipo('funcaoRampa', somatorio, (resultado) => {
            if (conjunto.resultado !== resultado) {
                naoSatisfatorio = true;
                pesos = pesos.map((peso, index) => {
                    return peso + 1 * (conjunto.resultado - resultado) * conjunto.conjunto[index];
                })
            }
        });
    })

} while (naoSatisfatorio);

let conjuntoFinal = [
    {
        conjunto: [1, 1, 0]
    }
];


function testa(conjuntos) {
    conjuntos.forEach((conjunto) => {
        let somatorio = soma(conjunto.conjunto, pesos);

        calculoDependendoDoTipo('funcaoRampa', somatorio, (resultado) => {
            if(resultado === 0){
                console.log('pessoa');
            }else{
                console.log('cobra')
            }
        });
    });
}

testa(conjuntoFinal);
console.log(`Peso reajustado para ${pesos}`);
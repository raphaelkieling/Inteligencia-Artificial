let pesos = [];

function iniciaPesos(entrada) {
    entrada.forEach(entradaX => {
        let pesoX = [];
        entradaX.forEach(entradaXAtual => {
            pesoX.push(Math.random());
        })
        pesos.push(pesoX);
    })
}

function init(entrada) {
    iniciaPesos(entrada);
}

module.exports = {
    init
}
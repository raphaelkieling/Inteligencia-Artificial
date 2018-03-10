const pesos = [-1, 1];

function calcular() {
  const tipoOperacao = document.querySelector("select").value;
  const entradas = pegaValoresDoInput();
  const resultadoPesos = processaPesos(entradas);
  const resultadoSoma = somatorio(resultadoPesos);
  const resultadoFinal = calculoDependendoDoTipo(tipoOperacao, resultadoSoma);
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

function processaPesos(entradas) {
  return entradas.map((entrada, i) => {
    return entrada * pesos[i];
  });
}

function somatorio(arrayDeValores) {
  return arrayDeValores.reduce((acc, at) => acc + at, 0);
}

function pegaValoresDoInput() {
  const inputs = document.querySelectorAll("input");
  const entradas = [];
  const pegaValorColocaNasEntradas = el => {
    entradas.push(parseInt(el.value) || 0);
  };
  inputs.forEach(pegaValorColocaNasEntradas);

  return entradas;
}

function adicionaInput() {
  const containerDeInputs = document.querySelector("#inputPesos");
  containerDeInputs.innerHTML = "";
  const numeroDeValoresEPesos = document.querySelector(
    "#numeroDeEntradasEPesos"
  ).value;

  for (let i = 0; i < parseInt(numeroDeValoresEPesos); i++) {
    includeCampoNaDiv(containerDeInputs, i);
  }
}

function includeCampoNaDiv(containerDeInputs, i) {
  containerDeInputs.innerHTML += `
      <div class="col-md-6 form-group">
        <label for="">x (${i})</label>
        <input data-id="${i}" type="text" class="entrada form-control">
      </div>

      <div class="col-md-6 form-group">
        <label for="">w (${i})</label>
        <input data-id="${i}" type="text" class="peso form-control">
      </div>
  `;
}

function pegaInformacoes() {
  const pesos = [];
  const entradas = [];

  document.querySelectorAll(".entrada").forEach(el => {
    pesos.push(parseInt(el.value));
  });

  document.querySelectorAll(".peso").forEach(el => {
    entradas.push(parseInt(el.value));
  });

  return {
    entradas,
    pesos
  };
}

function calcular() {
  const { entradas, pesos } = pegaInformacoes();

  const tipoOperacao = document.querySelector("select").value;
  const resultadoPesos = processaPesos(entradas, pesos);
  const resultadoSoma = somatorio(resultadoPesos);
  const resultadoFinal = calculoDependendoDoTipo(tipoOperacao, resultadoSoma);
  document.querySelector(".result").textContent = resultadoFinal;
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

function processaPesos(entradas, pesos) {
  return entradas.map((entrada, i) => {
    return entrada * pesos[i];
  });
}

function somatorio(arrayDeValores) {
  return arrayDeValores.reduce((acc, at) => acc + at, 0);
}

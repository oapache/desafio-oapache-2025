class AbrigoAnimais {
  animais = {
    Rex: { especie: "cão", brinquedos: ["RATO", "BOLA"] },
    Mimi: { especie: "gato", brinquedos: ["BOLA", "LASER"] },
    Fofo: { especie: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
    Zero: { especie: "gato", brinquedos: ["RATO", "BOLA"] },
    Bola: { especie: "cão", brinquedos: ["CAIXA", "NOVELO"] },
    Bebe: { especie: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
    Loco: { especie: "jabuti", brinquedos: ["SKATE", "RATO"] },
  };

  brinquedosValidos = new Set([
    "RATO",
    "BOLA",
    "LASER",
    "CAIXA",
    "NOVELO",
    "SKATE",
  ]);

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const listaAnimaisConsiderados = ordemAnimais.split(",")
    const brinquedosP1 = brinquedosPessoa1.split(",")
    const brinquedosP2 = brinquedosPessoa2.split(",")

    for (const nomeAnimal of listaAnimaisConsiderados) {
      if (!this.animais[nomeAnimal]) {
        return { erro: "Animal inválido" };
      }
    }
    const todosBrinquedos = [...brinquedosP1, ...brinquedosP2];
    for (const brinquedo of todosBrinquedos) {
      if (!this.brinquedosValidos.has(brinquedo)) {
        return { erro: "Brinquedo inválido" }
      }
    }
    if (
      new Set(listaAnimaisConsiderados).size !== listaAnimaisConsiderados.length
    ) {
      return { erro: "Animal inválido" }
    }

    let adocoesP1 = 0
    let adocoesP2 = 0
    const brinquedosUsadosGatosP1 = new Set()
    const brinquedosUsadosGatosP2 = new Set()
    const resultado = {}

    for (const nomeAnimal of listaAnimaisConsiderados) {
      const animal = this.animais[nomeAnimal]

      const p1Consegue = this.podeAdotar(
        animal,
        brinquedosP1,
        brinquedosUsadosGatosP1,
        adocoesP1
      );

      const p2Consegue = this.podeAdotar(
        animal,
        brinquedosP2,
        brinquedosUsadosGatosP2,
        adocoesP2
      );

      if (nomeAnimal === "Loco" && (p1Consegue || p2Consegue)) {
        const outrasAdocoes = adocoesP1 + adocoesP2 > 0;
        if (!outrasAdocoes) {
          if (p1Consegue && !p2Consegue && adocoesP2 > 0) {
          } else if (p2Consegue && !p1Consegue && adocoesP1 > 0) {
          } else {
            resultado[nomeAnimal] = "abrigo"
            continue;
          }
        }
      }

      if (p1Consegue && !p2Consegue) {
        resultado[nomeAnimal] = "pessoa 1"
        adocoesP1++;
        if (animal.especie === "gato") {
          animal.brinquedos.forEach((b) => brinquedosUsadosGatosP1.add(b));
        }
      } else if (!p1Consegue && p2Consegue) {
        resultado[nomeAnimal] = "pessoa 2"
        adocoesP2++;
        if (animal.especie === "gato") {
          animal.brinquedos.forEach((b) => brinquedosUsadosGatosP2.add(b));
        }
      } else {
        resultado[nomeAnimal] = "abrigo";
      }
    }

    if (resultado["Loco"] && resultado["Loco"] !== "abrigo") {
      const totalAdocoes = Object.values(resultado).filter(
        (v) => v !== "abrigo"
      ).length;
      if (totalAdocoes < 2) {
        resultado["Loco"] = "abrigo"
      }
    }

    const listaFinal = Object.keys(resultado)
      .map((nome) => `${nome} - ${resultado[nome]}`)
      .sort();

    return { lista: listaFinal }
  }

  podeAdotar(animal, brinquedosPessoa, brinquedosUsadosGato, adocoesAtuais) {
    if (adocoesAtuais >= 3) return false;

    // Regra do gato egoísta
    if (animal.especie === "gato") {
      for (const b of animal.brinquedos) {
        if (brinquedosUsadosGato.has(b)) return false;
      }
    }

    if (animal.especie !== "jabuti") {
      let ultimoIndice = -1;
      for (const brinquedoDesejado of animal.brinquedos) {
        const indiceAtual = brinquedosPessoa.indexOf(
          brinquedoDesejado,
          ultimoIndice + 1
        );
        if (indiceAtual === -1 || indiceAtual < ultimoIndice) {
          return false
        }
        ultimoIndice = indiceAtual
      }
    } else {
   
      for (const brinquedinhos of animal.brinquedos) {
        if (!brinquedosPessoa.includes(brinquedinhos)) return false;
      }
    }

    return true
  }
}

export { AbrigoAnimais as AbrigoAnimais }

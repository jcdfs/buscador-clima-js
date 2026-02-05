async function buscarClima() {
  const cidadeInput = document.getElementById("cidadeInput");
  const cidade = cidadeInput.value;

  cidadeInput.value = "";
  cidadeInput.focus();

  const areaResultado = document.getElementById("resultadoClima");
  // Adicione sua chave da OpenWeatherMap API abaixo
  // Obtenha sua chave em: https://openweathermap.org/api
  const chave = "SUA_CHAVE_AQUI";

  if (chave === "SUA_CHAVE_AQUI") {
    alert(
      "Por favor, obtenha a KEY no site https://openweathermap.org/api e depois adicione na const chave = SUA_CHAVE_AQUI"
    );
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chave}&lang=pt_br`;

  areaResultado.innerHTML = "Buscando...";

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.cod === 200) {
      areaResultado.innerHTML = "";

      const cardClima = document.createElement("div");
      const nomeCidade = document.createElement("h2");
      const temperatura = document.createElement("p");
      const umidade = document.createElement("p");
      const descricao = document.createElement("p");
      const icone = document.createElement("img");

      nomeCidade.textContent = dados.name;
      temperatura.textContent = `${dados.main.temp}°C`;
      umidade.textContent = `${dados.main.humidity}% de umidade`;
      descricao.textContent = dados.weather[0].description;

      const codIcone = dados.weather[0].icon;
      icone.src = `https://openweathermap.org/img/wn/${codIcone}@2x.png`;

      cardClima.append(nomeCidade, temperatura, umidade, icone, descricao);

      areaResultado.appendChild(cardClima);
    } else {
      areaResultado.textContent = "Erro: cidade não encontrada";
    }
  } catch (error) {
    console.error("Erro na busca:", error);
  }
}

document.getElementById("climaBtn").addEventListener("click", buscarClima);

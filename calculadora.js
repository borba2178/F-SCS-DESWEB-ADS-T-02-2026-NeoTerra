/* NeoTerra — calculadora de carbono (estimativa educativa).
   ATENÇÃO: fatores de referência aproximados. Conferir/atualizar com IEA e
   fontes oficiais brasileiras e citar a fonte na página antes da entrega. */
const FATORES = {
  carroKgPorKm: { gasolina: 0.17, etanol: 0.09, diesel: 0.19 }, // kg CO2e por km
  kgPorKwh: 0.08,        // kg CO2e por kWh (rede elétrica brasileira, valor médio aproximado)
  kgPorBotijao13: 38     // kg CO2e por botijão de 13 kg de GLP
};

const form = document.getElementById("form-calc");
const saida = document.getElementById("calc-resultado");
const vazio = document.getElementById("calc-vazio");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const km = Number(form.km.value);
  const kwh = Number(form.kwh.value);
  const gas = Number(form.gas.value);

  const carro = km * 4.345 * FATORES.carroKgPorKm[form.comb.value]; // 4,345 semanas/mês
  const luz = kwh * FATORES.kgPorKwh;
  const botijao = gas * FATORES.kgPorBotijao13;
  const total = carro + luz + botijao;
  const f = (n) => n.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

  saida.innerHTML =
    `<p><strong>${f(total)} kg de CO₂ por mês</strong></p>` +
    `<ul><li>Carro: ${f(carro)} kg</li><li>Energia elétrica: ${f(luz)} kg</li><li>Gás de cozinha: ${f(botijao)} kg</li></ul>` +
    `<p>Veja como reduzir no <a href="guia-acoes.html">Guia de ações práticas</a>.</p>`;
  saida.hidden = false;
  vazio.hidden = true;
});

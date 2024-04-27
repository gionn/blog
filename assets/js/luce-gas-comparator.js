// Use grid.js to create a table with the data of the light and gas offers

data_table_light = [
  ["Iren web self luce", 0.1, 0.1, 0.1, 120, 0],
  ["A2A Start Luce Fissa", 0.129, 0.129, 0.129, 114, 0],
  ["A2A Start Luce Fasce", 0.1374, 0.125, 0.125, 114, 0],
  ["Octopus Fissa 12M", 0.1178, 0.1178, 0.1178, 96, 0],
  ["Nen Luce", 0.139, 0.139, 0.139, 96, 0],
  ["Engie PuntoFisso Mono", 0.1342, 0.1342, 0.1342, 96, 0],
  ["Engie PuntoFisso Fasce", 0.1428, 0.1434, 0.1241, 96, 0],
  ["E.On Luce Verde Click", 0.113, 0.113, 0.113, 132, 0],
  ["E.On Luce Verde Click bioraria", 0.121, 0.1085, 0.1085, 132, 0],
];

data_table_gas = [
  ["NeN Gas", 0.49, 96, 0],
  ["E.ON GasClick", 0.461, 108, 0],
  ["IREN prezzo fisso ultra gas", 0.52, 144, 0],
  ["Engie Energia PuntoFisso Gas", 0.45, 96, 0],
  ["Enel Energia E-LIGHT GAS", 0.46, 144, 0],
  ["Eni Plenitude Fixa Time Gas", 0.525, 144, 0],
];

var inputSMC = document.getElementById("consumo-smc");
var inputF1 = document.getElementById("consumo-f1");
var inputF2 = document.getElementById("consumo-f2");
var inputF3 = document.getElementById("consumo-f3");

var grid_light = new gridjs.Grid({
  columns: [
    "Nome",
    "F1",
    "F2",
    "F3",
    "Fisso annuo",
    { name: "Totale", sort: true },
  ],
  data: data_table_light,
});

var grid_gas = new gridjs.Grid({
  columns: [
    "Nome",
    "Prezzo SMC",
    "Fisso annuo",
    { name: "Totale", sort: true },
  ],
  data: data_table_gas,
});

grid_light.render(document.getElementById("table-wrapper-light"));
grid_gas.render(document.getElementById("table-wrapper-gas"));

updateFunction_light = function () {
  var valueF1 = document.getElementById("consumo-f1").value;
  var valueF2 = document.getElementById("consumo-f2").value;
  var valueF3 = document.getElementById("consumo-f3").value;
  updated_data_table = data_table_light.map((row) => {
    total = row[1] * valueF1 + row[2] * valueF2 + row[3] * valueF3 + row[4];
    return [row[0], row[1], row[2], row[3], row[4], Number(total.toFixed(2))];
  });
  grid_light
    .updateConfig({
      data: updated_data_table,
    })
    .forceRender();
};

updateFunction_gas = function () {
  var valueSMC = document.getElementById("consumo-smc").value;
  updated_data_table = data_table_gas.map((row) => {
    total = row[1] * valueSMC + row[2];
    return [row[0], row[1], row[2], Number(total.toFixed(2))];
  });
  grid_gas
    .updateConfig({
      data: updated_data_table,
    })
    .forceRender();
};

inputSMC.addEventListener("input", updateFunction_gas);
inputF1.addEventListener("input", updateFunction_light);
inputF2.addEventListener("input", updateFunction_light);
inputF3.addEventListener("input", updateFunction_light);

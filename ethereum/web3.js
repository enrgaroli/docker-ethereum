const fs = require("fs");
const Web3 = require("web3");

const web3Network = "ganache"

// Crea una instancia de web3 en la la red ganache-cli
// Aqui esta la URL http://ganache:8545
// esta ganache es el nombre del contenedor donde esta corriendo ganache-cli
const web3 = new Web3(new Web3.providers.HttpProvider("http://ganache:8545"))

// Configuracion local de ganache-cli
const eventProvider = new Web3.providers.WebsocketProvider(
  "ws://ganache:8545"
);

web3.setProvider(eventProvider);

module.exports = {
  web3,
  web3Network
};
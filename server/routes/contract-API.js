const express = require("express");
const router = express.Router();
const compile = require("../../ethereum/compile");
const deploy = require("../../ethereum/deploy");

// Compila el contrato
router.post("/compile", async function (req, res, next) {
  const result = compile();
  res.send(result);
});

// Despliega el contrato
router.post("/deploy", async function (req, res, next) {
  const result = await deploy("Namaste Dockercon 2022!");
  res.send(JSON.parse(result).address);
});

module.exports = router;

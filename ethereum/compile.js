const fs = require("fs-extra");
const path = require("path");
const solc = require("solc");

const compile = () => {
    try {
    // Construye la ruta donde se guarda el contrato compilado
    const buildPath = path.resolve(__dirname,"./build");

    // Elimina la carpeta del constructor si existe 
    fs.removeSync(buildPath);

    // la ruta del contrato inteligente 
    const contractPath = path.resolve(__dirname,"./contracts","Message.sol");
    
    // Lee el Contrato Inteligente
    const source = fs.readFileSync(contractPath, "utf8");

    // Compila el CI
    const output = solc.compile(source, 1).contracts[":Message"];
    
    // Crea la carpeta del constructor si no existe 
    fs.ensureDirSync(buildPath);
    
    // Guarda la salida en formato json
    fs.outputJSONSync(path.resolve(buildPath, "Message"+".json"), output);

    return "Contract compiled successfully!"
    } catch (error) {
        console.error(error);
        return error;
    }
};

// console.log(compile());

module.exports = compile;
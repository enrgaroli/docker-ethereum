const fs = require("fs-extra");
const path = require("path");
const {web3, web3Network} = require("./web3");
const compiledContract = require("./build/Message.json");
const circularJSON = require('circular-json');

const deploy = async (mymessage) => {
    try {
        // Establece la ruta de recepción   
        const receiptPath = path.resolve("ethereum","receipt-"+web3Network+".json");
        console.log(`---------- receipt path -------- ${receiptPath}`);
        
        // despliega el contrato con accounts[0]
        const accounts = await web3.eth.getAccounts();
        console.log(`Attempting to deploy from account , ${accounts[0]}`);

        /**
         * Para desplegar uno nuevo requiere una interfaz de contrato y su bytecode 
         * Ambos los obtendremos despues de compilar el contrato inteligente
         * El contrato compilado es guardado en la carpeta del constructor en formato json  
         */
        const result = await new web3.eth.Contract(
            JSON.parse(compiledContract.interface)
        )
        .deploy({data: compiledContract.bytecode, arguments: [mymessage]})
        .send({gas: 3000000, from: accounts[0]});
        console.log(`Contract deployed to ${result.options.address}`);

        // CircularJson se convierte en un un objeto anidado en una cadena que puede guardarse como json
        const serialised = circularJSON.stringify(result.options);

        fs.writeJsonSync(receiptPath,result.options);
    
        console.log("receipt saved successfully");
        return await serialised;
    } catch (error) {
        console.error(error);
        return error;
    }
}

// deploy("hello world");
module.exports = deploy;
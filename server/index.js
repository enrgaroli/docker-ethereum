const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const contractAPIRoutes = require("./routes/contract-API");
const smartContractAPIRoutes = require("./routes/smart-contract-API");

const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        limit:"50mb",
        extended:false,
        parameterLimit:50000    
    })
);


// Usa las rutas especificadas en la ruta del fichero
app.use("/", contractAPIRoutes);
app.use("/",smartContractAPIRoutes);


app.use(function(err, req,res, next){
    res.status(422).send({error: err.message});
});

app.listen( port, function(){
    console.log(`Listening to the port ${port} .....`);
});
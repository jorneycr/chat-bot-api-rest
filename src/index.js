const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./.env.development" });

//cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require("cors");

//crear servidor
const app = express();

//parsear el cuerpo de las solicitudes HTTP con formato JSON
app.use(express.json());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error al conectar a MongoDB:', err);
});

//habilitar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: [process.env.FRONTEND_URL_PROD, process.env.FRONTEND_URL_DEV],
    methods: 'GET,HEAD,POST',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use("/", routes());

//puerto
const host = process.env.HOST;
const port = process.env.PORT || 5000;

//iniciar app
app.listen(port, host, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});

// Exportar app para pruebas
module.exports = app;
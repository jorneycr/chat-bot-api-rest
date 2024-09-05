const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./.env.development" });

//cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require("cors");

//crear servidor
const app = express();

//habilitar cors con lista blanca
//definir un dominio para recibir las peticiones
const whitelist = [
    process.env.FRONTEND_URL_PROD,
    process.env.FRONTEND_URL_DEV
];

const corsOptions = {
    origin: (origin, callback) => {
        // Permitir todas las solicitudes en el entorno de desarrollo
        if (!origin || whitelist.includes(origin)) {
            callback(null, true); // Permitir la solicitud
        } else {
            callback(new Error("No permitido por CORS")); // Bloquear la solicitud
        }
    },
};

app.use(cors(corsOptions));
// app.use(cors());
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


app.use("/", routes());

//puerto
const host = process.env.HOST;
const port = process.env.PORT;

//iniciar app
app.listen(port, host, () => {
    console.log("El servidor esta funcinando");
});

// Exportar app para pruebas
module.exports = app;
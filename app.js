import dotenv from "dotenv";
import express from "express";
import appCampus from "./routers/campus.js";
import {appToken, appVerify} from "./limit/token.js"

dotenv.config();
let app = express();

//Endpoints y middlewares
app.use(express.json())
app.use("/campus",appVerify,appCampus) // acá colocamos la verificacion en los tokens para cada endpoint
app.use("/token",appToken)//acá tambien colocamos el generador de token, se coloca en el endpoint en el app.js, acá lo que hace miguel es que al endpoint /token le genere automáticamente un token sin usar ninguna peticion ya que ningun archivo está conectado a esto


//Servidor
let config= JSON.parse(process.env.MY_SERVER);
app.listen(config,()=>{
    console.log(`http://${config.hostname}:${config.port}`);
})
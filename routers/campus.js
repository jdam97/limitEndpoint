import { Router } from "express";
import { con } from "../db/atlas.js"
import { limitGrt } from "../limit/config.js";
import {appMiddlewareCampusVerify, appDTOData} from "../middleware/campus.js";
import { ObjectId } from "mongodb";
const appCampus = Router();

let db = await con(); // coloco la conexion global para este router
let usuario = db.collection("usuario"); // coloco esto para no estar haciendolo en cada endpoint


//get all
appCampus.get("/",limitGrt(), appMiddlewareCampusVerify, async (req, res) => {
    let result = await usuario.find({}).toArray();
    console.log(req.rateLimit) // para mostrar el limite de solicitudes
    res.send(result);
});

//get por id por params
appCampus.get("/:id",limitGrt(),appMiddlewareCampusVerify,async(req,res)=>{
    console.log(req.rateLimit)
    let {id} = req.params; //desestructuro
    let result = await usuario.find({_id: new ObjectId(id)}).toArray();
    res.send(result[0])
})

//Post
appCampus.post("/",limitGrt(),appMiddlewareCampusVerify,appDTOData,async(req,res)=>{
    let resul;
    try{
        let result = await usuario.insertOne(req.body);
        console.log(result);
        res.send("tolis");
    } catch (error){
        resul = JSON.parse(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description);
        res.status(resul.status).send(resul);
    }
})

//Delete
appCampus.delete("/",limitGrt(),async(req,res)=>{
    if(!req.rateLimit) return;
    let {_id} = req.body;
    let db = await con();
    let usuario = db.collection("usuario");
    try{
        let result = await usuario.deleteOne({_id:new ObjectId(_id)});
        if (result.deletedCount===1) {
            console.log(result);
            res.send(`eliminado`)
        }
        else{
            res.send(`id no encontrado, no se puso eliminar`)
        }     
    } catch (error){
        console.log(error);
        res.send("no se ha borrado")
    }
})

export default appCampus


import { Router } from "express";
import { con } from "../db/atlas.js"
import { limitGrt } from "../limit/config.js";
import { ObjectId } from "mongodb";
const appCampus = Router();


//get por id
appCampus.get("/",limitGrt(), async(req,res)=>{
    console.log(req.rateLimit)
    if (!req.rateLimit) return; //el return vacio es para que se salga del if
    let {id} = req.body; //desestructuro
    let db = await con();
    let usuario = db.collection("usuario");
    let result = await usuario.find({_id: new ObjectId(id)}).toArray();
    res.send(result)
})

//Post
appCampus.post("/",limitGrt(),appmiddlewareCampus,async(req,res)=>{
    if(!req.rateLimit) return;
    let db = await con();
    let usuario = db.collection("usuario");
    try{
        let result = await usuario.insertOne(req.body);
        console.log(result);
        res.send("tolis");
    } catch (error){
        console.log(error);
        res.send("pailas")
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


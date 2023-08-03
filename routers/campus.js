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

export default appCampus
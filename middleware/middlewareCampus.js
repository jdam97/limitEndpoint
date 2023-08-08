import { Router } from "express";
const appmiddlewareCampus = express();

appmiddlewareCampus.use ((req,res,next)=>{
    if (!req.rateLimit) return; //el return vacio es para que se salga del if
    next();
})



export default appmiddlewareCampus
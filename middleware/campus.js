import 'reflect-metadata';
import {plainToClass, classToPlain} from 'class-transformer';
import {validate} from 'class-validator';
import { User } from "../routers/storage/usuario.js";
import { Router } from "express";
const appMiddlewareCampusVerify = Router();
const appDTOData = Router();

//lo que hace acá es meter las 2 verificaciones, tanto DTO como la de tokens.

//Verificacion de tokens
appMiddlewareCampusVerify.use((req,res,next) => {
    if(!req.rateLimit) return; //el return vacio es para que se salga del if, esto es lo que hizo ludwing pero lo meto acá
    let {payload} = req.data;
    const { iat, exp, ...newPayload } = payload;
    payload = newPayload;
    let Clone = JSON.stringify(classToPlain(plainToClass(User, {}, { ignoreDecorators: true })));
    let Verify = Clone === JSON.stringify(payload);
    (!Verify) ? res.status(406).send({status: 406, message: "No Autorizado"}) : next();  
});

//Verificacion del Dto
appDTOData.use( async(req,res,next) => {
    try {
        let data = plainToClass(User, req.body);
        await validate(data);
        req.body = data;
        req.data = JSON.stringify(data);
        next();
    } catch (err) {
        res.status(err.status).send(err)
    }
});

export {
    appMiddlewareCampusVerify,
    appDTOData
};
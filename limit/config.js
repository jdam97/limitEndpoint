import { rateLimit } from "express-rate-limit"; //importamos la nueva libreria en el archivo donde estarán todas mis configuraciones

export let limitGrt=()=>{
    return rateLimit({
        windowMs: 30* 1000, // 30 segundos para esperar a que se habilite de nuevo
        max:10, //Limit each IP to 100 request per `window` (here, per 30 secons)
        standardHeaders: true,  // Return rate Limit info in the `RateLimit-*` headers
        legacyHeaders: false, //Disable the `X-RateLimit-*` headers
        skip:(req,res)=>{
            if(req.headers["content-length"]>90){
                res.status(413).send({status:413, message: "El tamaño es incorrecto"} )
                return true
            }
        },
        message: {status: 429, message: "Pailitas no se puede :c"}
    })
}
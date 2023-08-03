import dotenv from "dotenv"
import {MongoClient} from "mongodb"
dotenv.config("../");
export async function con(){

    try {
        const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.lfged0r.mongodb.net/${process.env.ATLAS_DB}`
        const options = {
            useNewUrlParser: true, // para que se conecte con ssh
            useUnifiedTopology: true, // para utilizar la libreria
        };
        const client = await MongoClient.connect(uri,options);
        return client.db()
    } catch (error) {
        return {starus: 500,message:error}
    }
}


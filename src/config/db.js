 


import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t3hmlwb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true
    }
});


let database;


const connectDB = async()=>{

    try{

        await client.connect();

        database = client.db("foodDeliveryDB");


        console.log("MongoDB connected");


    }catch(error){

        console.log("MongoDB connection failed",error);

    }

}



export {connectDB, database};
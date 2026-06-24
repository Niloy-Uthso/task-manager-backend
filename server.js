import dotenv from 'dotenv' 
 dotenv.config();
import { connectDB } from './src/config/db.js';
import app from './app.js';
 
 

const port = process.env.PORT


const bootStrap = async()=>{
    try{
           await connectDB()
         app.listen(port, () => {
  console.log(`Task Manager app listening on port ${port}`)
})
    }catch(e){
           console.log(e)
    }
}

bootStrap()

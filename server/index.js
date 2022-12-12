import express from 'express'
import cors from 'cors'
import { connect } from './conection/connection.js'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import { CreateDish, GetDish, GetDishs, UpdateDish } from './controller/dishes.js'
const app=express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.get("/dishes",GetDishs)
app.get("/dishes/:id",GetDish)
app.post("/dishes",CreateDish)
app.patch("/dishes/:id",UpdateDish)
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'build')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
});
app.listen(5000,()=>{
    connect()
    console.log("Started at 5000");
})

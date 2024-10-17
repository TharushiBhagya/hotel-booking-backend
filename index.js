import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/userRouter.js";
import galleryItemRouter from "./routes/galleryItemRouter.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const app=express();


const connectionString=process.env.MONGO_URL;

app.use(bodyParser.json());
app.use((req,res,next)=>{

    const token=req.header("Authorization")?.replace("Bearer","");
    if (token !=null) {
        jwt.verify(token,process.env.JWT_KEY, (err, decoded) => {
            if (decoded !=null) {
            req.user = decoded;
             next();
            }else{
                next();
            }
            });
    }else{
        next();
    }
});

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connected to the database");
    }
).catch(
    ()=>
    {
        console.log("Connection failed");
    }
)
app.use("/api/users", userRouter);
app.use("/api/gallery",galleryItemRouter);

app.listen(5000,(req,res)=>{
    console.log("Server is running on port 5000");
})